import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DialogContent, DialogProps, Divider, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { DialogTitle } from "components/Dialog";
import IButton from "components/IButton";
import React from "react";
import { DialogStyled } from "./DialogStyled";

type DialogBaseProps = DialogProps & {
  title?: string;
  contentSx?: SxProps;
  fullHeight?: boolean;
};

const DialogBase: React.FC<DialogBaseProps> = ({
  open,
  title,
  onClose,
  children,
  contentSx,
  fullHeight = false,
  ...props
}) => {
  return (
    <DialogStyled
      PaperProps={{
        elevation: 2,
      }}
      open={open}
      fullWidth
      fullHeight={fullHeight}
      onClose={onClose}
      maxWidth="md"
      {...props}
    >
      {title && (
        <DialogTitle>
          <Typography
            variant="h5"
            color="text.secondary"
            py={1.5}
            marginRight="auto"
          >
            {title}
          </Typography>

          <IButton
            onClick={onClose as () => void}
            sx={{ position: "absolute", right: 12 }}
          >
            <CloseRoundedIcon />
          </IButton>
        </DialogTitle>
      )}

      <Divider />

      <DialogContent
        sx={{ py: { md: 4, xs: 2 }, px: { xs: 2, md: 4 }, ...contentSx }}
      >
        {children}
      </DialogContent>
    </DialogStyled>
  );
};

export { DialogBase };
