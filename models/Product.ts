import { IProduct } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const productSchema = new Schema(
  {
    description: { type: String, require: true },
    images: [{ type: String }],
    inStock: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "XXXL",
            "30",
            "33",
            "35",
            "36",
            "37",
            "40",
            "43",
          ],
          message: "{VALUE} no es un tamaño válido",
        },
      },
    ],
    slug: { type: String, require: true, unique: true },
    tags: [{ type: String, required: true }],
    title: { type: String, require: true },
    type: {
      type: String,
      enum: {
        values: [
          "camisa",
          "pantalon",
          "chaqueta",
          "sombrero",
          "zapatos",
          "vestido",
        ],
        message: "{VALUE} no es de un tipo valido",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["hombre", "mujer", "infantil", "unisex", ,],
        message: "{VALUE} no es de un genero valido",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);
export default Product;