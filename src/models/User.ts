import { IUser } from "@/interfaces";
import { Model, Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: [true, "El email es requerido"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "El email no es válido"
    ]
  },
  password: {
    type: String,
    require: [true, "La contraseña es requerida"],
    select: false
  },
  fullname: {
    type: String,
    require: [true, "El nombre completo es requerido"]
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} no es un valor valido'
    }
  },
},
  {
    timestamps: true
  }
);

const User = models.User || model("User", userSchema);

export default User;