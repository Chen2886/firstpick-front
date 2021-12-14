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
    const [feedbackID, setFeedbackID] = React.useState("");
    const [customerID, setCustomerID] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [comment, setComment] = React.useState("");

    const addFeedback = () => {
        console.log(rating, comment)
        axiosClient.post("/feedback", {Customer_ID: 12, 
            Rating: rating, Comment: comment}).then((res) => {
            props.setOpenAddDialog(false);
            console.log(0, rating, comment)
        });
        console.log("posted")
        //feedbackID++;
    };

    return (
        <Dialog
            open={props.openAddDialog === undefined ? false : props.openAddDialog}>
            <DialogTitle>Add Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter rating and comment.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='rating'
                    label='Rating'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />
                <TextField
                    // autoFocus
                    margin='dense'
                    id='comment'
                    label='Comment'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={comment}
                    onChange={(ee) => setComment(ee.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
                <Button onClick={addFeedback}>Add Feedback</Button>
            </DialogActions>
        </Dialog>
    );
}
