import { FormControlProps } from "@mui/material";
import { Editor as RichTextEditor, IAllProps } from "@tinymce/tinymce-react";
import { useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps, InputControl } from "../components";
import React from "react";
import { apiKey, init } from "./config";

export type RichTextProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps;
    initOptions?: IAllProps["init"];
  } & IAllProps;

function RichText<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  controlProps,
  initOptions,
  ...props
}: RichTextProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const onEditorChange = useCallback(
    (newValue: string) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <InputControl
      fieldError={error}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      <RichTextEditor
        apiKey={apiKey}
        value={(value as string) || ""}
        init={{ ...init, ...initOptions }}
        onEditorChange={onEditorChange}
        {...props}
      />
    </InputControl>
  );
}

export { RichText };
