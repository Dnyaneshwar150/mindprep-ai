import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CommonButton from "./CummonButton";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "0.875rem",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 500,
          fontSize: "1rem",
          pb: 0,
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
        >
          <Grid width={"90%"}> {title} </Grid>
          <Grid>
            <IconButton
              aria-label='close'
              onClick={onClose}
              sx={{ p: 0.5 }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      {children && (
        <DialogContent sx={{ pt: 1, pb: 0 }}>{children}</DialogContent>
      )}

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          pt: 3,
          pb: 2,
        }}
      >
        <CommonButton
          onClick={onConfirm}
          sx={{
            px: 3,
            py: 1,
            borderRadius: "0.5rem",
            textTransform: "none",
          }}
        >
          {confirmText}
        </CommonButton>
        <CommonButton
          onClick={onClose}
          sx={{
            px: 3,
            py: 1,
            borderRadius: "0.5rem",
            textTransform: "none",
          }}
        >
          {cancelText}
        </CommonButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
