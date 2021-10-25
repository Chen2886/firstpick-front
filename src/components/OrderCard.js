import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function OrderCard(props) {
  let info = props.info;
  let fn = info.First_Name.charAt(0);
  let ln = info.Last_Name === undefined ? "" : info.Last_Name.charAt(0);
  let date = moment(info.Date).format("MM/DD/YYYY hh:mm:ss A");

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label='recipe'>{fn + ln}</Avatar>}
        title={info.Name}
        subheader={date}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {info.Name}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
