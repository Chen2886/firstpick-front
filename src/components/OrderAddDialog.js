import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import axiosClient from "../utils/axiosClient";

export default function OrderAddDialog(props) {
  const [value, setValue] = React.useState(new Date());
  const addOrder = () => {
    console.log(value.toISOString());
    axiosClient
      .post("/orders", {
        date: value.toISOString(),
      })
      .then((res) => {
        setValue(new Date());
        props.setOpenAddDialog(false);
      });
  };

  return (
    <Dialog
      open={props.openAddDialog === undefined ? false : props.openAddDialog}>
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the order information
        </DialogContentText>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label='DateTimePicker'
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
        <Button onClick={addOrder}>Add Order</Button>
      </DialogActions>
    </Dialog>
  );
}
