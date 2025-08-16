const { Schema, model, models } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
    trim: true,
    maxlength: [100, "El nombre no puede exceder 100 caracteres"],
  },
  code: {
    type: Number,
    required: [true, "El código de la categoría es obligatorio"],
    unique: true,
    trim: true,
    maxlength: [10, "El código no puede exceder 10 caracteres"],
  },
  slug: {
    type: String,
    required: [true, "El slug de la categoría es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
  },
});

const Categories = models.Categories || model("Categories", CategorySchema);

export default Categories;
