import { useDialog } from "lib/providers";
import { useCallback, useMemo } from "react";
import { CellProps, Column, Row } from "react-table";
import React from "react";
import { useApiResource, useCheckPerm, usePaginationQuery } from "lib/hooks";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CellContainer, ReactTable } from "components/Table";
import { Page } from "components/Page";
import { SetType } from "lib/types";
import { TopHeader } from "components/TopHeader";
import { format } from "date-fns";

export default function Index() {
  const { paginationData, refetch, handleChangeParams } = usePaginationQuery<
    SetType
  >("sets");
  const { deleteApi } = useApiResource<SetType>("projects");
  const history = useHistory();
  const dialog = useDialog();
  const { hasCreate: hasCreatePerm } = useCheckPerm();

  const handleDelete = useCallback(
    async ({ row }: CellProps<SetType>) => {
      await dialog({
        description: "Do you want to delete?",
        dialogProps: {
          maxWidth: "xs",
        },
      });
      try {
        await deleteApi(row.original.id);
        toast.success("Successfully");
        refetch();
      } catch (error) {
        toast.error("Failed");
        console.log(error);
      }
    },
    [deleteApi, dialog, refetch]
  );

  const handleEdit = useCallback(
    ({ row }: CellProps<SetType>) => {
      history.push(`/sets/update/${row.original.id}`);
    },
    [history]
  );

  const onRowClick = useCallback(
    ({ original }: Row<SetType>) => {
      history.push("/sets/update/" + original.id);
    },
    [history]
  );

  const columns = useMemo<Column<SetType>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 50,
      },
      {
        Header: "Name",
        accessor: "name",
        width: 150,
      },
      {
        Header: "Description",
        accessor: "description",
        width: 150,
      },
      {
        Header: "Created Date",
        accessor: "created_at",
        width: 150,
        Cell: ({ value }: CellProps<SetType>) => {
          return (
            <CellContainer>
              {format(new Date(value), "kk:mm MMM dd, u")}
            </CellContainer>
          );
        },
      },
      {
        Header: "Last Updated Date",
        accessor: "updated_at",
        width: 150,
        Cell: ({ value }: CellProps<SetType>) => {
          return (
            <CellContainer>
              {format(new Date(value), "kk:mm MMM dd, u")}
            </CellContainer>
          );
        },
      },
    ],
    []
  );

  return (
    <Page>
      <TopHeader<SetType>
        path="/sets/create"
        searchColumns={columns}
        handleChangeParams={handleChangeParams}
        hasCreate={hasCreatePerm ?? false}
      />
      <ReactTable<SetType>
        columns={columns}
        {...paginationData}
        onActionEdit={handleEdit}
        onActionDelete={handleDelete}
        onRowClick={onRowClick}
      />
    </Page>
  );
}
