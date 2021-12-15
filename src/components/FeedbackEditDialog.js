import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from "../utils/axiosClient";
import { Checkbox } from "@mui/material";
import styled from "styled-components";

export default function FeedbackEditDialog(props) {

  const changeFeedback = () => {
    var reqObj = {
        Rating: rating,
        Comment: comment,
        Feedback_ID: Feedback_ID
      };
  
      axiosClient.put("/feedback", reqObj).then((res) => {
        props.setOpenEditDialog(false);
      });
  };

  let CheckDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
`;

  const [rating, setRating] = React.useState(props.rating);
  const [comment, setComment] = React.useState(props.comment);
  const [Feedback_ID, setFeedbackID] = React.useState(props.Feedback_ID);


  return (
    <Dialog
      open={props.openEditDialog === undefined ? false : props.openEditDialog}>
      <DialogTitle>Edit Feedback</DialogTitle>
      <DialogContent>

      <DialogContentText>
          Feedback_ID:
        </DialogContentText>
      <TextField
                    autoFocus
                    margin='dense'
                    id='Feedback_ID'
                    label='Feedback_ID'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={Feedback_ID}
                    onChange={(e) => setFeedbackID(e.target.value)}
                    required
                />
      <DialogContentText>
          Rating:
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
        <DialogContentText>
          Comment:
        </DialogContentText>
      <TextField
                    autoFocus
                    margin='dense'
                    id='comment'
                    label='Comment'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
        </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenEditDialog(false)}>Cancel</Button>
        <Button onClick={changeFeedback}>Change Feedback</Button>
      </DialogActions>
    </Dialog>
  );
}
