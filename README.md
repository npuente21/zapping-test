# Prueba técnica Zapping

Este proyecto fue realizado utilizando React + Redux + Ant Design para el Frontend, mientras que se utilizo ExpressJs para el servicio de Usuarios y Go-Gin para el servicio de Streaming.

Antes de cualquier cosa, es necesario dejar los segmentos de video `.ts` dentro de la carpeta `/golang-back/videos/`.

Una vez copiados los segmentos, ejecute el comando:

```
docker-compose up -d --build
```

La web app se encuentra en `http://localhost:3000`. Esta web app tiene 3 vistas:
1) `/`: Vista principal (y protegida) en donde se encuentra el reproductor de streaming.
2) `login`:  vista con el formulario para iniciar sesión.
3) `/sign-up`: vista con el formulario para crearse una cuenta.

La vista protegida redirecciona al `login` en caso de no tener credenciales, por lo que como recomendación el flujo sería:
1) Crearse una cuenta en `sign-up`
2) Inciar sesión en el `login`
3) Disfrutar el Stream

Una vez se termina el stream, este se reinicia al cabo de un rato, por lo que solo necesitaría refrescar la página ante cualquier problema.

De igual forma el servicio de ususarios se encuentra el `http://localhost:8080` y se dejó un endpoint para revisar todos los usuarios registrados `http://localhost:8080/user`.

Por otro lado, el servicio de streaming se encuentra el `http://localhost:8081`.

Si planea correr este proyecto por su cuenta tenga en consideración que el manejo de la sesión se realizó utilizando cookies, por lo que `http://127.0.0.1:3000` no será capaz de leer la cookie. Además, algunos navegadores como Safari suelen necesitar configuración para poder setear cookies.
