"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DepartmentDataTable(props: any) {
  const router = useRouter();

  const { department } = useSelector((state: any) => state.department);
  let columns: GridColDef[] = [];
  console.log(department.page);

  if (Object.keys(department).length > 0) {
    columns = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "children",
        headerName: "Children",
        width: 90,
        renderCell: (params) => {
          console.log(params);

          return (
            <Link
              href={{
                pathname: "/dashboard/test",
                query: {
                  departmentId: params.id,
                  departmentName: params.row.name,
                },
              }}
              className="rounded-md bg-blue-500 p-2 text-center text-white"
            >
              {params.row.children.length} Tests
            </Link>
          );
        },
      },
    ];
  }

  return (
    <>
      {/* {department.docs.length} */}
      {/* {listOfDepartments} */}
      {Object.keys(department).length < 1 ? (
        <h1>Empty</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            pagination
            onPaginationModelChange={(pagination) => {
              const page = pagination.page + 1;
              router.replace("/dashboard/department/?page=" + page);
              router.refresh();
            }}
            columns={columns}
            rows={
              department.docs.length < 1
                ? {}
                : department.docs.map((dep: any) => {
                    return {
                      id: dep._id,
                      name: dep.name,
                      children: dep.children,
                    };
                  })
            }
            paginationMode="server"
            onFilterModelChange={(filter) => {
              console.log(filter);
            }}
            rowCount={department.totalDocs}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            autoHeight
          />
        </div>
      )}
    </>
  );
}
