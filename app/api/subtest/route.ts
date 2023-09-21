import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import SubTestModelPaginate from "@/app/models/subTestModel";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  let page: any = url.searchParams.get("page");

  if (!page) {
    page = 1;
  }
  const tests = await SubTestModelPaginate.paginate (
    {},
    {
      page: page,
      limit: 10,
    }
  );

  return NextResponse.json({ staus: 200, data: tests });
}

///POST
export async function POST(request: NextRequest) {
  const res = await request.json();
  const { testId, test, name, userId, type, data } = res;
  await connectDB();
  const subTest = new SubTestModelPaginate({
    testId,
    test,
    name,
    user: userId,
    type,
    data,
  });

  try {
    const subTestSaved = await subTest.save();

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
