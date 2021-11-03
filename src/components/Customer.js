import React, { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import {
  Fab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomerAddDialog from "./CustomerAddDialog";

const col = ["First Name", "Last Name", "Age", "Email", "Phone Number"];

export default function Customer() {
  const [customer, addCustomer] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  useEffect(() => {
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
      <TableContainer component={Paper}>
        <Table stickyHeader size='medium'>
          <TableHead>
            <TableRow>
              {col.map((item) => (
                <TableCell>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{row.First_Name}</TableCell>
                <TableCell>{row.Last_Name}</TableCell>
                <TableCell>{row.Age}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Phone_Number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab onClick={() => setOpenAddDialog(true)} color='primary'>
        <AddIcon />
      </Fab>
    </div>
  );
}
