import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import axiosClient from "../utils/axiosClient";
import {
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import { AddCircle } from "@mui/icons-material";
import OrderAddDialog from "./OrderAddDialog";

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

const StyledGridWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const StyledAddButton = styled(IconButton)`
  font-size: 50px;
`;

const StyledExpandWrapper = styled.div`
  margin: 5rem;
  margin-top: 2rem;
`;

const PaddedGrid = styled(Grid)`
  padding: 1rem;
`;

export default function Order() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [ordersInfo, setOrdersInfo] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  // useEffect with empty array runs when components mount
  useEffect(() => {
    // use axiosClient created to get all orders
    axiosClient.get("/orders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
    axiosClient.get("/ordersInfo").then((res) => {
      setOrdersInfo(res.data);
    });
    axiosClient.get("/recipe").then((res) => {
      setRecipes(res.data);
    });
    axiosClient.get("/customers").then((res) => {
      setCustomers(res.data);
    });
  }, []);

  const moveOrder = (order) => {
    var newOrders = [...orders];
    var newOrder = order;
    newOrder.Completed = order.Completed === 1 ? 0 : 1;
    newOrders[orders.indexOf(order)] = newOrder;
    setOrders(newOrders);
  };

  const deleteOrder = (order) => {
    const arr = orders.filter((item) => item !== order);
    setOrders(arr);
    axiosClient.get("/ordersInfo").then((res) => {
      setOrdersInfo(res.data);
    });
  };

  const addOrder = () => {
    axiosClient.get("/orders").then((res) => {
      setOrders(res.data);
    });
    axiosClient.get("/ordersInfo").then((res) => {
      setOrdersInfo(res.data);
    });
  };

  return (
    <StyledExpandWrapper>
      <OrderAddDialog
        key={openAddDialog}
        recipes={recipes}
        customers={customers}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        addOrder={addOrder}></OrderAddDialog>
      <Grid container>
        <PaddedGrid item xs={9}>
          {!loading && (
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                <StyledGridItem xs={12}>
                  <Typography variant='h4'>In Progress</Typography>
                </StyledGridItem>
                {orders
                  .filter((item) => item.Completed === 0)
                  .map((item, i) => {
                    return (
                      <StyledGridItem
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        key={i + item.Completed}>
                        <OrderCard
                          info={item}
                          moveOrder={moveOrder}
                          deleteOrder={deleteOrder}></OrderCard>
                      </StyledGridItem>
                    );
                  })}
                <AddOrderGridItem item xs={12}>
                  <StyledAddButton onClick={() => setOpenAddDialog(true)}>
                    <AddCircle fontSize='inherit'></AddCircle>
                  </StyledAddButton>
                </AddOrderGridItem>
              </StyledGrid>
            </StyledGridWrapper>
          )}
          {loading && <CircularProgress></CircularProgress>}
        </PaddedGrid>
        <PaddedGrid item xs={3}>
          <StyledGridWrapper>
            <div style={{ padding: "1rem" }}>
              <Typography variant='h4'>Leaderboard</Typography>
            </div>
            {ordersInfo.map((item) => (
              <div>
                <Card>
                  <CardHeader
                    title={item.name}
                    titleTypographyProps={{ variant: "h6" }}
                    style={{ paddingBottom: "0" }}></CardHeader>
                  <CardContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Stack>
                        <Typography variant='caption'>
                          Number of Orders
                        </Typography>
                        <Typography variant='body1'>
                          {item.num_orders}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant='caption'>Money Spent</Typography>
                        <Typography
                          variant='body1'
                          style={{ textAlign: "end" }}>
                          ${item.spent}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Divider></Divider>
              </div>
            ))}
          </StyledGridWrapper>
        </PaddedGrid>
        <PaddedGrid item xs={12}>
          {!loading && (
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                <StyledGridItem xs={12}>
                  <Typography variant='h4'>Completed</Typography>
                </StyledGridItem>
                {orders
                  .filter((item) => item.Completed === 1)
                  .map((item, i) => {
                    return (
                      <StyledGridItem
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={i + item.Completed}>
                        <OrderCard
                          info={item}
                          moveOrder={moveOrder}
                          deleteOrder={deleteOrder}></OrderCard>
                      </StyledGridItem>
                    );
                  })}
              </StyledGrid>
            </StyledGridWrapper>
          )}
          {loading && <CircularProgress></CircularProgress>}
        </PaddedGrid>
      </Grid>
    </StyledExpandWrapper>
  );
}
