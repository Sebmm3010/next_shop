import NextLink from "next/link";
import { AppBar, Badge, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link component={'span'} display='flex' alignItems='center'>
                        <Typography variant="h6" component="h6">Teslo |</Typography>
                        <Typography component="p" sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm:'block' } }}>
                    <NextLink href='/category/men' passHref>
                        <Link component={'span'}>
                            <Button>Hombre</Button>
                        </Link>
                    </NextLink>
                   
                    <NextLink href='/category/women' passHref>
                        <Link component={'span'}>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    
                    <NextLink href='/category/kids' passHref>
                        <Link component={'span'}>
                            <Button>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link component={'span'}>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink> 

                <Button>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}
