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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axiosClient from "../utils/axiosClient";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

export default function OrderAddDialog(props) {
  const [date, setDate] = React.useState(new Date());
  const [annoymousChecked, setAnnoymousChecked] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState(
    props.recipes[0] === undefined ? 0 : props.recipes[0].Recipe_ID
  );
  const [selectedCustomer, setSelectedCustomer] = React.useState(
    props.customers[0] === undefined ? 0 : props.customers[0].id
  );

  const addOrder = () => {
    var reqObj = {
      date: date.toISOString(),
      Recipe_ID: selectedRecipe,
    };
    if (!annoymousChecked) {
      reqObj.Customer_ID = selectedCustomer;
    }

    axiosClient.post("/orders", reqObj).then((res) => {
      setDate(new Date());
      props.addOrder();
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
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
          }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              style={{ marginTop: "5rem" }}
              renderInput={(props) => <TextField {...props} />}
              label='DateTimePicker'
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <InputLabel>Recipe</InputLabel>
          <Select
            label='Recipe'
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}>
            {props.recipes.map((item) => {
              return (
                <MenuItem key={item.Recipe_ID} value={item.Recipe_ID}>
                  {item.Name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{ marginTop: "1rem" }}
          disabled={annoymousChecked}>
          <InputLabel>Customer</InputLabel>
          <Select
            label='Customer'
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}>
            {props.customers.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.First_Name + " " + item.Last_Name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={annoymousChecked}
              onChange={(e) => setAnnoymousChecked(e.target.checked)}
            />
          }
          label='Annoymous Order'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
        <Button onClick={addOrder}>Add Order</Button>
      </DialogActions>
    </Dialog>
  );
}
