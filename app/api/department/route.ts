import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import UserModel from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  let page: any = url.searchParams.get("page");

  if (!page) {
    page = 1;
  }
  const departments = await DepartmentModel.paginate(
    {},
    {
      page: page,
      limit: 10,
    }
  );
  console.log("departments:", departments);

  return NextResponse.json({ staus: 200, data: departments });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  const { name, userId } = res;
  await connectDB();
  const department = new DepartmentModel({
  name,
  user:userId
  });

  try {
    const departmentSaved = await department.save();
    console.log(departmentSaved);

    return NextResponse.json(
      { status: true, data: departmentSaved },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { status: false, data: error },
      {
        status: 400,
      }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const res = await request.json();
  const { name, userId } = res;
  await connectDB();
  const department = new DepartmentModel({
  name,
  user:userId
  });

  try {
    const departmentSaved = await department.save();
    console.log(departmentSaved);

    return NextResponse.json(
      { status: true, data: departmentSaved },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { status: false, data: error },
      {
        status: 400,
      }
    );
  }
}

