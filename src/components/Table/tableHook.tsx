import { Checkbox, Stack } from "@mui/material";
import { VFC } from "react";
import {
  CellProps,
  HeaderProps,
  Hooks,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { ActionColumnConfig } from ".";
import TableAction from "./components/TableAction";
import React from "react";

function selectionHook<T extends object>(enabled: boolean) {
  return (hooks: Hooks<T>) => {
    if (!enabled) return;
    hooks.allColumns.push((columns) => [
      {
        id: "_selector",
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...getToggleAllRowsSelectedProps()}
          />
        ),
        Cell: ({ row }: CellProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...row.getToggleRowSelectedProps()}
          />
        ),
      },
      ...columns,
    ]);
  };
}

export type ActionHookArgs<T extends object> = {
  actionConfig?: ActionColumnConfig;
  onActionEdit?(props: CellProps<T>): void;
  onActionDelete?(props: CellProps<T>): void;
  defaultActionEdit?: boolean;
  tableId?: string;
};

function actionHook<T extends object>({
  actionConfig,
  onActionDelete,
  onActionEdit,
  defaultActionEdit,
  tableId,
}: ActionHookArgs<T>) {
  return (hooks: Hooks<T>) => {
    if (!(onActionDelete || onActionEdit || defaultActionEdit)) return;
    hooks.allColumns.push((columns) => {
      const mergeRightColumn = columns.filter((c) => c.mergeWithAction);
      columns.splice(
        columns.length - mergeRightColumn.length,
        mergeRightColumn.length
      );

      if (mergeRightColumn.length > 0) {
        return [
          ...columns,
          {
            Header: " ",
            id: "__merge_action",
            Cell: (props: CellProps<T>) => (
              <Stack direction="row" spacing={2}>
                {mergeRightColumn.map((c) => {
                  const Component = c.Cell as VFC;
                  return <Component {...props} key={c.id} />;
                })}
                <TableAction<T>
                  actionConfig={actionConfig}
                  onActionEdit={onActionEdit}
                  onActionDelete={onActionDelete}
                  defaultActionEdit={defaultActionEdit}
                  tableId={tableId}
                  {...props}
                />
              </Stack>
            ),
            width:
              ((actionConfig as any)?.columnWidth || 76) +
              mergeRightColumn.reduce((s, c) => s + Number(c?.width), 0) +
              mergeRightColumn.length * 16,
            minWidth: 76,
            sticky: "right",
          },
        ];
      }

      return [
        ...columns,
        {
          id: "__action",
          Cell: (props: CellProps<T>) => (
            <TableAction<T>
              actionConfig={actionConfig}
              onActionEdit={onActionEdit}
              onActionDelete={onActionDelete}
              defaultActionEdit={defaultActionEdit}
              tableId={tableId}
              {...props}
            />
          ),
          width: (actionConfig as any)?.columnWidth,
          sticky: "right",
          minWidth: 76,
        },
      ];
    });
  };
}

function idWidth<T extends object>(enabled = true) {
  return (hooks: Hooks<T>) => {
    if (!enabled) return;
    hooks.allColumns.push((columns) => {
      return columns.map((el) => {
        if (el?.id.includes("id")) {
          return {
            width: el?.customWidthId ? el.customWidthId : 60,
            ...el,
          };
        }
        return el;
      });
    });
  };
}

const hooks = [
  useSortBy,
  usePagination,
  useRowSelect,
  useFlexLayout,
  useSticky,
];

export { hooks, selectionHook, actionHook, idWidth };
