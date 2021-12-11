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
import { Divider, Grid, CardActions, IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import "../styles/Order.css";
import styledGridItem from "./Recipe";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import RecipeEditDialog from "./RecipeEditDialog";


let DividerWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledGridItem = styled(Grid)`
  padding: 1rem;
`;

const StyledExpandWrapper = styled.div`
`;

function ErrorDialog(props) {
  //const [showDialog, setShowDialog] = React.useState(false);
  //const open = () => setShowDialog(true);
  //const close = () => setShowDialog(false);

  return (
    <Dialog open={props.showDialog}>
    <DialogContent> We cannot remove this item from the menu because somebody has currently ordered it. 
    <DialogActions>
    <Button onClick={() => props.setShowDialog(false)}>Cancel</Button>
    </DialogActions>
    </DialogContent> 
    </Dialog>
  );
}

export default function RecipeCard(props) {
    let info = props.info;
    let name = info.Name === null ? "" : info.Name;
    let price = info.Price === null ? "" : info.Price;
    let Recipe_ID = info.Recipe_ID === null ? "" : info.Recipe_ID;
    //console.log(name);
    //console.log("RECIPE ID: " + Recipe_ID);
    const [ingredients, setIngredients] = React.useState([]);
    const [allIngredients, setAllIngredients] = React.useState([]);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    //const close = () => setShowDialog(false);
    useEffect(() => {
        // use axiosClient created to get all ingredient lists
        axiosClient.get("/ingredient", {params: {Recipe_ID}},)
            .then((res) => {
            setIngredients(res.data);
            });
        axiosClient.get("/allIngredients").then((res) => {
          setAllIngredients(res.data);
        });
      }, []);


      const deleteRecipe = async (Recipe_ID) => {
        //console.log("finna delete");
        //console.log("recipe id: " + Recipe_ID);
        var deleted = true;

       await axiosClient
        .delete("/recipe",{data: {Recipe_ID: Recipe_ID }})
        .then((res) => {
          //console.log("yuhhh");
        })
        .catch((err) => {
            deleted = false;
            //console.log("DELETED inside query: " + deleted);
            //console.log("hoopla");
            setShowDialog(true);
            return (
              <div>
                <Dialog open={showDialog}>
                <DialogContent> We cannot remove this item from the menu because somebody has currently ordered it. 
                  <DialogActions>
                <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                </DialogActions>
                </DialogContent> 
                </Dialog>
              </div>
            );
        });

      

        if (deleted == true){
        axiosClient
          .delete("/ingredient",{data: {Recipe_ID: Recipe_ID }})
          .then((res) => {
          });
        }

      };

    return (
      <StyledExpandWrapper>

<RecipeEditDialog
        key={openEditDialog}
        //recipes={recipes}
        //customers={customers}
        allIngredients={allIngredients}
        ingredients={ingredients}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        recipeID = {info.Recipe_ID}
        recipeName = {name}
        recipePrice = {price}
        //ingredientID = {ingredientID}
        //addOrder={addOrder}
        ></RecipeEditDialog>
        
      <ErrorDialog
      key={showDialog}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      //addOrder={addOrder}
      ></ErrorDialog>



        <Card>
          <CardHeader title={name} subheader={"$" + price} />
          {ingredients.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    {item.Ingredients}
                  </StyledGridItem>
          ))}
          
          <CardActions disableSpacing className='card-actions'>
          <IconButton onClick={() => deleteRecipe(info.Recipe_ID)}>
            <DeleteIcon />
          </IconButton>
          {(
            <IconButton onClick={() => setOpenEditDialog(true)}>
              <EditIcon />
          </IconButton>
          )}
        </CardActions>
        </Card>
        </StyledExpandWrapper>
      )};
