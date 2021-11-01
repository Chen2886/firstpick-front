import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@material-ui/data-grid'

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

  const [customer, addCustomer] = React.useState([]);
  //const [customer, deleteCustomer] = React.useState({});

  // gets all the customers from backend the first time the component loads
  useEffect(() => {
    // use axiosClient created to get all customers
    axiosClient.get("/customers").then((res) => {
      addCustomer(res.data);
    });
  }, []);

  // return <div>Customer</div>;
  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={customer}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
      />
    </div>
  );
}
