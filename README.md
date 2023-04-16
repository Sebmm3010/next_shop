# Next-Shop README

<br/>
<p align="center">
  <h3 align="center">Next-shop</h3>

  <p align="center">
    <a href="https://nextshop-production.up.railway.app/">Ver demo del proyecto</a>
    .
  </p>
</p>

## Sobre este proyecto

![Screen Shot](https://res.cloudinary.com/sebastianow/image/upload/v1681661406/nextShop/hc70h72tfebhuqeg9zio.png)

Este es un ecommerce complemente funcional, que permite el inicio de session, lógica de carrito de compras, almacenar Informacion del usuario en cookies para hacer más fácil el envío, como el pago de las ordenes mediante PayPal.<br/>
Incluye base de datos, donde se almacenan los productos, los usuarios y las ordene hechas, y el manejo de todos estos mediante un panel de administracion protegido por rutas privadas.

## Construido con.

<b>Front-end</b>:
* Nextjs.

<b>Back-end</b>:
* Función de apis de Nextjs.
* MongoDB para la base de datos.
* Docker para un container de la base de datos


## Getting Started
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__



## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27018/teslodb
```
* Reconstruir los modulos de node y levantar next:
```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```

# Autor

* **Sebastian** - *Fullstack developer* - [Sebastian](https://github.com/Sebmm3010)