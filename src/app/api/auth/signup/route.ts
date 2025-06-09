import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/libs/mongodb";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { fullName, username, email, password } = await request.json();
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    } else if (fullName.length < 3 || fullName.length > 50) {
      return NextResponse.json(
        { error: "El nombre completo debe tener entre 3 y 50 caracteres" },
        { status: 400 }
      );
    } else if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const thereIsUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (thereIsUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    }).save();

    return NextResponse.json(
      { message: "Usuario registrado exitosamente. Bienvenid@ ", fullName },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return NextResponse.json(
      {
        error: "Ha ocurrido un problema. Por favor, intenta nuevamente",
        error_message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
