# Server price-history

## Descripcion

Servidor REST hecho en node.js como backend para el proyecto price-history

## Dependencias 

- mongodb instalado y ejecutandose
- NodeJs
- NPM
- Editor al gusto del desarrollador

## Como levantar el proyecto

**Clone e instalar dependencias**
```
> git clone urlproyecto
> cd server-price-history
> npm install
```
**Arrancar el proyecto**
```
> npm start
```

## Rutas


### "/"

- **GET** Devuelve las rutas del proyecto.

### "/register/"

- **POST** Crea un usuario y registra un usuario
  - Datos necesarios: name, lastname, mail, password.

### "/login/"

- **POST** Crea un token para hacer las siguientes llamadas.

### "/users/"

- **GET** Devuelve el listado de Usuarios
- **GET** + **id** Devuelve un usario por su ID
- **PUT** + **id** Update de un usuario por ID
- **DELETE** + **id** Borra un Usuario

### "/producto/"

- **GET** Devuelve el listado de productos
- **GET** + **id** Devuelve un producto por su ID
- **POST** Crea un producto
- **PUT** + **id** Update de un producto por ID
- **DELETE** + **id** Borra un producto

Este servidor funciona con Price-History que podes visitar en: [www.gustavokoutian.com/proyectos/price-history/](https://www.gustavokoutian.com/proyectos/price-history/)
