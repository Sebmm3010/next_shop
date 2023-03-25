import { FC, useEffect, useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  quantity: number;
  maxValue: number;
  onQuantityChange: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({
  quantity,
  maxValue,
  onQuantityChange,
}) => {
  const moreOrLess=(value:number)=>{
    if(value===-1){
      if(quantity===1) return;
      return onQuantityChange(quantity-1)
    }
    if(quantity>=maxValue) return;
    onQuantityChange(quantity+1)
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={()=>moreOrLess(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{quantity}</Typography>
      <IconButton onClick={()=>moreOrLess(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
