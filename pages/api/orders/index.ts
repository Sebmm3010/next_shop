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
      return createOrder(req, res);
      break;

    default:
      res.status(400).json({ msg: "Bad request" });
  }

  res.status(200).json({ msg: "Hola, mi nombre el frile horn hernesto perez" });
}
function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(201).json({msg:"Orden creada"})
}
