import * as React from "react";
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
import styled from "styled-components";

export default function RecipeEditDialog(props) {
    const[ingredientList] = React.useState([]);

    for (var i = 0; i < props.allIngredients.length; i++){
        ingredientList[i] = false;
    }
    for (var i = 0; i < props.allIngredients.length; i++){
        for (var j = 0; j < props.ingredients.length; j++){
            if (props.allIngredients[i].Ingredients == (props.ingredients[j].Ingredients)){
                ingredientList[i] = true;
                break;
            }
        }
        /*if ((props.ingredients).includes(props.allIngredients[i].Ingredients)){

            ingredientList[i] = true;
        } else {
            ingredientList[i] = false;
        }*/
       // console.log("ingredient: " + props.allIngredients[i].Ingredients + " " + ingredientList[i]);
    }

  const changeRecipe = () => {
    var reqObj = {
        Recipe_ID: props.recipeID,
        Price: price,
        Name: recipeName
      };
  
      axiosClient.put("/recipe", reqObj).then((res) => {
        props.setOpenEditDialog(false);
      });

    /*for (var i = 0; i < ingredientList.length; i++){
        if (ingredientList[i] == true){
          
          var reqObjIngredient= {
            Recipe_Ingredient_ID: ingredientID.c + 1,
            Recipe_ID: recipeID.c,
            Ingredients: props.ingredients[i].Ingredients,
            Amount: 1
          };

          ingredientID.c++; 
          axiosClient.post("/ingredient", reqObjIngredient).then((res) => {
          });
        } else {
        }
      }
      recipeID.c++; */
  };

  let CheckDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
`;

  const [isSelected, setSelection] = React.useState(false);
  const [recipeName, setRecipeName] = React.useState(props.recipeName);
  const [price, setPrice] = React.useState(props.recipePrice);

  return (
    <Dialog
      open={props.openEditDialog === undefined ? false : props.openEditDialog}>
      <DialogTitle>Edit Recipe</DialogTitle>
      <DialogContent>

      <DialogContentText>
          Recipe name:
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
          Recipe price:
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
        
        {props.allIngredients.map((item, i) => {
            if (ingredientList[i] == false) {
            return (
                <CheckDiv>
                <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                onChange={(e) => {
                    //console.log("i changed " + i);
                    ingredientList[i] = !ingredientList[i]
                    //console.log(ingredientList[i]);
                    //for (var j = 0; j < ingredientList.length; j++){
                        //console.log("ingredient: " + props.ingredients[j].Ingredients + " state: " + ingredientList[j]);
                    //}
                  }}
                >
                </Checkbox>
                <DialogContentText>{item.Ingredients}</DialogContentText>
              </CheckDiv>
            );
                } else {
                    //console.log("ingredientttt");
                    return (
                        <CheckDiv>
                        <Checkbox
                        value={isSelected}
                        checked={true}
                        onValueChange={setSelection}
                        onChange={(e) => {
                            //console.log("i changed " + i);
                            ingredientList[i] = !ingredientList[i]
                            //console.log(ingredientList[i]);
                            //for (var j = 0; j < ingredientList.length; j++){
                                //console.log("ingredient: " + props.ingredients[j].Ingredients + " state: " + ingredientList[j]);
                            //}
                          }}
                        >
                        </Checkbox>
                        <DialogContentText>{item.Ingredients}</DialogContentText>
                      </CheckDiv>
                    );  
                }
        })}
        </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenEditDialog(false)}>Cancel</Button>
        <Button onClick={changeRecipe}>Change Recipe</Button>
      </DialogActions>
    </Dialog>
  );
}
