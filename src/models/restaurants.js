import { Schema, model, models } from "mongoose";

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del restaurante es obligatorio"],
    trim: true,
    unique: true,
    maxlength: [100, "El nombre no puede exceder 100 caracteres"],
  },
  slug: {
    type: String,
    required: [true, "El slug del restaurante es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  direction: {
    type: String,
    required: [true, "La dirección del restaurante es obligatoria"],
    trim: true,
    maxlength: [200, "La dirección no puede exceder 200 caracteres"],
  },
  location: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (!v) return true; // Permite valores vacíos
        return /^https?:\/\/.+/.test(v);
      },
      message: "La locación debe ser una URL válida",
    },
  },
  phone: {
    type: String,
    required: [true, "El teléfono del restaurante es obligatorio"],
    trim: true,
    maxlength: [15, "El teléfono no puede exceder 15 caracteres"],
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, "La descripción no puede exceder 500 caracteres"],
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  frameQR: {
    type: String,
    required: false,
    trim: true,
  },
  QrCode: {
    type: String,
    required: false,
    trim: true,
  },
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);

export default Restaurant;
