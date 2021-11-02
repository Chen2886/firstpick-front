import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axiosClient from "../utils/axiosClient";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import styled from "styled-components";
import { Divider, Grid, CardActions, IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import "../styles/Order.css";
import styledGridItem from "./Recipe";

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

export default function RecipeCard(props) {
    let info = props.info;
    let name = info.Name === null ? "" : info.Name;
    let price = info.Price === null ? "" : info.Price;
    let Recipe_ID = info.Recipe_ID === null ? "" : info.Recipe_ID;
    //console.log(name);
    //console.log("RECIPE ID: " + Recipe_ID);
    const [ingredients, setIngredients] = React.useState([]);
    useEffect(() => {
        // use axiosClient created to get all ingredient lists
        axiosClient.get("/ingredient", {params: {Recipe_ID}},)
            .then((res) => {
            setIngredients(res.data);
            //console.log(res.data);
            });
      }, []);



    return (
        <Card>
          <CardHeader title={name} subheader={"$" + price} />
          {ingredients.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    {item.Ingredients}
                  </StyledGridItem>
          ))}
          {/*<Divider></Divider>
          <CardContent>
            <Grid container direction='row' justifyContent='center'>
              <Grid item xs={5} className='info-grid-item'>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  style={{ textAlign: "center" }}>
                  Customer
                </Typography>
                <Typography variant='h6' style={{ textAlign: "center" }}>
                  {fn.length > 1 && ln.length > 1 && fn + " " + ln}
                  {fn.length === 0 && ln.length === 0 && "Anonymous"}
                </Typography>
              </Grid>
              <DividerWrapper item xs={2}>
                <Divider orientation='vertical'></Divider>
              </DividerWrapper>
              <Grid item xs={5} className='info-grid-item'>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  style={{ textAlign: "center" }}>
                  Time
                </Typography>
                <DateDiv>
                  <Typography variant='h6'>{date}</Typography>
                  <Typography variant='h6'>{time}</Typography>
                </DateDiv>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing className='card-actions'>
            <IconButton onClick={() => deleteOrder(info.Order_ID)}>
              <DeleteIcon />
            </IconButton>
            {info.Completed === 0 && (
              <IconButton onClick={() => completeOrder(info.Order_ID)}>
                <CheckIcon />
            </IconButton>
            )}
            {info.Completed === 1 && (
              <IconButton onClick={() => undoOrder(info.Order_ID)}>
                <UndoIcon />
            </IconButton>
            )}
          </CardActions>*/}
        </Card>
      );
}