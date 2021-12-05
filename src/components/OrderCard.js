import React from "react";
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

let DateDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  gap: 4px;
`;

let DividerWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export default function OrderCard(props) {
  let info = props.info;
  let fn = info.First_Name === null ? "" : info.First_Name;
  let ln = info.Last_Name === null ? "" : info.Last_Name;
  let d = new Date(info.Date);
  let date = moment(d).format("MM/DD/YYYY");
  let time = moment(d).format("hh:mm A");

  const completeOrder = (Order_ID) => {
    axiosClient
      .post("/complete", {
        Order_ID,
      })
      .then((res) => {
        props.moveOrder(info);
      });
  };

  const undoOrder = (Order_ID) => {
    axiosClient
      .post("/undo", {
        Order_ID,
      })
      .then((res) => {
        props.moveOrder(info);
      });
  };

  const deleteOrder = (Order_ID) => {
    axiosClient
      .delete("/orders", {
        data: { Order_ID: Order_ID },
      })
      .then((res) => {
        props.deleteOrder(info);
      });
  };

  return (
    <Card style={{ border: "1px solid grey" }}>
      <CardHeader title={info.Name} subheader={"$" + info.Price} />
      <Divider></Divider>
      <CardContent>
        <Grid container direction='row' justifyContent='center'>
          <Grid
            item
            xs={6}
            className='info-grid-item'
            style={{ borderRight: "1px solid grey" }}>
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
          <Grid
            item
            xs={6}
            className='info-grid-item'
            style={{ borderLeft: "1px solid grey" }}>
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
      </CardActions>
    </Card>
  );
}
