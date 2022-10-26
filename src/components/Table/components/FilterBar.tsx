import {
  Box,
  BoxProps,
  Button,
  Collapse,
  debounce,
  Grid,
  Portal,
  Stack,
} from "@mui/material";
import { Input, InputProps, Select, SelectProps } from "components/Form";
import { UnknownObj } from "lib/types";
import { snakeToCamel } from "lib/utils";
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Column } from "react-table";
import SearchIcon from "@mui/icons-material/Search";
import { Radio } from "components/Form/Input/Radio";

type SelectOption = {
  label: string;
  value: unknown;
};

export type FilterBarColumn = {
  regex?:
    | "_like"
    | "_equal"
    | "_between"
    | "_notEqual"
    | "_isnull"
    | "has_"
    | "none";
  queryKey?: string;
  searchType?: "select" | "text" | "radio";
  additionSearchProps?: Partial<
    SelectProps<UnknownObj, UnknownObj> | InputProps<UnknownObj>
  >;
  search?: boolean;
  options?: SelectOption[];
};
export type ChildrenProps = {
  children?: ReactNode;
};

export type FilterBarProps<T extends UnknownObj> = BoxProps<
  "div",
  {
    searchColumns: Column<T>[];
    handleChangeParams: (params: UnknownObj) => void;
    watchMode?: boolean;
    searchContainer?: HTMLElement;
  }
>;

const convertRelationship = (accessor = "") => {
  const arr = accessor.split(".");
  return [snakeToCamel(arr[0]), arr[1]].join(":");
};
const convertParamKey = (accessor = ""): string => {
  // Replace all array key
  const _accessor = accessor.replace(/\[[^\]]*\]/g, "");
  const name = _accessor.includes(".")
    ? convertRelationship(_accessor)
    : accessor;
  return name;
};

function FilterBarComponent<T extends UnknownObj>({
  handleChangeParams,
  searchColumns,
  watchMode,
  searchContainer,
  ...props
}: FilterBarProps<T>) {
  const { control, handleSubmit, watch, reset } = useForm<UnknownObj>({
    defaultValues: searchColumns.reduce((df, cur) => {
      (df as UnknownObj)[convertParamKey(cur["accessor"] as string)] = "";
      return df;
    }, {}),
  });

  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const getSearchObj = useCallback(
    (key: string) => {
      return searchColumns.find(
        (el) => convertParamKey(el.accessor as string) === key
      );
    },
    [searchColumns]
  );

  const getQueryParams = useCallback(
    (values: UnknownObj) => {
      const params = Object.keys(values).reduce<UnknownObj>((_params, cur) => {
        if (values[cur]) {
          const searchObj = getSearchObj(cur);
          const _regex = (searchObj as FilterBarColumn)?.regex || "_like";
          const regex = _regex === "none" ? "" : _regex;
          const queryKey = (searchObj as FilterBarColumn)?.queryKey || cur;
          _params[`${queryKey}${regex}`] = values[cur];
        }
        return _params;
      }, {});

      return params;
    },
    [getSearchObj]
  );

  const debounceChange = useMemo(
    () => debounce((params) => handleChangeParams(params), 300),
    [handleChangeParams]
  );

  useEffect(() => {
    if (!watchMode) return;
    const subscription = watch((value, { name }) => {
      const searchObj = getSearchObj(name as string);
      const hasDebounce =
        (searchObj as FilterBarColumn)?.searchType === "text" ||
        (searchObj as FilterBarColumn)?.searchType === undefined;
      const params = getQueryParams(value);
      if (hasDebounce) {
        debounceChange(params);
      } else {
        handleChangeParams(params);
      }
    });

    return () => subscription.unsubscribe();
  }, [
    debounceChange,
    getQueryParams,
    getSearchObj,
    handleChangeParams,
    watch,
    watchMode,
  ]);

  const onSubmit: SubmitHandler<UnknownObj> = (values) => {
    const params = getQueryParams(values);
    handleChangeParams(params);
  };

  const handleReset = (values: any) => {
    const params = getQueryParams(values);
    reset();
    handleChangeParams(params);
  };

  const SearchLayout: React.FC<ChildrenProps> = useCallback(
    ({ children }) => (
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="inherit"
          sx={{ height: 32 }}
          size="small"
          onClick={handleClick}
        >
          <SearchIcon sx={{ fill: "black" }} />
        </Button>

        <Portal container={searchContainer}>
          <Collapse in={open}>
            <Box sx={{ border: 1, padding: 2, borderRadius: 2 }}>
              <Grid spacing={2} mb={2} container>
                {children}
              </Grid>
              {!watchMode && (
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    sx={{ height: 32 }}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                  >
                    Search
                  </Button>
                  <Button
                    type="submit"
                    sx={{ height: 32 }}
                    onClick={() => handleReset(1)}
                    variant="contained"
                  >
                    Reset
                  </Button>
                </Stack>
              )}
            </Box>
          </Collapse>
        </Portal>
      </Stack>
    ),
    [handleClick, handleSubmit, onSubmit, open, searchContainer, watchMode]
  );

  const SearchItemContainer: React.FC<ChildrenProps> = useCallback(
    ({ children }) => (
      <Grid item md={3} sm={4}>
        {children}
      </Grid>
    ),
    []
  );

  return (
    <Box
      component="form"
      width="100%"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      {...props}
    >
      <SearchLayout>
        {(searchColumns as any[]).map(
          (
            {
              accessor = "",
              Header,
              searchType,
              additionSearchProps,
              search = true,
              options,
            },
            index
          ) => {
            const name = convertParamKey(accessor as string);
            const controlProps = {
              name: name,
              label: Header as string,
              control,
              key: index,
            };

            if (!search) return null;

            switch (searchType) {
              case "select":
                return (
                  <SearchItemContainer key={index}>
                    <Select
                      fullWidth
                      size="small"
                      {...controlProps}
                      {...additionSearchProps}
                    />
                  </SearchItemContainer>
                );
              case "radio":
                return (
                  <SearchItemContainer key={index}>
                    <Radio
                      options={options}
                      {...controlProps}
                      {...additionSearchProps}
                    />
                  </SearchItemContainer>
                );
              default:
                return (
                  <SearchItemContainer key={index}>
                    <Input
                      fullWidth
                      size="small"
                      {...controlProps}
                      {...additionSearchProps}
                    />
                  </SearchItemContainer>
                );
            }
          }
        )}
      </SearchLayout>
    </Box>
  );
}

const FilterBar = memo(FilterBarComponent) as typeof FilterBarComponent;

export { FilterBar };
