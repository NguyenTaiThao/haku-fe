import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
} from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { AddControlProps } from "..";
import React from "react";

type SelectOption = {
  label: string;
  value: unknown;
};

export type CheckBoxProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps;
    options: SelectOption[];
  };

function Radio<T>({
  name,
  label,
  control,
  options,
  controlProps,
}: CheckBoxProps<T>) {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 15, fontWeight: 700, color: "#000" }}>
        {label}
      </FormLabel>
      <RadioGroup row>
        {options?.map((el, index) => (
          <FormControlLabel
            key={index}
            value={el.value}
            control={<MuiRadio />}
            label={el.label}
            onChange={(event) =>
              handleChange(event as React.ChangeEvent<HTMLInputElement>)
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export { Radio };
