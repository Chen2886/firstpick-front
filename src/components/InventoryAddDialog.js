import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from "../utils/axiosClient";

export default function FeedbackAddDialog(props) {

    const [item, setItem] = React.useState("");
    const addInventory = () => {
        console.log(item)
        axiosClient.post("/inventory", {Ingredient: item, Amount_Left: 0}).then((res) => {
            //props.addInventory();
            props.setOpenAddDialog(false); 
        });
        console.log("posted")
    };

    return (
        <Dialog
            open={props.openAddDialog === undefined ? false : props.openAddDialog}>
            <DialogTitle>Add Inventory</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter item name.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Item'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
                <Button onClick={addInventory}>Add Inventory</Button>
            </DialogActions>
        </Dialog>
    );
}
