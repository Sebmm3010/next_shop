import Head from "next/head"
import { FC, ReactNode } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  children: ReactNode;
  title: string;
  pageDesc: string;
  imageUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDesc, imageUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:name" content={title} />
        <meta name="description" content={pageDesc} />
        <meta name="og:description" content={pageDesc} />
        {
          imageUrl &&(
            <meta name="og:image" content={ imageUrl } />
          )
        }
      </Head>

      <nav>
        <Navbar/>
      </nav>

      {/* Sidebar */}

      <SideMenu/>

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0 30px'
      }}>
        {children}
      </main>

      <footer>
        {/* Todo: */}
      </footer>
    </>
  )
}
