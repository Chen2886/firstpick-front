import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";

// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@material-ui/data-grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomerAddDialog from "./CustomerAddDialog";
import styled from "styled-components";

const col = ["First Name", "Last Name", "Age", "Email", "Phone Number"];

const StyledGridContainer = styled(Grid)`
  margin-top: 1rem;
`;

export default function Customer() {

  const [customer, setCustomer] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  useEffect(() => {
    axiosClient.get("/customers").then((res) => {
      setCustomer(res.data);
    });
  }, []);

  return (
    <div>
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
