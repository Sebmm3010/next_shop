import { FC } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export interface PropsSummary {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}
export const AdminSummary: FC<PropsSummary> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: "flex", boxShadow: "#fff" }}>
        <CardContent
          sx={{
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {/* <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} /> */}
          {icon}
        </CardContent>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
