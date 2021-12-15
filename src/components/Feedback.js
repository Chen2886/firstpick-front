import React, { useEffect } from "react";
import FeedbackCard from "./FeedbackCard";
import axiosClient from "../utils/axiosClient";
import FeedbackAddDialog from "./FeedbackAddDialog";

import {
  Grid,
  Stack,
  IconButton,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { AddCircle } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledGrid = styled(Grid)`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
`;

const StyledGridItem = styled(Grid)`
  padding: 1rem;
`;

const AddOrderGridItem = styled(Grid)`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const StyledGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 3rem;
`;

const StyledAddButton = styled(IconButton)`
  font-size: 50px;
`;

const StyledExpandWrapper = styled.div`
  margin: 5rem;
  margin-top: 2rem;
`;

export default function Feedback() {
  const [feedbackInfo, setFeedback] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [Feedback_ID, setFeedbackID] = React.useState(0);
  const [Customer_ID, setCustomerID] = React.useState(0); 
  const [Rating, setRating] = React.useState(0);
  const [Comment, setComment] = React.useState(0);

  // useEffect with empty array runs when components mount
  useEffect(() => {
    axiosClient.get("/feedback").then((res) => {
        setFeedback(res.data);
        setLoading(false);
      });
    axiosClient.get("/feedbackInfo").then((res) => {
      setFeedback(res.data);
    });
    axiosClient.get("/feedbackid").then((res) => {
      setFeedbackID(res.data);
    });
    axiosClient.get("/feedbackcustomerid").then((res) => {
      setCustomerID(res.data);
    });
  }, []);

  const deleteFeedback = (order) => {
    const arr = feedbackInfo.filter((item) => item !== order);
    setFeedback(arr);
    axiosClient.get("/feedbackInfo").then((res) => {
      setFeedback(res.data);
    });
  };

  return (
    <StyledExpandWrapper>
      <FeedbackAddDialog
        key={openAddDialog}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        Feedback_ID = {Feedback_ID}
        Customer_ID = {Customer_ID}
        Comment = {Comment}
        Rating = {Rating}>
        </FeedbackAddDialog>

        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Feedback</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
            <StyledGridItem item xs={12}>
                  <Stack
                    justifyContent='space-between'
                    direction='row'
                    alignItems='flex-start'>
                    <AddOrderGridItem item xs={12}>
                      <StyledAddButton onClick={() => setOpenAddDialog(true)}>
                        <AddCircle fontSize='inherit'></AddCircle>
                      </StyledAddButton>
                    </AddOrderGridItem>
                  </Stack>
                  <StyledGrid container justifyContent='center' alignItems='center'>
                {feedbackInfo.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    <FeedbackCard
                      info={item}
                      ></FeedbackCard>
                  </StyledGridItem>
                ))}
              </StyledGrid>
                </StyledGridItem>
            </StyledGridWrapper>
                </AccordionDetails>
        )}
    </StyledExpandWrapper>
  );
}

