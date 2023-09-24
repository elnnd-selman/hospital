"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "@/app/redux/apis/departmentApis";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { CreateDialog } from "./createDialog";
import { useState } from "react";
// import { PaginationComponent } from "../reusableComponents/paginationComponent";

export default function DepartmentDataTable({ page }: { page: string }) {
  const router = useRouter();
  const [showCreateDepartmentDialog, setShowDeleteDepartmentDialog] = useState(false)
  const { data, isLoading, refetch } = useGetDepartmentsQuery({ page });
  const [deleteDepartment, { isLoading: deleteDepartmentIsLoading }] =
    useDeleteDepartmentMutation();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 130 },
    
    {
      field: "delete",
      headerName: " ---",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <button
          onClick={async () => {
            await deleteDepartment({ id: params.row.id });
            refetch();
          }}
          className="rounded-md bg-red-500 p-2 text-center text-white"
        >
          {deleteDepartmentIsLoading ? "Deleting..." : "Delete"}
        </button>
      ),
    },
  ];
  let rows: any;
  if (!isLoading && data) {

    rows = data.data.docs.map((department: Department) => {
      return {
        id: department._id,
        name: department.name,
      };
    });
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2">
      <CreateDialog open={showCreateDepartmentDialog} setShowDeleteDepartmentDialog={setShowDeleteDepartmentDialog} refetch={()=>refetch()} />
      <Button color="blue" className="my-2" onClick={()=>setShowDeleteDepartmentDialog(true)}> Create</Button>

      {isLoading ? (
        <h1> Departments is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>

          <DataGrid
            rows={rows}
            columns={columns}
            pagination

            paginationMode="server"
            rowCount={data.data.totalDocs}
            onPaginationModelChange={(params) => {
              const page = params.page + 1;
              router.push("/dashboard/department?page=" + page);
            }}
            // onFilterModelChange={handleFilterChange}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: data.data.limit,
                  page: data.data.page - 1,
                },
              },
            }}
            autoHeight
          />
        </div>
      )}
    </div>
  );
}
