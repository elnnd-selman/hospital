import { connectDB } from "@/app/config/mongoose_config";
import DepartmentModel from "@/app/models/department_model";
import { NextRequest, NextResponse } from "next/server";

const getAllDepartmentsWithTest = async () => {
  return DepartmentModel.aggregate([
    {
      $lookup: {
        from: "tests",
        let: { departmentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$parentId", "$$departmentId"] }
            }
          },
          {
            $lookup: {
              from: "subtests",
              localField: "_id",
              foreignField: "testId",
              as: "subTests"
            }
          }
        ],
        as: "tests"
      }
    }
  ]);
};

//GET
export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url);
  let type: any = url.searchParams.get("type");
  if (type == "departmentWithTests") {
    return NextResponse.json({
      staus: 200,
      data: await getAllDepartmentsWithTest(),
    });
  }
  let page: any = url.searchParams.get("page");
  let id: any = url.searchParams.get("id");
  let departments;
  if (id) {
    departments = await DepartmentModel.findById(id);
    return NextResponse.json({ staus: 200, data: departments });
  }

  page = page ?? 1;
  departments = await DepartmentModel.paginate(
    {},
    {
      page: page,
      limit: 10,
    }
  );

  return NextResponse.json({ staus: 200, data: departments });
}

///POST
export async function POST(req: NextRequest) {
  const res = await req.json();
  const { name, userId } = res;
  await connectDB();
  const department = new DepartmentModel({
    name,
    user: userId,
  });

  try {
    const departmentSaved = await department.save();

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

///UPDATE
export async function PATCH(req: NextRequest) {
  const res = await req.json();
  const url = new URL(req.url);

  let id: any = url.searchParams.get("id");

  const { name, userId } = res;
  await connectDB();

  try {
    const res = await DepartmentModel.findOneAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );

    return NextResponse.json(
      { status: true, data: res },
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
    const departmentDeleted = await DepartmentModel.findOneAndDelete({
      _id: id,
    });

    return NextResponse.json(
      { status: true, data: departmentDeleted },
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
