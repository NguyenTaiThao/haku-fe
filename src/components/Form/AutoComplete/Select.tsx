import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  FormControlProps,
  InputAdornment,
  OutlinedInputProps,
} from "@mui/material";
import { useSelectQuery } from "lib/hooks";
import { UnknownObj } from "lib/types";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps, InputControl } from "../components";
import { InputStyled } from "../components/InputStyled";
import { PopperComponent } from "./PopperComponent";

export type SelectOption = {
  label: string;
  value: unknown;
};

export type SelectQueryProps<T extends UnknownObj> = {
  query?: string;
  queryFilter?: string;
  addQueryFilter?: UnknownObj;
  labelValueKeys?: any;
};

export type LabelValueType<T> = any;

export type BaseSelectProps<T, F> = UseControllerProps<F> &
  AddControlProps &
  OutlinedInputProps & {
    controlProps?: FormControlProps;
    options?: SelectOption[];
    multiple?: boolean;
    loading?: boolean;
    labelValueKeys?: LabelValueType<T>;
    autocompleteProps?: Omit<
      AutocompleteProps<
        SelectOption,
        boolean | undefined,
        undefined,
        undefined
      >,
      "renderInput" | "options"
    >;
  };

export type SelectProps<T extends UnknownObj, F> = BaseSelectProps<T, F> &
  SelectQueryProps<T>;

const defaultKey = ["name", "id"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Select<T extends UnknownObj, F = any>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  options: rawOptions,
  multiple,
  loading,
  query,
  queryFilter,
  addQueryFilter,
  labelValueKeys = defaultKey as LabelValueType<T>,
  autocompleteProps,
  required,
  disabled,
  ...props
}: SelectProps<T, F>) {
  const {
    field: { ref, onChange, onBlur, value: rawValue },
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const [inputValue, setInputValue] = useState("");

  const queryParams = useMemo(() => {
    if (!queryFilter && !addQueryFilter) return { per_page: 9999 };
    const inputParams =
      inputValue && queryFilter ? { [queryFilter]: inputValue } : undefined;

    return { per_page: -1, ...inputParams, ...addQueryFilter };
  }, [addQueryFilter, inputValue, queryFilter]);

  const { options: queryOptions, disabledOptions, isLoading } = useSelectQuery<
    T
  >({
    endpoint: query,
    params: queryParams,
    labelValueKeys: labelValueKeys as Array<keyof T | keyof T>,
    enabled: !!query,
  });

  const filterValue = useCallback(
    (value: unknown | unknown[]) => {
      const _options = query ? queryOptions : rawOptions;

      if (!_options) {
        return multiple ? [] : null;
      }

      if (multiple) {
        return (
          _options.filter(
            (option) =>
              ((value as unknown[]) || []).findIndex(
                (el) => el === option.value
              ) !== -1
          ) || []
        );
      }

      return _options.find((option) => option.value === value) || null;
    },
    [query, queryOptions, rawOptions, multiple]
  );

  const [value, setValue] = useState(filterValue(rawValue));

  useEffect(() => {
    setValue(filterValue(rawValue));
  }, [rawValue, filterValue, multiple]);

  const handleChangeValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: SelectOption | SelectOption[] | null
  ) => {
    if (!newValue) return;
    if (multiple) {
      const _value = (newValue as SelectOption[]).map((option) => option.value);
      onChange(_value);
    } else {
      onChange((newValue as SelectOption).value);
      setInputValue((newValue as SelectOption).label);
    }

    setValue(newValue);
  };

  const handleChangeInputValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setInputValue(newValue);
    if (!newValue) {
      onChange("");
    }
  };

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      required={required}
      {...controlProps}
    >
      <Autocomplete
        disabled={disabled}
        {...autocompleteProps}
        sx={{
          minWidth: 150,
          "& .MuiOutlinedInput-root": {
            py: 0,
            color: disabled ? "#00000061" : "#000",
          },
          ...autocompleteProps?.sx,
        }}
        value={value}
        inputValue={inputValue}
        onChange={handleChangeValue}
        onInputChange={handleChangeInputValue}
        multiple={multiple}
        onBlur={onBlur}
        ref={ref}
        loading={loading || isLoading}
        PopperComponent={(params) => (
          <PopperComponent size={props?.size} {...params} />
        )}
        disablePortal
        options={rawOptions || queryOptions}
        isOptionEqualToValue={(options, value) => options.value === value.value}
        renderInput={(params) => (
          <InputStyled
            autoHeight
            fullWidth
            {...params.InputProps}
            inputProps={params.inputProps}
            endAdornment={
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </InputAdornment>
            }
            {...props}
          />
        )}
        popupIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
        clearIcon={<CloseIcon sx={{ fontSize: 16 }} />}
        getOptionDisabled={(option) => disabledOptions.includes(option.value)}
        noOptionsText="Empty data"
      />
    </InputControl>
  );
}

export { Select };
