import {
  Box,
  ClickAwayListener,
  PaginationProps,
  Paper,
  Stack,
  StackProps,
  TableBody,
  TableContainer,
  TableContainerProps,
  TableFooter,
  TableHead,
  TableProps,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { TableSkeleton, TableSkeletonType } from "components/Skeleton";
import { useHScrollTrigger } from "lib/hooks/useHScrollTrigger";
import { UnknownObj } from "lib/types";
import {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  CellProps,
  Row as RowProps,
  TableInstance,
  TableOptions,
  useTable,
} from "react-table";
import { Cell, Row, SortLabel, TableStyled } from "./components";
import EmptyTable from "./EmptyTable";
import { Pagination } from "./Pagination";
import { actionHook, hooks, idWidth, selectionHook } from "./tableHook";
import React from "react";

declare module "react" {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type PaginationMeta = {
  page: number;
  per_page: number;
};

export type ActionColumnConfig = {
  editText?: string;
  deleteText?: string;
  needConfirm?: boolean;
  deleteConfirmText?: string;
  showText?: string;
  columnWidth?: number;
};

interface TableProperties<T extends object> extends TableOptions<T> {
  tableProps?: TableProps;
  sx?: SxProps;
  onRowClick?(row: RowProps<T>): void;
  onClickAway?(): void;
  loading?: boolean;
  selection?: boolean;
  skeletonConfig?: TableSkeletonType;
  pageCount?: number;
  handleChangePagination?(paginationMeta: PaginationMeta): void;
  isPreviousData?: boolean;
  actionConfig?: ActionColumnConfig;
  onActionEdit?(props: CellProps<T>): void;
  onActionDelete?(props: CellProps<T>): void;
  defaultActionEdit?: boolean;
  paginationType?: "table" | "normal";
  nPaginationProps?: PaginationProps;
  nPaginationContainerProps?: StackProps;
  tableContainerProps?: TableContainerProps;
  disabledRowClick?: boolean;
  id?: string;
  additionState?: UnknownObj;
  meta?: PaginationMeta;
}

function ReactTableWithRef<T extends object>(
  props: TableProperties<T>,
  ref: React.ForwardedRef<TableInstance<T>>
): ReactElement {
  const {
    columns,
    data,
    pageCount,
    tableProps,
    selection = false,
    actionConfig,
    onActionEdit,
    onActionDelete,
    onRowClick,
    onClickAway = () => undefined,
    handleChangePagination,
    loading,
    defaultActionEdit,
    skeletonConfig,
    sx,
    paginationType = "table",
    nPaginationProps,
    nPaginationContainerProps,
    tableContainerProps,
    disabledRowClick,
    id: tableId,
    initialState,
    additionState,
    meta: paginationMeta,
    ...useTableOptions
  } = props;

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 10, ...initialState },
      manualPagination: true,
      autoResetPage: false,
      pageCount,
      useControlledState: (state) =>
        useMemo(
          () => ({
            ...state,
            ...additionState,
          }),
          [state]
        ),
      ...useTableOptions,
    },
    ...hooks,
    idWidth(),
    selectionHook(selection),
    actionHook({
      actionConfig,
      onActionEdit,
      onActionDelete,
      defaultActionEdit,
      tableId,
    })
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useHScrollTrigger({
    target: containerRef.current || undefined,
  });

  useImperativeHandle(ref, () => instance, [instance]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = instance;

  const hasRowClick = typeof onRowClick === "function" && !disabledRowClick;

  useEffect(() => {
    if (typeof handleChangePagination === "function") {
      handleChangePagination({ page: pageIndex + 1, per_page: pageSize });
    }
  }, [handleChangePagination, pageIndex, pageSize]);

  useEffect(() => {
    if (
      paginationMeta &&
      (paginationMeta.page !== pageIndex + 1 ||
        paginationMeta?.per_page !== pageSize)
    ) {
      gotoPage(paginationMeta.page - 1);
      setPageSize(paginationMeta.per_page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gotoPage, paginationMeta, setPageSize]);

  if (loading && !data.length) {
    return <TableSkeleton {...skeletonConfig} />;
  }

  if (!loading && !data.length) {
    return <EmptyTable />;
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box display="block">
        <TableContainer
          ref={containerRef}
          component={Paper}
          sx={sx}
          {...tableContainerProps}
        >
          <TableStyled
            hasShadow={hasShadow}
            id={tableId}
            {...tableProps}
            {...getTableProps()}
          >
            <TableHead component="div">
              {headerGroups.map((headerGroup) => {
                const {
                  key,
                  ...headerGroupProps
                } = headerGroup.getHeaderGroupProps();
                return (
                  <Row key={key} {...headerGroupProps}>
                    {headerGroup.headers.map((column) => {
                      const { key, ...cellHeaderProps } = column.getHeaderProps(
                        column.getSortByToggleProps()
                      );

                      return (
                        <Cell
                          variant="head"
                          sortDirection={column.isSortedDesc ? "desc" : "asc"}
                          key={key}
                          {...cellHeaderProps}
                        >
                          <SortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? "desc" : "asc"}
                            hideSortIcon={
                              column.id === "_selector" ||
                              column.id === "__action" ||
                              column.id === "__temp"
                            }
                          >
                            <Stack direction="row" alignItems="center">
                              {column.render("Header")}
                            </Stack>
                          </SortLabel>
                        </Cell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableHead>

            <TableBody component="div" {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...getRowProps } = row.getRowProps();

                return (
                  <Row
                    onClick={() => hasRowClick && onRowClick(row)}
                    hasRowClick={hasRowClick}
                    hover
                    key={key}
                    {...getRowProps}
                  >
                    {row.cells.map((cell) => {
                      const { key, ...getCellProps } = cell.getCellProps();
                      const { clipText = true } = cell.column;

                      return (
                        <Cell variant="body" key={key} {...getCellProps}>
                          <Box
                            sx={{
                              ...(clipText && {
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                display: "block",
                              }),
                            }}
                          >
                            {cell.render("Cell")}
                          </Box>
                        </Cell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableBody>

            <TableFooter>
              <Row>
                <Pagination<T> instance={instance} />
              </Row>
            </TableFooter>
          </TableStyled>
        </TableContainer>

        {/* <Stack direction="row" justifyContent="flex-end">
          <Pagination<T> instance={instance} />
        </Stack> */}
      </Box>
    </ClickAwayListener>
  );
}

const ReactTable = forwardRef(ReactTableWithRef);

export { ReactTable };
