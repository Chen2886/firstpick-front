import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axiosClient from "../utils/axiosClient";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import styled from "styled-components";
import { Divider, Grid, CardActions, IconButton, ratingClasses } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import "../styles/Order.css";
import styledGridItem from "./Recipe";
import FeedbackEditDialog from "./FeedbackEditDialog";


let DateDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
`;

let DividerWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledGridItem = styled(Grid)`
  padding: 1rem;
`;

const StyledExpandWrapper = styled.div`
`;

export default function FeedbackCard(props) {
    let info = props.info;
    let name = info.Name === null ? "" : info.Name;
    let Rating = info.Rating === null ? "" : info.Rating;
    let Feedback_ID = info.Feedback_ID === 0 ? "" : info.Feedback_ID;
    //let Customer_ID = info.Customer_ID === null ? "" : info.Customer_ID;
    let Customer_ID = 0;

    let comment = info.Comment === null ? "" : info.Comment;

    const [feedback, setFeedback] = React.useState([]);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    useEffect(() => {
        // use axiosClient created to get all ingredient lists
        axiosClient.get("/feedback", {params: {Customer_ID, Rating, Comment}},)
            .then((res) => {
            setFeedback(res.data);
            //console.log(res.data);
            });
        axiosClient.post("/feedback", {params: {Customer_ID, Rating, Comment}},)
            .then((res) => {
            setFeedback(res.data);
            //console.log(res.data);
        });
      }, []);

      const deleteFeedback = async (Recipe_ID) => {
        var deleted = true;

       await axiosClient
        .delete("/feedback",{data: {Feedback_ID: Feedback_ID }})
        .then((res) => {
        })
        // .catch((err) => {
        //     deleted = false;
        //     setShowDialog(true);
        //     return (
        //       <div>
        //         <Dialog open={showDialog}>
        //         <DialogContent> We cannot remove this item from the menu because somebody has currently ordered it. 
        //           <DialogActions>
        //         <Button onClick={() => setShowDialog(false)}>Cancel</Button>
        //         </DialogActions>
        //         </DialogContent> 
        //         </Dialog>
        //       </div>
        //     );
        // });

      };

    return (
      <StyledExpandWrapper>

        <FeedbackEditDialog
          key={openEditDialog}
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          Feedback_ID = {Feedback_ID}
          Customer_ID = {Customer_ID}
          Comment = {Comment}
          Rating = {Rating}
        ></FeedbackEditDialog>
      
        <Card>
          <CardHeader title={'Feedback_ID: ' + Feedback_ID} subheader={'Rating: ' + Rating} />
          <IconButton onClick={() => deleteFeedback(info.Feedback_ID)}>
          {/* <IconButton> */}
            <DeleteIcon />
          </IconButton>
          {(
            <IconButton onClick={() => setOpenEditDialog(true)}>
              <EditIcon />
          </IconButton>
          )}
          
                  <StyledGridItem>
                    {comment}
                  </StyledGridItem>

        </Card>
        </StyledExpandWrapper>
      );
}