import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { DataGrid } from "@material-ui/data-grid";
import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomerAddDialog from "./CustomerAddDialog";

const columns = [
  { field: "First_Name", headerName: "First name", width: 200 },
  { field: "Last_Name", headerName: "Last name", width: 200 },
  {
    field: "Age",
    headerName: "Age",
    type: "number",
    width: 200,
  },
  { field: "Email", headerName: "Email", width: 200 },
  { field: "Phone_Number", headerName: "Phone number", width: 200 },
];

export default function Customer() {
  const [customer, addCustomer] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  // gets all the customers from backend the first time the component loads
  useEffect(() => {
    // use axiosClient created to get all customers
    axiosClient.get("/customers").then((res) => {
      addCustomer(res.data);
    });
  }, []);

  return (
    <div>
      <CustomerAddDialog
        key={openAddDialog}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}></CustomerAddDialog>
      <Grid container justifyContent='center'>
        <Grid item xs={11}>
          <DataGrid autoHeight rows={customer} columns={columns} />
        </Grid>
        <Grid item xs={1}>
          <Fab onClick={() => setOpenAddDialog(true)} color='primary'>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}
