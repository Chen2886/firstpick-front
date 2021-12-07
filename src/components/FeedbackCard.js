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

export default function FeedbackCard(props) {
    let info = props.info;
    let name = info.Name === null ? "" : info.Name;
    let rating = info.Rating === null ? "" : info.Rating;
    let Feedback_ID = info.Feedback_ID === null ? "" : info.Feedback_ID;
    let comment = info.Comment === null ? "" : info.Comment;

    const [ingredients, setIngredients] = React.useState([]);
    useEffect(() => {
        // use axiosClient created to get all ingredient lists
        axiosClient.get("/feedback", {params: {Feedback_ID}},)
            .then((res) => {
            setIngredients(res.data);
            //console.log(res.data);
            });
      }, []);


    return (
        <Card>
          <CardHeader title={'Feedback_ID: ' + Feedback_ID} subheader={'Rating: ' + rating} />
          {//ingredients.map((item, i) => (
                  <StyledGridItem>
                    {comment}
                  </StyledGridItem>
          //))
          }

        </Card>
      );
}