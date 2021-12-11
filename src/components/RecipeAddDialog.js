import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axiosClient from "../utils/axiosClient";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Text, StyleSheet, View } from "react";
import styled from "styled-components";


export default function RecipeAddDialog(props) {
    //var ingredientList = []
    const[ingredientList] = React.useState([]);
    for (var i in props.ingredients){
      ingredientList[i] = false;
        //console.log("ingredient: " + props.ingredients[i].Ingredients);
    }

  var recipeID = props.recipeID[0];
  var ingredientID = props.ingredientID[0];

  const addRecipe = () => {
    var reqObjRecipe = {
        Recipe_ID: recipeID.c,
        Price: price,
        Name: recipeName
      };
  
      axiosClient.post("/recipe", reqObjRecipe).then((res) => {
        props.setOpenAddDialog(false);
      });

    //console.log("Recipe_ID: " + reqObjRecipe.Recipe_ID);
   //var counter = ingredientID.c;
    for (var i = 0; i < ingredientList.length; i++){
        if (ingredientList[i] == true){
          console.log("ingredient in recipe: " + props.ingredients[i].Ingredients);
          console.log("Recipe_Ingredient_ID: " + (ingredientID.c + 1));

          var reqObjIngredient= {
            //Recipe_Ingredient_ID: (counter),
            Recipe_Ingredient_ID: ingredientID.c + 1,
            Recipe_ID: recipeID.c,
            Ingredients: props.ingredients[i].Ingredients,
            Amount: 1
          };

          ingredientID.c++; 
          axiosClient.post("/ingredient", reqObjIngredient).then((res) => {
            console.log("hereeeee!");  
          });
        } else {
            console.log("no hehe");
        }
      }
      recipeID.c++; 
  };

  let CheckDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
`;

  const [isSelected, setSelection] = React.useState(false);
  const [recipeName, setRecipeName] = React.useState("");
  const [price, setPrice] = React.useState(0);

  return (
    <Dialog
      open={props.openAddDialog === undefined ? false : props.openAddDialog}>
      <DialogTitle>Add a Recipe</DialogTitle>
      <DialogContent>

      <DialogContentText>
          Please enter the recipe name:
        </DialogContentText>
      <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Recipe Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                />
        <DialogContentText>
          Please enter the recipe price:
        </DialogContentText>
        <TextField 
        type="number"
        InputProps={{
            inputProps: { 
                max: 100, min: 0
            }
        }}
        label="price"
        value={price}
        onChange={(e) => {
            var value = parseInt(e.target.value, 10);
            setPrice(value);
          }}
        />
        <DialogContentText>
          Please check the ingredients this recipe needs:
        </DialogContentText>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
          }}>
        </div>
        
        {props.ingredients.map((item, i) => {
            return (
                <CheckDiv>
                <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                onChange={(e) => {
                    //console.log("i changed " + i);
                    ingredientList[i] = !ingredientList[i]
                    console.log(ingredientList[i]);
                    for (var j = 0; j < ingredientList.length; j++){
                        //console.log("ingredient: " + props.ingredients[j].Ingredients + " state: " + ingredientList[j]);
                    }
                  }}
                >
                </Checkbox>
                <DialogContentText>{item.Ingredients}</DialogContentText>
              </CheckDiv>
            );
        })}
        </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenAddDialog(false)}>Cancel</Button>
        <Button onClick={addRecipe}>Add Recipe</Button>
      </DialogActions>
    </Dialog>
  );
}
