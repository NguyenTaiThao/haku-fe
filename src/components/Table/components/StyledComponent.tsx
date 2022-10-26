import {
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableCellProps,
  TableProps,
  TableRow,
  tableRowClasses,
  TableRowProps,
  TableSortLabel,
} from "@mui/material";
import React from "react";

const Cell = styled((props: TableCellProps) => (
  <TableCell component="div" {...props} />
))(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    borderColor: theme.palette.grey[200],
  },
  [`&.${tableCellClasses.sizeSmall}`]: {
    height: 40,
    padding: theme.spacing(0.5, 1),
  },
  height: 50,
  fontSize: 14,
  lineHeight: "40px",
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.common.white,
  overflow: "hidden",
}));

const Row = styled(
  (props: TableRowProps) => <TableRow component="div" {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "hasRowClick",
  }
)<{ hasRowClick?: boolean }>(({ theme, hasRowClick }) => ({
  [`&.${tableRowClasses.hover}`]: {
    cursor: hasRowClick ? "pointer" : "auto",
    "&$hover:hover": {
      backgroundColor: theme.palette.grey[100],
      "& td": {
        backgroundColor: theme.palette.grey[100],
      },
    },
  },
}));

const TableStyled = styled(
  (props: TableProps) => <Table component="div" {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "hasShadow",
  }
)<{ hasShadow?: boolean }>(({ theme, hasShadow }) => ({
  overflow: "scroll",
  "& .MuiTableHead-root": {
    position: "sticky",
    zIndex: 1,
    width: "fit-content",
    top: 0,
  },
  "& .MuiTableBody-root": {
    position: "relative",
    zIndex: 0,
  },
  "[data-sticky-td]": {
    position: "sticky",
  },
  ...(hasShadow && {
    "[data-sticky-last-left-td]": {
      boxShadow: `2px 0px 3px ${theme.palette.grey[400]}`,
    },
    "[data-sticky-first-right-td]": {
      boxShadow: `-2px 0px 3px ${theme.palette.grey[400]}`,
    },
  }),
  resizer: {
    display: "inline-block",
    width: 4,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateX(50%)",
    zIndex: 1,
    "&.isResizing": {
      backgroundColor: theme.palette.grey[400],
    },
  },
}));

const SortLabel = styled(TableSortLabel)({});

export { Cell, Row, SortLabel, TableStyled };
