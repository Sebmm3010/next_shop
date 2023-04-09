import { FC, ReactNode } from "react";
import { SideMenu } from "../ui";
import { AdminNavbar } from "../admin";
import Head from "next/head";
import { Box, Typography } from "@mui/material";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subtitle, icon }) => {
  return (
    <>
      <Head>
        <title>Admin dashboard</title>
      </Head>
      <nav>
        <AdminNavbar />
      </nav>

      {/* Sidebar */}

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0 30px",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}{" "}
            {title}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
