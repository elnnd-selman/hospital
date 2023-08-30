"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { ConfirmationDialog } from "@/app/components/confirmationDialogComponent";
import { deleteDepartmentService } from "@/app/services/departmentService";
import { departmentActions } from "@/app/redux/slices/department_slice";

export default function DepartmentDataTable(props: any) {
  const dispatch = useDispatch();
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState(null);

  const [editDialogIsOpen] = React.useState(false);
  const handleOpenDeleteDialog = () => {
    setDeleteDialogIsOpen(!deleteDialogIsOpen);
  };
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
          return (
            <Link
              href={{
                pathname: "/dashboard/test",
                query: {
                  departmentId: params.id,
                  departmentName: params.row.name,
                },
              }}
              className="rounded-md bg-green-500 p-2 text-center text-white"
            >
              {params.row.children.length} Tests
            </Link>
          );
        },
      },
      {
        field: "edit",
        headerName: "Edit",
        width: 90,
        renderCell: (params) => {
          return (
            <Button className="rounded-md bg-blue-500 p-2 text-center text-white">
              Edit
            </Button>
          );
        },
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 90,
        renderCell: (params) => {
          return (
            <Button
              className="rounded-md bg-red-500 p-2 text-center text-white"
              onClick={() => {
                console.log(params.row.id);
                setDepartmentId(params.row.id);
                handleOpenDeleteDialog();
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ];
  }

  return (
    <>
      <ConfirmationDialog
        handleOpen={handleOpenDeleteDialog}
        onSubmit={async () => {
          const res = await deleteDepartmentService(departmentId!);
          if (res) {
            dispatch(
              departmentActions.removeDepartmentFromDepartments(departmentId)
            );
          }
        }}
        submitTitle=""
        text="Are you sure you want to delete this department?"
        title=""
        open={deleteDialogIsOpen}
      />
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
