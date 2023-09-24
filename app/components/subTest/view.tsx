"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useRouter } from "next/navigation";
import { useDeleteTestMutation } from "@/app/redux/apis/testApis";
import { useDeleteSubTestMutation, useGetSubTestsQuery } from "@/app/redux/apis/subTestApis";
import { CreateDepartmentDialog } from "./createDialog";
import { Button } from "@material-tailwind/react";
import moment from "moment";
// import { PaginationComponent } from "../reusableComponents/paginationComponent";

export default function SubTestDataTable({ page }: { page: string }) {
  const router = useRouter();
  const [showCreateTestDialog, setShowCreateTestDialog] = React.useState(false)

  const { data, isLoading, refetch } = useGetSubTestsQuery({ page });
  const [deleteSubtest, { isLoading: deleteDepartmentIsLoading }] =
  useDeleteSubTestMutation();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 130 },

    { field: "type", headerName: "type", width: 200 },
    {
      field: "date", headerName: "date", width: 200, renderCell: (params: any) => (
        <>
          {
            moment(params.date).format("DD-MM-YYYY : h:mm:ss a")
          }</>
      )
    },
    {
      field: "delete",
      headerName: " ---",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <button
          onClick={async () => {
            await deleteSubtest({ id: params.row.id });
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

    rows = data.data.docs.map((subTest: any) => {
      return {
        id: subTest._id,
        name: subTest.name,
        type:subTest.type
      };
    });
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2">
        <CreateDepartmentDialog open={showCreateTestDialog} setOpenDialog={setShowCreateTestDialog} refetch={() => refetch()} />
      <Button color="blue" className="my-2" onClick={() => setShowCreateTestDialog(true)}> Create</Button>

      {isLoading ? (
        <h1> Sub tests is Loading</h1>
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
