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
//import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecipeAddDialog from "./RecipeAddDialog";

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

  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [recipe, setRecipe] = React.useState({});
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [recipeID, setRecipeID] = React.useState(0);
  const [ingredientID, setIngredientID] = React.useState(0);

  // useEffect with empty array runs when components mount
  useEffect(() => {
    axiosClient.get("/recipe").then((res) => {
        setRecipe(res.data);
        setLoading(false);
      });
    axiosClient.get("/allIngredients").then((res) => {
        setIngredients(res.data);
      });
    axiosClient.get("/numRecipes").then((res) => {
        setRecipeID(res.data);
      });
    axiosClient.get("/numIngredients").then((res) => {
        setIngredientID(res.data);
      });
  },[]);


  

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

  const StyledAddButton = styled(IconButton)`
  font-size: 50px;
  padding: 0;
`;


  return (

    <StyledExpandWrapper>
          <RecipeAddDialog
        key={openAddDialog}
        //recipes={recipes}
        //customers={customers}
        ingredients={ingredients}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        recipeID = {recipeID}
        ingredientID = {ingredientID}
        //addOrder={addOrder}
        ></RecipeAddDialog>
        {/*<AccordionSummary expandIcon={<AddIcon /*onClick={() => deleteOrder(info.Order_ID)}></AddIcon>}>
          <Typography variant='h4'> Recipes</Typography>
        </AccordionSummary>*/}

<AccordionSummary expandIcon={
<StyledAddButton onClick={() => setOpenAddDialog(true)}>
  <AddCircle fontSize='inherit'></AddCircle>
  </StyledAddButton>}>
  <Typography variant='h4'> Recipes</Typography>
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

