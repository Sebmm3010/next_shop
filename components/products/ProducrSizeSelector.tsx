import { ISize } from "@/interfaces";
import { FC } from "react";
import { Box, Button } from "@mui/material";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}

export const ProducrSizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box display="flex" gap={1}>
      {sizes.map((size) => (
        <Button
          key={size}
          size="medium"
          color={selectedSize === size ? "primary" : "info"}
          onClick={()=>onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
