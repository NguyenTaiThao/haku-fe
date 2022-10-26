import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, useTheme } from "@mui/material";
import { UnknownObj } from "lib/types";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { FilterBar, FilterBarProps } from "./Table/components/FilterBar";

export type HeaderProps<T extends UnknownObj> = FilterBarProps<T> & {
  path?: string;
  hideCreateBtn?: boolean;
  filterBarLayout?: "inline" | "collapse";
  hasCreate?: boolean;
};

function TopHeader<T extends UnknownObj>({
  path,
  searchColumns,
  hideCreateBtn = false,
  handleChangeParams,
  hasCreate = true,
}: HeaderProps<T>) {
  const history = useHistory();

  const handleCreate = () => {
    history.push(path as string);
  };

  const theme = useTheme();
  const gridContainer = useRef<HTMLElement>();

  return (
    <Stack ref={gridContainer} mb={2}>
      <Stack
        direction="row"
        spacing={{ md: 2, lg: 4 }}
        justifyContent={"flex-end"}
        alignItems="flex-end"
        mb={2}
      >
        {hasCreate && (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<AddIcon sx={{ fill: theme.palette.common.black }} />}
            onClick={handleCreate}
            sx={{ width: 120 }}
          >
            Create
          </Button>
        )}

        <FilterBar
          searchColumns={searchColumns}
          searchContainer={gridContainer.current}
          handleChangeParams={handleChangeParams}
        />
      </Stack>
    </Stack>
  );
}

export { TopHeader };
