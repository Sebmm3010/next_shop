import { db } from "@/data";
import { IPaypal } from "@/interfaces";
import { Order } from "@/models";
import axios, { isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);
    default:
      res.status(400).json({ msg: "Bad request" });
  }
  res.status(200).json({ msg: "Example" });
}

const getBearerToken = async () => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const paypalBarerToken = await getBearerToken();
  if (!paypalBarerToken) {
    res.status(400).json({ msg: "No se pudo confirmar el token con paypal" });
  }

  const { transactionId = "", orderId = "" } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBarerToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    res.status(401).json({ msg: "Orden no reconocida" });
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);
  if (!dbOrder) {
    db.disconnect();
    res.status(400).json({ msg: "La orden no existe en la base de datos" });
  }

  if (dbOrder?.dolarTotal !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    res
      .status(400)
      .json({ msg: "Los totales de paypal y nuestra orden son diferentes" });
  }

  dbOrder!.transactionId = transactionId;
  dbOrder!.isPaid = true;
  await dbOrder?.save();
  await db.disconnect();
  res.status(200).json({ msg: "Orden pagada" });
};
