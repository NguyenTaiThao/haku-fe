import {
  AvatarProps,
  Box,
  Button,
  FormControlProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FileBag, useModalState, useUploader } from "lib/hooks";
import React, { HTMLInputTypeAttribute, useCallback, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps, InputControl } from "./Form";
import ImageIcon from "@mui/icons-material/Image";

export type AvatarUploadProps<T> = UseControllerProps<T> &
  AvatarProps<
    "div",
    AddControlProps & {
      controlProps?: FormControlProps;
      urlUpload?: string;
      size?: number;
      multiple?: boolean;
      imageSize?: {
        width: number | string;
        height: number | string;
      };
      disableEmptyText?: boolean;
      inputProps?: HTMLInputTypeAttribute;
      disabled?: boolean;
    }
  >;

function ImageUpload<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  controlProps,
  urlUpload,
  size = 96,
  multiple,
  imageSize,
  disableEmptyText,
  inputProps,
  required,
  disabled,
  ...props
}: AvatarUploadProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  const { isOpen, onClose, onOpen } = useModalState();
  const [textError, setTextError] = useState<string>();

  const { onDrop } = useUploader({
    url: urlUpload || "upload-file",
    onUploaded(file: FileBag) {
      onChange(file.responseData.url);
    },
  });

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onDrop(target.files as FileList);
  };

  const Picker = useCallback(
    () => (
      <Stack justifyContent="flex-end">
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor={`image-uploader-button-${name}`}>
            <HiddenInput
              accept="image/*"
              id={`image-uploader-button-${name}`}
              type="file"
              onChange={handleChooseImage}
              disabled={disabled}
              // {...inputProps}
            />

            <Button
              variant="contained"
              color="info"
              component="span"
              disableElevation
              disabled={disabled}
            >
              File
            </Button>
          </label>

          {!disableEmptyText && !value && (
            <Typography variant="body2" color="grey.600">
              No file choose
            </Typography>
          )}
        </Stack>
      </Stack>
    ),
    [disableEmptyText, handleChooseImage, inputProps, name, value]
  );

  return (
    <>
      <InputControl
        label={label}
        fieldError={error}
        helperText={textError}
        required={required}
        fullWidth
      >
        {value ? (
          <Box
            sx={{
              cursor: "pointer",
              width: imageSize?.width || 400,
              height: imageSize?.height || 200,
            }}
            mb={1}
            onClick={onOpen}
          >
            <img
              src={value as string}
              height={imageSize?.height || 200}
              alt="upload"
            />
          </Box>
        ) : (
          <Box
            borderRadius={2}
            mb={1}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: imageSize?.width || 400,
              height: imageSize?.height || 200,
            }}
            bgcolor="grey.50"
            component="label"
            htmlFor={`image-uploader-button-${name}`}
          >
            <ImageIcon color="disabled" sx={{ fontSize: "2rem" }} />
            <Typography color="grey.300" sx={{ cursor: "inherit" }} ml={1}>
              No file choose
            </Typography>
            <HiddenInput
              accept="image/*"
              id={`image-uploader-button-${name}`}
              type="file"
              onChange={handleChooseImage}
              // {...inputProps}
            />
          </Box>
        )}
        <Picker />
      </InputControl>
    </>
  );
}

const HiddenInput = styled("input")({
  display: "none",
});

export { ImageUpload };
