import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControlProps, OutlinedInputProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { AdditionInputProps, InputStyled } from "../components/InputStyled";
import React from "react";
import { AddControlProps, InputControl } from "../components";

export type InputProps<T> = UseControllerProps<T> &
  OutlinedInputProps &
  AddControlProps &
  AdditionInputProps & {
    controlProps?: FormControlProps;
    insideLabel?: string;
    endAdornment?: React.ReactNode;
  };

function Input<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  insideLabel,
  required,
  type,
  endAdornment,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const [hiddenPassword, setHiddenPassword] = useState(true);

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      required={required}
      {...controlProps}
    >
      <InputStyled
        label={insideLabel}
        value={value || ""}
        {...inputProps}
        {...props}
        inputRef={ref}
        type={!hiddenPassword ? "text" : type}
        endAdornment={
          type === "password" && !endAdornment ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setHiddenPassword((pre) => !pre)}>
                {hiddenPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            endAdornment
          )
        }
      />
    </InputControl>
  );
}

export { Input };
