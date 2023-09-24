import { closeDB, connectDB } from "@/app/config/mongoose_config";
import PatientPatientModel from "@/app/models/patient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { patient } = await request.json();

  try {
    // First, find the patient
    const foundedPatient = await PatientPatientModel.findOne({
      _id: patient._id,
    });

    // If patient is found
    if (foundedPatient) {
      // Check if the test exists in the doneTest array.
      // You may need a more sophisticated check if doneTest is an array of objects.
      const testIndex = foundedPatient.doneTest.findIndex(
        (test) => test._id === patient.doneTest[0]._id
      );

      if (testIndex !== -1) {
        // If the test exists, replace it
        foundedPatient.doneTest[testIndex] = patient.doneTest[0];
      } else {
        // If the test doesn't exist, push it
        foundedPatient.doneTest.push(patient.doneTest[0]);
      }

      // Save the updated patient document
      await foundedPatient.save();
    }
    return NextResponse.json(
      { status: true, data: foundedPatient },
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
