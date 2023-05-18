import { Alert, AlertTitle, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ErrorAlert() {
  const [open, setOpen] = useState(true);

  const errorMessage = useSelector((state) => state.ui.message);
  const errorStatus = useSelector((state) => state.ui.notificationFlag);
  console.log(errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage, errorStatus]);

  return (
    
    <Collapse in={open}>
      {errorMessage && <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Alert
          severity="error"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          <strong>{errorMessage}</strong>
        </Alert>
      </div>}
    </Collapse>
  );
}
