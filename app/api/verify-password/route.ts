import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Obtener la contraseña desde la variable de entorno
    const correctPassword = process.env.ADMIN_PASSWORD

    // Verificar si la contraseña es correcta
    const isValid = password === correctPassword

    return NextResponse.json({ success: isValid })
  } catch (error) {
    console.error("Error al verificar la contraseña:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
