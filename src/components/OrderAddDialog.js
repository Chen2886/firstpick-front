import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function OrderAddDialog(props) {
  return (
    <Dialog
      open={props.openAddDialog === undefined ? false : props.openAddDialog}>
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the order information
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
        <Button onClick={() => props.setOpenAddDialog(false)}>Add Order</Button>
      </DialogActions>
    </Dialog>
  );
}
