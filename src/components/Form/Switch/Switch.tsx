import {
  Switch as MuiSwitch,
  FormControlLabel,
  FormControlProps,
} from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps } from "..";
import React from "react";

export type SwitchProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps;
    disabled?: boolean;
  };

function Switch<T>({
  name,
  label,
  control,
  controlProps,
  disabled = false,
}: SwitchProps<T>) {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<MuiSwitch onChange={handleChange} checked={!!value} />}
      label={label as string}
      labelPlacement="end"
      sx={{
        "& .MuiTypography-root": { fontSize: 15, fontWeight: 700 },
      }}
      disabled={disabled}
    />
  );
}

export { Switch };
