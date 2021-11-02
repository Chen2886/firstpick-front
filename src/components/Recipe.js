import React, { useEffect } from "react";
import RecipeCard from "./RecipeCard";
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
    axiosClient.get("/recipe").then((res) => {
        setRecipe(res.data);
        setLoading(false);
      });
  }, []);

  /*const handleExpand = (index) => {
    let arr = expand.slice();
    arr[index] = !arr[index];
    setExpand(arr);
  };

  const moveOrder = (order) => {
    if (order.Completed === 1) {
      order.Completed = 0;
      setCurrentOrder([...currentOrder, order]);
      const arr = completedOrder.filter((item) => item !== order);
      setCompletedOrder(arr);
    } else {
      order.Completed = 1;
      setCompletedOrder([...completedOrder, order]);
      const arr = currentOrder.filter((item) => item !== order);
      setCurrentOrder(arr);
    }
  };

  const deleteOrder = (order) => {
    if (order.Completed === 1) {
      const arr = completedOrder.filter((item) => item !== order);
      setCompletedOrder(arr);
    } else {
      const arr = currentOrder.filter((item) => item !== order);
      setCurrentOrder(arr);
    }
  };*/


  return (
    <StyledExpandWrapper>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Recipes</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {recipe.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    <RecipeCard
                      info={item}
                      ></RecipeCard>
                  </StyledGridItem>
                ))}
                {/*<AddOrderGridItem item xs={12}>
                  <StyledAddButton>
                    <AddCircle fontSize='inherit'></AddCircle>
                  </StyledAddButton>
                </AddOrderGridItem>*/}
              </StyledGrid>
            </StyledGridWrapper>
                </AccordionDetails>
        )}
        {/*{loading && <CircularProgress></CircularProgress>}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Completed Order</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {recipe.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    <OrderCard
                      info={item}
                     ></OrderCard>
                  </StyledGridItem>
                ))}
              </StyledGrid>
            </StyledGridWrapper>
                </AccordionDetails>
        )}
                {loading && <CircularProgress></CircularProgress>}*/}
    </StyledExpandWrapper>
  );
}

