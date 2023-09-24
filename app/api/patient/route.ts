import { closeDB, connectDB } from "@/app/config/mongoose_config";
import PatientPatientModel from "@/app/models/patient";
import UserModel from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  
  await connectDB();
  const url = new URL(req.url);

  const departmentId: any = url.searchParams.get("departmentId");
  let page: any = url.searchParams.get("page");
  let size: any = url.searchParams.get("size");

  page = page ?? 1;
  size = size ?? 10;

  let options: any = {};

  if (departmentId != "undefined" && departmentId != "null" && departmentId) {

    // Ensure the 'pendingTest' object exists before setting its '_id' property
      options['pendingTest._id'] = departmentId;
    
  }
  
  const patients = await PatientPatientModel.paginate(options, {
    page: page,
    limit: size,
    sort: { createdAt: -1 }, 
  });
  // const patients = await PatientPatientModel.find({});
  const response = NextResponse.json({ data: patients });
  
  // Setting CORS headers
  
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
