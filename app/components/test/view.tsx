"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useRouter } from "next/navigation";
import {
  useDeleteTestMutation,
  useGetTestsQuery,
} from "@/app/redux/apis/testApis";
// import { PaginationComponent } from "../reusableComponents/paginationComponent";

export default function TestDataTable({ page }: { page: string }) {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetTestsQuery({ page });
  const [deleteDepartment, { isLoading: deleteDepartmentIsLoading }] =
    useDeleteTestMutation();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "children", headerName: "children", width: 130 },
    {
      field: "edit",
      headerName: " ---",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => {
            router.push("/dashboard/department/update?id=" + params.row.id);
          }}
          className="rounded-md bg-blue-500 p-2 text-center text-white"
        >
          Edit
        </button>
      ),
    },
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
    <>
      {isLoading ? (
        <h1> Departments is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          {rows.length}
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
    </>
  );
}
