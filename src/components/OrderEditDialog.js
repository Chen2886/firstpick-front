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

export default function OrderEditDialog(props) {
  const [date, setDate] = React.useState();
  const [annoymousChecked, setAnnoymousChecked] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState();
  const [selectedCustomer, setSelectedCustomer] = React.useState();

  React.useEffect(() => {
    if (props.info !== undefined) {
      if (
        props.info.Customer_ID === undefined ||
        props.info.Customer_ID === null
      ) {
        setAnnoymousChecked(true);
        setSelectedCustomer(props.customers[0].id);
      } else {
        setAnnoymousChecked(false);
        setSelectedCustomer(props.info.Customer_ID);
      }
      setSelectedRecipe(props.info.Recipe_ID);
      setDate(new Date(props.info.Date));
    }
  }, [props]);

  const updateOrder = () => {
    var reqObj = {
      date: date.toISOString(),
      Recipe_ID: selectedRecipe,
      Order_ID: props.info.Order_ID,
    };
    if (!annoymousChecked) {
      reqObj.Customer_ID = selectedCustomer;
    } else {
      reqObj.Customer_ID = null;
    }

    axiosClient.put("/orders", reqObj).then((res) => {
      setDate(new Date());
      props.editOrder(undefined);
      props.pullOrders();
    });
  };

  return (
    <Dialog open={props.info !== undefined}>
      <DialogTitle>Edit Order</DialogTitle>
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
        <Button onClick={() => props.editOrder(undefined)}>Cancel</Button>
        <Button onClick={updateOrder}>Update Order</Button>
      </DialogActions>
    </Dialog>
  );
}
