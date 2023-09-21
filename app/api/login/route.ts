import { closeDB, connectDB } from "@/app/config/mongoose_config";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { password, email } = res;
  await connectDB();
  const user = await UserModel.findOne({
    password,
    email,
  });

  if (user) {

    return NextResponse.json({ data: user },{status:200});
  }

  return NextResponse.json(
    { status: false, data: "email or password is wrong" },
    {
      status: 400,
    }
  );
}
