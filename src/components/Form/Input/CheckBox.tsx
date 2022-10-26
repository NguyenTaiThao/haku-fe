import { Checkbox, FormControlLabel, FormControlProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps } from "..";
import React from "react";

export type CheckBoxProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps;
    disabled?: boolean;
  };

function CheckBox<T>({
  name,
  label,
  control,
  controlProps,
  disabled,
}: CheckBoxProps<T>) {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={handleChange}
          checked={!!value}
          disabled={disabled}
        />
      }
      label={label as string}
      sx={{
        "& .MuiTypography-root": { fontSize: 15, fontWeight: 700 },
        ...controlProps?.sx,
      }}
    />
  );
}

export { CheckBox };
