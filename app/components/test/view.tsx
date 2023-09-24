"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";

import { useRouter } from "next/navigation";
import {
  useDeleteTestMutation,
  useGetTestsQuery,
} from "@/app/redux/apis/testApis";
import { CreateDepartmentDialog } from "./createDialog";
import { Button } from "@material-tailwind/react";
export default function TestDataTable({ page }: { page: string }) {
  const router = useRouter();
  const [showCreateTestDialog, setShowCreateTestDialog] = React.useState(false)

  const { data, isLoading, refetch } = useGetTestsQuery({ page });


  const [deleteTest, { isLoading: deleteTestIsLoading }] =
    useDeleteTestMutation();

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
            await deleteTest({ id: params.row.id });
            refetch();
          }}
          className="rounded-md bg-red-500 p-2 text-center text-white"
        >
          {deleteTestIsLoading ? "Deleting..." : "Delete"}
        </button>
      ),
    },
  ];
  let rows: any;
  if (!isLoading && data) {

    rows = data.data.docs.map((department: any) => {
      return {
        id: department._id,
        name: department.name,
        type: department.type,
        date: department.createdAt,

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
        <h1> Departments is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            // onRowClick={(e) => {
            //   console.log(e);
            // }}
            paginationMode="server"
            rowCount={data.data.totalDocs}
            onPaginationModelChange={(params) => {
              const page = params.page + 1;
              router.push("/dashboard/test?page=" + page);
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
