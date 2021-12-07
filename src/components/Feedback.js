import React, { useEffect } from "react";
import FeedbackCard from "./FeedbackCard";
import axiosClient from "../utils/axiosClient";
import {
  Grid,
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

export default function Order() {
  /*const [currentOrder, setCurrentOrder] = React.useState({});
  const [completedOrder, setCompletedOrder] = React.useState({});
  const [expand, setExpand] = React.useState([true, true]);*/
  const [loading, setLoading] = React.useState(true);

  const [recipe, setRecipe] = React.useState({});

  // useEffect with empty array runs when components mount
  useEffect(() => {
    axiosClient.get("/feedback").then((res) => {
        setRecipe(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <StyledExpandWrapper>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Feedback</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {recipe.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    <FeedbackCard
                      info={item}
                      ></FeedbackCard>
                  </StyledGridItem>
                ))}
              </StyledGrid>
            </StyledGridWrapper>
                </AccordionDetails>
        )}
    </StyledExpandWrapper>
  );
}

