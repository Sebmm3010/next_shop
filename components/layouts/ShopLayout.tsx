import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  children: ReactNode;
  title: string;
  pageDesc: string;
  imageUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDesc,
  imageUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Sebastian Madero" />
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={`${title}, tienda, ropa`} />
        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={pageDesc} />
        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="image" />
          </>
        )}
      </Head>

      <nav>
        <Navbar />
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
        {children}
      </main>

      <footer>{/* Todo: */}</footer>
    </>
  );
};
