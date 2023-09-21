import { closeDB, connectDB } from "@/app/config/mongoose_config";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "data" });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { name, password, email } = res;
  await connectDB();
  const useModel = new UserModel({
    name,
    password,
    email,
  });

  try {
    const userSaved = await useModel.save();
    await closeDB();
    return NextResponse.json(
      { status: true, data: userSaved },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { status: false, data: error },
      {
        status: 400,
      }
    );
  }
}
