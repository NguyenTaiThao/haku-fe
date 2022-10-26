import { OutlinedInput, outlinedInputClasses, styled } from "@mui/material";

export type AdditionInputProps = {
  bgcolor?: string | false;
  autoHeight?: boolean;
};

const InputStyled = styled(OutlinedInput, {
  shouldForwardProp: (prop) =>
    !["bgcolor", "autoHeight"].includes(prop as string),
})<AdditionInputProps>(({ theme, bgcolor, autoHeight }) => ({
  [`&.${outlinedInputClasses.disabled}`]: {
    backgroundColor: "#fff",
  },
  "&& .MuiInputBase-inputSizeSmall": {
    height: "1rem",
    fontSize: "0.75rem",
    padding: theme.spacing(1, 1.5),
  },
  "&&.MuiInputBase-sizeSmall": {
    "&& .MuiAutocomplete-input": {
      padding: "2px 4px 2px 6px",
    },
    height: autoHeight ? "auto" : 32,
    minHeight: 32,
  },
  // '& ::placeholder': {
  // color: theme.palette.grey[400]
  // },
  [`& .${outlinedInputClasses.input}`]: {
    borderRadius: 5,
    position: "relative",
    backgroundColor: bgcolor || "none",
    fontSize: 14,
  },
  height: autoHeight ? "auto" : 40,
  minHeight: 40,
  "&& .MuiAutocomplete-input": {
    padding: "2px 4px 2px 6px",
  },
  "&.MuiInputBase-multiline": {
    height: "auto",
  },
}));

export { InputStyled };
