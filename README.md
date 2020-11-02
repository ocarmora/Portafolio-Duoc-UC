# FermeApp

Este proyecto fue generado por [Angular CLI](https://github.com/angular/angular-cli) version 9.1.2.

## Portafolio Duoc UC
Este proyecto corresponde al presentado en el portafolio de la carrera Analista Programador en Duoc UC, sede Maipú, año 2020.

## Sobre el proyecto
Desarrollamos una web app orientada como una solución a un caso ficticio para una ferreteria que necesitaba un software para llevar el control de: 

- Ventas
- Usuarios del sistema
- Trabajadores
- Clientes
- Proveedores
- Ordenes de compra
- Facturas y boletas
- Stock de productos
- Categorización de productos

La solución fue desarrollada con Angular en el frontend, NodeJs como backend (API RESTful) y TypeORM como ORM de la base de datos.

## Requisitos para la instalación
1. Tener instalado Angular CLI. Puedes ver las instrucciones [aquí](https://cli.angular.io/)
2. Tener instalado Node (y el administrador de paquetes NPM). Puedes ver las instrucciones [aquí](https://nodejs.org/en/download/)

## Instrucciones para instalación y uso

1. Clonar este repositorio en una ubicación local.
2. Correr el comando __*npm install*__ dentro de la ubicación raíz del proyecto para instalar los paquetes asociados a Angular, y luego repetir la acción dentro de la ubicación __*/backend/*__ para instalar los paquetes asociados al NodeJs y TypeOrm.
3. Crear una base de datos local y configurar los parámetros de conexión en el archivo __*/backend/ormconfig.json.example*__.
4. Renombrar el mismo archivo __*/backend/ormconfig.json.example*__ del punto 2 a __*/backend/ormconfig.json*__ (sin "example").
5. Dentro del archivo __*/backend/.env.example*__ debes asignar un valor a la variable **TOKEN_SECRET_KEY**, normalmente es un string de 256 bits. Puedes generar uno acá: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
6. Renombrar el archivo __*/backend/.env.example*__ a __*/backend/.env*__ (sin "example").
7. En la terminal correr el comando __*ng serve*__ dentro de la carpeta raíz del proyecto y, de manera paralela, correr el comando __*npm run dev*__ dentro de la ubicación __*/backend/*__
8. Abrir con un navegador la ubicación del servidor levantado por Angular, normalmente en __*http://localhost:4200/*__
9. Para ingresar al sistema, se creó un usuario administrador con los siguientes datos: 
- Nombre de usuario: admin
- Contraseña: secret
10. En caso de dudas, reclamos o comentarios escríbeme un mail a os.carvajalmora@gmail.com :) 


