import { model, Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      minlength: [3, "El nombre completo debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre completo no puede exceder los 50 caracteres"],
    },
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Por favor, ingresa un correo electrónico válido",
      ],
    },
    password: { type: String, required: true, select: false },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Esquema resumido para escribir en la base de datos
// User: fullName, username, email, password, isActive, createdAt, updatedAt

const User = models.User || model("User", userSchema);

export default User;
