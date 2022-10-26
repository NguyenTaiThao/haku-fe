import { DatePickerProps } from "@mui/lab";
import MuiDatePicker from "@mui/lab/DatePicker";
import { FormControlProps, TextField } from "@mui/material";
import { isValid } from "date-fns";
import { formatISODate, safeParseISO } from "lib/utils";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps, InputControl } from "..";
import React from "react";

type ControlProps = AddControlProps & {
  controlProps?: FormControlProps;
  fullWidth?: boolean;
};

type DatePickerType<T> = UseControllerProps<T> &
  ControlProps &
  Omit<DatePickerProps, "renderInput" | "onChange" | "value">;

function DatePicker<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  fullWidth,
  controlProps,
  required,
  ...props
}: DatePickerType<T>) {
  const {
    field: { onChange, value, ref, ...inputProps },
    fieldState: { error: fieldError },
  } = useController({ name, control, defaultValue });

  const handleChange = (newValue: unknown) => {
    if (!isValid(newValue)) return onChange("");
    onChange(formatISODate(newValue as Date, "/"));
  };

  return (
    <InputControl
      fieldError={fieldError}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      required={required}
      {...controlProps}
    >
      <MuiDatePicker
        {...props}
        {...inputProps}
        inputFormat="yyyy-MM-dd"
        mask="____-__-__"
        value={value ? safeParseISO(value as string) : null}
        onChange={handleChange}
        inputRef={ref}
        renderInput={(params) => (
          <TextField size="small" {...params} error={!!fieldError} />
        )}
      />
    </InputControl>
  );
}

export { DatePicker };
