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
`;

export default function Order() {
  const [orders, setOrders] = React.useState({});
  const [expand, setExpand] = React.useState([true, false]);
  const [loading, setLoading] = React.useState(true);

  // useEffect with empty array runs when components mount
  useEffect(() => {
    // use axiosClient created to get all orders
    axiosClient.get("/orders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  const handleExpand = (index) => {
    let arr = expand.slice();
    arr[index] = !arr[index];
    setExpand(arr);
  };

  return (
    <StyledExpandWrapper>
      <Accordion expanded={expand[0]} onChange={() => handleExpand(0)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Current Order</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {orders.Current.map((item) => (
                  <StyledGridItem item xs={4} key={item.Order_ID}>
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
                {orders.Completed.map((item) => (
                  <StyledGridItem item xs={4} key={item.Order_ID}>
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
          </AccordionDetails>
        )}
        {loading && <CircularProgress></CircularProgress>}
      </Accordion>
    </StyledExpandWrapper>
  );
}
