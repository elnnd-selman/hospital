import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import SubTestModelPaginate from "@/app/models/subTestModel";
import UserModel from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  let page: any = url.searchParams.get("page");

  if (!page) {
    page = 1;
  }
  const tests = await SubTestModelPaginate.paginate(
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
  const { department, test, name, userId, type, data } = res;
  await connectDB();
  const subTest = new SubTestModelPaginate({
    department,
    test,
    name,
    user: userId,
    type,
    data,
  });

  try {
    const subTestSaved = await subTest.save();
    console.log(subTestSaved);

    return NextResponse.json(
      { status: true, data: subTestSaved },
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
    user: userId,
  });

  try {
    const subTestsaved = await department.save();
    console.log(subTestsaved);

    return NextResponse.json(
      { status: true, data: subTestsaved },
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
