const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
//const gravatar = require("mongoose-gravatar");

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE", "INVITATE"],
  message: "{VALUE} no es un rol válido",
};

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  nick: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: { type: Date, required: false },
  direction: String,
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

UsuariosSchema.methods.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};
UsuariosSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("Usuario", UsuariosSchema);
