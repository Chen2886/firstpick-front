import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from "../utils/axiosClient";

export default function CustomerAddDialog(props) {

    const [FN, setFN] = React.useState("");
    const [LN, setLN] = React.useState("");
    const [Age, setAge] = React.useState(0);
    const [Email, setEmail] = React.useState("");
    const [Phone, setPhone] = React.useState("");

    const addToBack = () => {
        axiosClient.post("/customers", {
            First_Name: FN, Last_Name: LN, Age: Age === '' ? null : Age, Email: Email, Phone_Number: Phone
        }).then((res) => {
            props.setOpenAddDialog(false);
        });
    };

    return (
        <Dialog
            open={props.openAddDialog === undefined ? false : props.openAddDialog}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the customer information.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='First Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={FN}
                    onChange={(e) => setFN(e.target.value)}
                    required
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Last Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={LN}
                    onChange={(e) => setLN(e.target.value)}
                    required
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Age'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email Address'
                    type='email'
                    fullWidth
                    variant='standard'
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Phone Number'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
                <Button onClick={addToBack}>Add Order</Button>
            </DialogActions>
        </Dialog>
    );
}
