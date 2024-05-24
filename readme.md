# 🚀 API REST para IoT y Ciberseguridad

Este proyecto forma parte del curso **"Internet de las Cosas (IoT), Ciberseguridad y Aplicaciones. Curso 2023-2024"**. Se trata de una API REST desarrollada con **Express** y almacenamiento de datos en **MongoDB**. Además, incluye un broker **MQTT** utilizando la librería **Aedes**.

## 📜 Descripción

El propósito de esta API REST es proporcionar una interfaz para gestionar dispositivos IoT. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre dispositivos y autenticar usuarios. La API utiliza MongoDB para almacenar los datos y Aedes como broker MQTT para la comunicación de mensajes entre dispositivos.

## 🛠 Requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## ⚙️ Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu_usuario/api_rest_iot.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd api_rest_iot
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Asegúrate de tener MongoDB ejecutándose en `mongodb://127.0.0.1:27017/demoAPIREST`.

## 🚀 Uso

Para iniciar el servidor, ejecuta:

```bash
npm start
```
La API estará disponible en [http://localhost:3000](http://localhost:3000).

## 📡 Endpoints

### 🔑 Autenticación
- **POST /auth/login**: Autentica un usuario.

### 📱 Dispositivos
- **GET /devices**: Verifica que la API REST está funcionando.
- **POST /devices**: Crea un nuevo dispositivo.
- **GET /devices/:type**: Obtiene los datos de un dispositivo por su tipo (requiere autenticación).
- **PUT /devices/:type**: Actualiza los datos de un dispositivo por su tipo.
- **DELETE /devices/:type**: Borra un dispositivo por su tipo.
- **POST /devices/find**: Lista dispositivos por su tipo.


## 📦 Dependencias

- `aedes`: ^0.51.0
- `cohere-ai`: ^7.10.1
- `cors`: ^2.8.5
- `express`: ^4.18.2
- `express-mongo-sanitize`: ^2.2.0
- `jwt-simple`: ^0.5.6
- `moment`: ^2.30.1
- `mongoose`: ^8.1.0
- `websocket-stream`: ^5.5.2

## 🤝 Contribuciones

Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y crea una pull request con tus cambios.


## 📜 Licencia

Este proyecto está bajo una licencia de libre uso. Siéntete libre de usar, modificar y distribuir este código según tus necesidades.


## 👤 Autor

Jose Aveleira

