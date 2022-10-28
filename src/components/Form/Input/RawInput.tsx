import {
  Box,
  FormControlProps,
  InputBase,
  OutlinedInputProps,
  Stack,
} from "@mui/material";
import PDF from "assets/images/pdf.png";
import { FieldError } from "react-hook-form";
import { InputStyled } from "../components/InputStyled";
import React from "react";
import { AddControlProps, InputControl } from "../components";

export type RawInputProps = OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps;
    fieldError?: FieldError | boolean;
    variant?: "base" | "outlined";
    layout?: "image" | "pdf";
  };

function RawInput({
  fullWidth,
  label,
  helperText,
  controlProps,
  fieldError,
  variant,
  layout,
  value,
  ...props
}: RawInputProps) {
  return (
    <InputControl
      fieldError={fieldError}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      <Stack direction="row" spacing={1} alignItems="flex-end">
        {value ? (
          <>
            <Box
              sx={{
                cursor: "pointer",
                width: 120,
                height: 120,
              }}
              mb={1}
            >
              <img
                src={value as string}
                height={120}
                width={120}
                alt="upload"
              />
            </Box>
          </>
        ) : (
          ""
        )}
        {variant === "base" ? (
          <InputBase {...props} />
        ) : (
          <InputStyled {...props} />
        )}
      </Stack>
    </InputControl>
  );
}

export { RawInput };
