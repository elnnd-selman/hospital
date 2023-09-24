import { closeDB, connectDB } from "@/app/config/mongoose_config";
import PatientPatientModel from "@/app/models/patient";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const url = new URL(req.url);

  const departmentId: any = url.searchParams.get("departmentId");
  let page: any = url.searchParams.get("page");
  page = page ?? 1;

  let options: any = {};

  if (departmentId != "undefined" && departmentId != "null" && departmentId) {
    console.log("HERE", departmentId);

    // Ensure the 'pendingTest' object exists before setting its '_id' property
    options["pendingTest._id"] = departmentId;
  }
  console.log(options);

  const genderCount = await PatientPatientModel.aggregate([
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ]);
  const ageDistribution = await PatientPatientModel.aggregate([
    {
      $group: {
        _id: "$age",
        count: { $sum: 1 },
      },
    },
  ]);
  const patients = await PatientPatientModel.paginate(options, {
    page: page,
    limit: 100,
  });
  // const patients = await PatientPatientModel.find({});

  return NextResponse.json({
    data: {
      status: true,
      patients: patients,
      genderCount,
      ageDistribution,
    },
  });
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
