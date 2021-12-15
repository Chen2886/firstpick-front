import React, { useEffect } from "react";
import InventoryCard from "./InventoryCard";
import axiosClient from "../utils/axiosClient";
import InventoryAddDialog from "./InventoryAddDialog";

import {
  Grid,
  Stack,
  IconButton,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { AddCircle, Inventory } from "@mui/icons-material";
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
  margin-top: 2rem;
`;

export default function Inv() {
  const [loading, setLoading] = React.useState(true);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [amountLeft, setAmountLeft] = React.useState(0);
  const [ingredient, setIngredient] = React.useState(0);
  const [inventory, setInventory] = React.useState(0);


  // useEffect with empty array runs when components mount
  useEffect(() => {
    axiosClient.get("/inventory").then((res) => {
        setIngredient(res.data);
        setLoading(false);
      });
    axiosClient.get("/invIngredients").then((res) => {
        setIngredient(res.data);
    });
  }, []);

  return (
    <StyledExpandWrapper>
      <InventoryAddDialog
        key={openAddDialog}
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        ingredient={ingredient}
        >
        </InventoryAddDialog>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Inventory</Typography>
        </AccordionSummary>
        {!loading && (
          <AccordionDetails>
            <StyledGridWrapper>
            <Stack
                    justifyContent='space-between'
                    direction='row'
                    alignItems='flex-start'>
                    <AddOrderGridItem item xs={12}>
                      <StyledAddButton onClick={() => setOpenAddDialog(true)}>
                        <AddCircle fontSize='inherit'></AddCircle>
                      </StyledAddButton>
                    </AddOrderGridItem>
                  </Stack>
              <StyledGrid container justifyContent='center' alignItems='center'>
                {ingredient.map((item, i) => (
                  <StyledGridItem item xs={4} key={i}>
                    <InventoryCard
                      info={item}
                      ></InventoryCard>
                  </StyledGridItem>
                ))}
              </StyledGrid>
            </StyledGridWrapper>
                </AccordionDetails>
        )}
    </StyledExpandWrapper>
  );
}

