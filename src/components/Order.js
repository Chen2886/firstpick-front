import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import axiosClient from "../utils/axiosClient";
import { Button, Grid, Icon, IconButton } from "@mui/material";
import styled from "styled-components";
import { AddCircle } from "@mui/icons-material";

export default function Order() {
  const [orders, setOrders] = React.useState([]);

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
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 3rem;
  `;

  const StyledAddButton = styled(IconButton)`
    font-size: 50px;
  `;

  // useEffect with empty array runs when components mount
  useEffect(() => {
    // use axiosClient created to get all orders
    axiosClient.get("/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <StyledGridWrapper>
      <StyledGrid container justifyContent='center' alignItems='center'>
        {orders.map((item) => (
          <StyledGridItem item xs={6} key={item.Order_ID}>
            <OrderCard info={item}></OrderCard>
          </StyledGridItem>
        ))}
        <AddOrderGridItem item xs={12}>
          <StyledAddButton>
            <AddCircle fontSize='inherit'></AddCircle>
          </StyledAddButton>
        </AddOrderGridItem>
      </StyledGrid>
    </StyledGridWrapper>
  );
}
