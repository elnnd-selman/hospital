import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import TestModelPaginate from "@/app/models/testModel";
import UserModel from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  let page: any = url.searchParams.get("page");

  if (!page) {
    page = 1;
  }
  const tests = await TestModelPaginate.paginate(
    {},
    {
      page: page,
      limit: 10,
    }
  );
  console.log("tests:", tests);

  return NextResponse.json({ staus: 200, data: tests });
}

///POST
export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  const { department, name, userId, type, data } = res;
  await connectDB();
  const test = new TestModelPaginate({
    department,
    name,
    user: userId,
    type,
    data,
  });

  try {
    const testSaved = await test.save();
    await DepartmentModel.findByIdAndUpdate(
      { _id: department },
      { $push: { children: testSaved._id } }
    );
    return NextResponse.json(
      { status: true, data: testSaved },
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

export async function PATCH(request: NextRequest) {
  const res = await request.json();
  const { name, userId } = res;
  await connectDB();
  const department = new DepartmentModel({
    name,
    user: userId,
  });

  try {
    const testsaved = await department.save();
    console.log(testsaved);

    return NextResponse.json(
      { status: true, data: testsaved },
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
