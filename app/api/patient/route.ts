import { closeDB, connectDB } from "@/app/config/mongoose_config";
import PatientPatientModel from "@/app/models/patient";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  const departmentId: any = url.searchParams.get("departmentId");
  const from: any = url.searchParams.get("from");
  const to: any = url.searchParams.get("to");
  let page: any = url.searchParams.get("page");
  let size: any = url.searchParams.get("size");
  let type: any = url.searchParams.get("type");

  type = type ?? "all";
  page = page ?? 1;
  size = size ?? 10;

  let options: any = {};

  if (departmentId != "undefined" && departmentId != "null" && departmentId) {
    options["pendingTest._id"] = departmentId;
  }
  console.log(from, to);

  function isValidDate(d: any) {
    return new Date(d).toString() !== "Invalid Date";
  }
  if (from != "undefined" || to != "undefined") {
    options["createdAt"] = {};
  }

  if (from != "undefined" && isValidDate(from)) {
    options["createdAt"]["$gte"] = new Date(from);
  }
  if (to != "undefined" && isValidDate(to)) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    options["createdAt"]["$lte"] = toDate;
  }
  if (type === "done") {
    options.$expr = {
      $eq: [
        {
          $reduce: {
            input: {
              $map: {
                input: "$pendingTest",
                as: "pt",
                in: { $size: "$$pt.tests" },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this"] },
          },
        },
        {
          $reduce: {
            input: {
              $map: {
                input: "$doneTest",
                as: "dt",
                in: { $size: "$$dt.tests" },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this"] },
          },
        },
      ],
    };
  } else if (type === "pending") {
    options.$expr = {
      $ne: [
        {
          $reduce: {
            input: {
              $map: {
                input: "$pendingTest",
                as: "pt",
                in: { $size: "$$pt.tests" },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this"] },
          },
        },
        {
          $reduce: {
            input: {
              $map: {
                input: "$doneTest",
                as: "dt",
                in: { $size: "$$dt.tests" },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this"] },
          },
        },
      ],
    };
  }

  const patients = await PatientPatientModel.paginate(options, {
    page: page,
    limit: size,
    sort: { createdAt: -1 },
  });

  const response = NextResponse.json({ data: patients });

  // Setting CORS headers (if required)
  // ...

  return response;
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  await connectDB();
  const patient = new PatientPatientModel(res);
  try {
    const patientSaved = await patient.save();
    await closeDB();
    return NextResponse.json(
      { status: true, data: patientSaved },
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
