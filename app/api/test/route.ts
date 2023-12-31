import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import TestModelPaginate from "@/app/models/testModel";
import UserModel from "@/app/models/userModel";
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
      page: page == 0 ? 1 : page,
      limit: 10,
      
    }
  );

  return NextResponse.json({ staus: 200, data: tests });
}

///POST
export async function POST(request: NextRequest) {
  const res = await request.json();
  const { parentId, name, userId, type, data } = res;
  await connectDB();
  const test = new TestModelPaginate({
    parentId,
    name,
    user: userId,
    type,
    data,
  });

  try {
    const testSaved = await test.save();
    // await DepartmentModel.findByIdAndUpdate(
    //   { _id: parentId },
    //   { $push: { children: testSaved._id } }
    // );

    return NextResponse.json(
      { status: true, data: testSaved },
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
    const testsaved = await department.save();

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

///DELETE
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id: string = url.searchParams.get("id")!;

  await connectDB();
  try {
    const testDeleted = await TestModelPaginate.findOneAndDelete({
      _id: id,
    });

    return NextResponse.json(
      { status: true, data: testDeleted },
      { status: 200 }
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
