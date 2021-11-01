import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import axiosClient from "../utils/axiosClient";
import {
  Grid,
  IconButton,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { AddCircle } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const StyledGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 3rem;
`;

const StyledAddButton = styled(IconButton)`
  font-size: 50px;
`;

const StyledExpandWrapper = styled.div`
  margin: 5rem;
  margin-top: 2rem;
`;

export default function Order() {
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [completedOrder, setCompletedOrder] = React.useState({});
  const [expand, setExpand] = React.useState([true, true]);
  const [loading, setLoading] = React.useState(true);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  // useEffect with empty array runs when components mount
  useEffect(() => {
    // use axiosClient created to get all orders
    axiosClient.get("/orders").then((res) => {
      setCurrentOrder(res.data.Current);
      setCompletedOrder(res.data.Completed);
      setLoading(false);
    });
  }, []);

  const handleExpand = (index) => {
    let arr = expand.slice();
    arr[index] = !arr[index];
    setExpand(arr);
  };

  const moveOrder = (order) => {
    if (order.Completed === 1) {
      order.Completed = 0;
      setCurrentOrder([...currentOrder, order]);
      const arr = completedOrder.filter((item) => item !== order);
      setCompletedOrder(arr);
    } else {
      order.Completed = 1;
      setCompletedOrder([...completedOrder, order]);
      const arr = currentOrder.filter((item) => item !== order);
      setCurrentOrder(arr);
    }
  };

  const deleteOrder = (order) => {
    if (order.Completed === 1) {
      const arr = completedOrder.filter((item) => item !== order);
      setCompletedOrder(arr);
    } else {
      const arr = currentOrder.filter((item) => item !== order);
      setCurrentOrder(arr);
    }
  };

  return (
    <StyledExpandWrapper>
      <OrderAddDialog
        key={openAddDialog}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}></OrderAddDialog>
      <Accordion expanded={expand[0]} onChange={() => handleExpand(0)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Current Order</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {currentOrder.map((item, i) => (
                  <StyledGridItem item sm={6} md={4} key={i}>
                    <OrderCard
                      info={item}
                      moveOrder={moveOrder}
                      deleteOrder={deleteOrder}></OrderCard>
                  </StyledGridItem>
                ))}
                <AddOrderGridItem item xs={12}>
                  <StyledAddButton onClick={() => setOpenAddDialog(true)}>
                    <AddCircle fontSize='inherit'></AddCircle>
                  </StyledAddButton>
                </AddOrderGridItem>
              </StyledGrid>
            </StyledGridWrapper>
          </AccordionDetails>
        )}
        {loading && <CircularProgress></CircularProgress>}
      </Accordion>
      <Accordion expanded={expand[1]} onChange={() => handleExpand(1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Completed Order</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {completedOrder.map((item, i) => (
                  <StyledGridItem item sm={6} md={4} key={i}>
                    <OrderCard
                      info={item}
                      moveOrder={moveOrder}
                      deleteOrder={deleteOrder}></OrderCard>
                  </StyledGridItem>
                ))}
              </StyledGrid>
            </StyledGridWrapper>
          </AccordionDetails>
        )}
        {loading && <CircularProgress></CircularProgress>}
      </Accordion>
    </StyledExpandWrapper>
  );
}
