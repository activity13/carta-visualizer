import React, { useState } from "react";
import { ChevronDown, Plus, X, Upload, Save, Eye } from "lucide-react";

const CreateMealForm = () => {
  const [formData, setFormData] = useState({
    // Información básica
    restaurantId: "",
    categoryId: "",
    name: "",
    description: "",
    shortDescription: "",

    // Precios
    basePrice: "",
    comparePrice: "",

    // Imágenes
    images: [],

    // Ingredientes y alérgenos
    ingredients: [""],
    allergens: [],
    dietaryTags: [],

    // Variantes (simplificado)
    variants: [],

    // Disponibilidad
    availability: {
      isAvailable: true,
      availableQuantity: "",
    },

    // Tiempo de preparación
    preparationTime: {
      min: "",
      max: "",
    },

    // Configuración de visualización
    display: {
      order: "",
      isFeatured: false,
      showInMenu: true,
    },

    // Estado
    status: "active",

    // SEO
    searchTags: [""],
  });

  const [activeTab, setActiveTab] = useState("basic");

  // Opciones para los selects
  const allergenOptions = [
    "gluten",
    "lactosa",
    "nueces",
    "maní",
    "huevos",
    "soya",
    "fish",
    "mariscos",
    "ajonjolí",
  ];

  const dietaryTagOptions = [
    "vegetariano",
    "vegano",
    "gluten-free",
    "dairy-free",
    "keto",
    "bajos-carbs",
    "alta-proteina",
    "organico",
    "picante",
    "mild",
    "recomendación-chef",
  ];

  const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "draft", label: "Borrador" },
    { value: "archived", label: "Archivado" },
  ];

  // Handlers
  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayAdd = (field, value = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  const handleArrayRemove = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayUpdate = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleMultiSelect = (field, option) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter((item) => item !== option)
        : [...prev[field], option],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meal data:", formData);
    // Aquí enviarías los datos al backend
  };

  const tabs = [
    { id: "basic", label: "Información Básica" },
    { id: "media", label: "Imágenes" },
    { id: "ingredients", label: "Ingredientes" },
    { id: "availability", label: "Disponibilidad" },
    { id: "display", label: "Configuración" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Crear Nuevo Plato
        </h1>
        <p className="text-gray-600">
          Completa la información para agregar un nuevo plato al menú
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {/* Información Básica */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurante *
                </label>
                <select
                  value={formData.restaurantId}
                  onChange={(e) =>
                    handleInputChange("restaurantId", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar restaurante</option>
                  <option value="rest1">Restaurante Demo 1</option>
                  <option value="rest2">Restaurante Demo 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    handleInputChange("categoryId", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="cat1">Entradas</option>
                  <option value="cat2">Platos Principales</option>
                  <option value="cat3">Postres</option>
                  <option value="cat4">Bebidas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Plato *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                maxLength={100}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Ceviche Mixto"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.name.length}/100 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                maxLength={500}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción detallada del plato..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/500 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Corta (para móviles)
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) =>
                  handleInputChange("shortDescription", e.target.value)
                }
                maxLength={100}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción breve..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.shortDescription.length}/100 caracteres
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Base *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    S/.
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.basePrice}
                    onChange={(e) =>
                      handleInputChange("basePrice", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Comparativo (precio tachado)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    S/.
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.comparePrice}
                    onChange={(e) =>
                      handleInputChange("comparePrice", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Preparación Mínimo (minutos)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.preparationTime.min}
                  onChange={(e) =>
                    handleInputChange("preparationTime.min", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Preparación Máximo (minutos)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.preparationTime.max}
                  onChange={(e) =>
                    handleInputChange("preparationTime.max", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                />
              </div>
            </div>
          </div>
        )}

        {/* Imágenes */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Imágenes del Plato
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Arrastra y suelta imágenes aquí o
                </p>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Seleccionar Archivos
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG hasta 5MB cada una
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ingredientes */}
        {activeTab === "ingredients" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Ingredientes
              </label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleArrayUpdate("ingredients", index, e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Pescado fresco"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("ingredients", index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayAdd("ingredients")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                <Plus className="h-4 w-4" />
                Agregar Ingrediente
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Alérgenos
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allergenOptions.map((allergen) => (
                  <label key={allergen} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen)}
                      onChange={() => handleMultiSelect("allergens", allergen)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {allergen}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Etiquetas Dietéticas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryTagOptions.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.dietaryTags.includes(tag)}
                      onChange={() => handleMultiSelect("dietaryTags", tag)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {tag.replace("-", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Disponibilidad */}
        {activeTab === "availability" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.availability.isAvailable}
                onChange={(e) =>
                  handleInputChange(
                    "availability.isAvailable",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-medium text-gray-700"
              >
                Plato disponible
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad Disponible (opcional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.availability.availableQuantity}
                onChange={(e) =>
                  handleInputChange(
                    "availability.availableQuantity",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dejar vacío para disponibilidad ilimitada"
              />
              <p className="text-sm text-gray-500 mt-1">
                Para platos con cantidad limitada
              </p>
            </div>
          </div>
        )}

        {/* Configuración */}
        {activeTab === "display" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orden en la Categoría
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.display.order}
                  onChange={(e) =>
                    handleInputChange("display.order", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.display.isFeatured}
                  onChange={(e) =>
                    handleInputChange("display.isFeatured", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-sm font-medium text-gray-700"
                >
                  Plato destacado (aparece en la página principal)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showInMenu"
                  checked={formData.display.showInMenu}
                  onChange={(e) =>
                    handleInputChange("display.showInMenu", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="showInMenu"
                  className="text-sm font-medium text-gray-700"
                >
                  Mostrar en el menú
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Etiquetas de Búsqueda
              </label>
              {formData.searchTags.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleArrayUpdate("searchTags", index, e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: ceviche, pescado, limón"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("searchTags", index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayAdd("searchTags")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                <Plus className="h-4 w-4" />
                Agregar Etiqueta
              </button>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Eye className="h-4 w-4" />
            Vista Previa
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              Guardar Plato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMealForm;
