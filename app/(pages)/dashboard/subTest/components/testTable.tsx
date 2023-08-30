"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TestDataTable(props: any) {
  const router = useRouter();

  const { tests } = useSelector((state: any) => state.test);
  let columns: GridColDef[] = [];
  console.log(tests.page);

  if (Object.keys(tests).length > 0) {
    columns = [
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "type",
        headerName: "Type",
        width: 200,
      },
      // {
      //   field: "data",
      //   headerName: "Data",
      //   width: 200,
      // },
      {
        field: "data",
        headerName: "Children",
        width: 90,
        renderCell: (params) => {
          console.log(params);

          return (
            <Link
              href={{
                pathname: "/dashboard/test",
                query: {
                  testsId: params.id,
                  testsName: params.row.name,
                },
              }}
              className="rounded-md bg-blue-500 p-2 text-center text-white"
            >
              {params.row.type == "parent"
                ? params.row.data == null
                  ? 0
                  : 0
                : ""}{" "}
              Tests
            </Link>
          );
        },
      },
    ];
  }

  return (
    <>
      {/* {tests.docs.length} */}
      {/* {listOftestss} */}
      {Object.keys(tests).length < 1 ? (
        <h1>Empty</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            pagination
            onPaginationModelChange={(pagination) => {
              const page = pagination.page + 1;
              router.replace("/dashboard/tests/?page=" + page);
              router.refresh();
            }}
            columns={columns}
            rows={
              tests.docs.length < 1
                ? {}
                : tests.docs.map((test: any) => {
                    return {
                      id: test._id,
                      name: test.name,
                      type: test.type,
                      data: test.data,

                      children: test.children,
                    };
                  })
            }
            paginationMode="server"
            onFilterModelChange={(filter) => {
              console.log(filter);
            }}
            rowCount={tests.totalDocs}
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
