import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@material-ui/data-grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomerAddDialog from "./CustomerAddDialog";

// add a customer
// remove a customer
// show the customers in table form

const columns = [
  { field: 'First_Name', headerName: 'First name', width: 200 },
  { field: 'Last_Name', headerName: 'Last name', width: 200 },
  {
    field: 'Age',
    headerName: 'Age',
    type: 'number',
    width: 150,
  },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Phone_Number', headerName: 'Phone number', width: 200 },
];

export default function Customer() {

  const [customer, setCustomer] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  //const [customer, deleteCustomer] = React.useState({});

  // gets all the customers from backend the first time the component loads
  useEffect(() => {
    // use axiosClient created to get all customers
    axiosClient.get("/customers").then((res) => {
      setCustomer(res.data);
    });
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <CustomerAddDialog
        key={openAddDialog}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}>
      </CustomerAddDialog>
      <DataGrid
        rows={customer}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection={true}
      />
      <Fab onClick={() => setOpenAddDialog(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="delete">
        <DeleteIcon />
      </Fab>
    </div>
  );
}
