import { Box, CircularProgress, Typography } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      gap={2}
    >
      <CircularProgress thickness={2} />
      <Typography>Cargando...</Typography>
    </Box>
  );
};
