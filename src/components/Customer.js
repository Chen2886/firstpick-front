import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@material-ui/data-grid'

// add a customer
// remove a customer
// show the customers in table form

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 150,
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone number', width: 200 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Customer() {

  const [customer, addCustomer] = React.useState({});
  //const [customer, deleteCustomer] = React.useState({});

  // gets all the customers from backend the first time the component loads
  useEffect(() => {
    // use axiosClient created to get all customers
    axiosClient.get("/customers").then((res) => {
      addCustomer(res.data.Current);
      // setCompletedOrder(res.data.Completed);
      // setLoading(false);
    });
  }, []);

  // return <div>Customer</div>;
  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        checkboxSelection
      />
    </div>
  );
}
