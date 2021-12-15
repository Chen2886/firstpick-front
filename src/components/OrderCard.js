import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axiosClient from "../utils/axiosClient";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { Divider, CardActions, IconButton, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import "../styles/Order.css";

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
    <Card style={{ border: "2px solid grey" }}>
      <CardHeader
        title={info.Name}
        subheader={"$" + info.Price}
        style={{
          backgroundColor: "black",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        }}
      />
      <CardContent>
        <Stack justifyContent='center'>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body1' color='text.secondary'>Customer</Typography>
            <Typography variant='body1'>
              {fn.length > 1 && ln.length > 1 && fn + " " + ln}
              {fn.length === 0 && ln.length === 0 && "Anonymous"}
            </Typography>
          </Stack>
          <Divider
            style={{ marginTop: "1rem", marginBottom: "1rem" }}></Divider>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body1' color='text.secondary'>Time</Typography>
            <Stack direction='row' gap={1}>
              <Typography variant='body1'>
                {date}
              </Typography>
              <Typography variant='body1'>
                {time}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing className='card-actions'>
        <IconButton onClick={() => props.editOrder(info)}>
          <EditIcon />
        </IconButton>
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
