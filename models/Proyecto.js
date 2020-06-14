const mongoose = require("mongoose");

let categoriesValidos = {
  values: ["PHOTO/VIDEO", "TEXT"],
  message: "{VALUE} la categoria no es valída",
};

const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  img: { type: String, required: false },
  categorie: {
    type: String,
    default: "TEXT",
    enum: ["PHOTO/VIDEO", "TEXT"],
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
