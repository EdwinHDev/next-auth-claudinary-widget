import { NextResponse } from "next/server";
import { User } from "@/models";
import { mongodb } from "@/libs";
import bcrypt from "bcryptjs";
import { IUser } from "@/interfaces";

export async function POST(req: Request) {

  const { email = "", password = "", fullname = "", image = "" } = await req.json();

  if(email === "") {
    return NextResponse.json({
      message: "El email es obligatorio"
    }, { status: 400});
  }

  if(password === "") {
    return NextResponse.json({
      message: "La contraseña es obligatoria"
    }, { status: 400});
  }

  if(password.length < 8) {
    return NextResponse.json({
      message: "La contraseña debe tener al menos 8 caracteres"
    }, { status: 400});
  }

  if(fullname === "") {
    return NextResponse.json({
      message: "El nombre completo es obligatorio"
    }, { status: 400});
  }

  await mongodb.connectDB();
  const findUser = await User.findOne({ email });

  if(findUser) {
    return NextResponse.json({
      message: "ya existe un usuario con ese email"
    }, { status: 409});
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User<IUser>({
    email,
    password: hashedPassword,
    fullname,
    image,
    role: "user"
  })

  try {
    await user.save();
    return NextResponse.json({
      message: "Usuario creado correctamente"
    }, { status: 200});
  } catch (error) {
    console.log(error);
    if(error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, { status: 400 });
    }
  }
}