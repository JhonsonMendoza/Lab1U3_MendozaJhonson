# Implementación de Autenticación con Cuentas de Google usando Google Cloud

**CARRERA:** Tecnologías de la Información  
**ASIGNATURA:** Aplicaciones Distribuidas  
**NIVEL:** Séptimo  
**DOCENTE:** Ing. Paulo Galarza  
**ESTUDIANTE:** Jhonson Mendoza  
**TÍTULO DE LA PRÁCTICA:**  Implementación de Autenticación con Google OAuth2 y Chat en Tiempo Real Usando Socket.IO
---

## RESUMEN


En el presente laboratorio se desarrolló una aplicación web que permite implementar el inicio de sesión a través de cuentas de Google, utilizando para ello el servicio de autenticación OAuth 2.0 proporcionado por Google Cloud. Esta funcionalidad se logra mediante la configuración adecuada de las credenciales en Google Cloud Console, la integración del paquete `passport-google-oauth20` en un servidor backend utilizando Node.js y Express, así como el uso de `localStorage` para almacenar el token JWT en el cliente (frontend) puro HTML. Se configuró una ruta protegida para validar el acceso únicamente si el usuario ha sido autenticado exitosamente. Se puso especial énfasis en la lógica de sesión entre el navegador y el servidor, logrando que la autenticación se mantenga de forma segura y funcional. Durante el proceso, se abordaron problemáticas típicas de entornos locales, como la gestión de sesiones sin un framework como React y la necesidad de adaptar la ruta de retorno (`callbackURL`) para Live Server. Se concluye que la autenticación de terceros mejora la experiencia de usuario y fortalece la seguridad de acceso en aplicaciones web, siendo una práctica ampliamente adoptada en la industria tecnológica actual.

**Palabras Clave**: Autenticación, OAuth 2.0, Google Cloud

---

## INTRODUCCIÓN

En la actualidad, muchas aplicaciones web requieren mecanismos de autenticación seguros, eficientes y fáciles de usar para el usuario final. Uno de los enfoques más comunes es permitir el inicio de sesión mediante cuentas de terceros, como Google, Facebook, GitHub, entre otros. Este laboratorio se centra en el uso del servicio de autenticación de Google mediante OAuth 2.0, el cual permite al usuario iniciar sesión utilizando sus credenciales de Google sin necesidad de registrarse manualmente en la aplicación. Esta técnica no solo mejora la experiencia del usuario, sino que también reduce los riesgos asociados al almacenamiento de contraseñas. Para implementar esta funcionalidad, se recurrió a la API de autenticación de Google y al uso del paquete `passport` en el backend, con un enfoque orientado al manejo de sesiones y generación de tokens JWT. El desarrollo se realizó con tecnologías web estándar, HTML puro en el frontend y Node.js en el backend, lo que permitió comprender a fondo el flujo de autenticación sin la abstracción de frameworks modernos.

---

## OBJETIVOS

### Objetivo General:
Implementar un sistema de autenticación de usuarios en una aplicación web utilizando cuentas de Google mediante OAuth 2.0 configurado en Google Cloud Platform, usando tecnologías web básicas (HTML, Node.js, Express y Passport).

### Objetivos Específicos:
- Configurar correctamente el acceso OAuth 2.0 en Google Cloud Console para generar credenciales de autenticación.
- Integrar la estrategia `passport-google-oauth20` en un servidor Node.js para manejar el flujo de autenticación.
- Almacenar y gestionar el token JWT en el navegador mediante `localStorage`, validando sesiones desde el frontend.

---

## MARCO TEÓRICO

### Autenticación y Autorización
La autenticación es el proceso de verificar la identidad de un usuario. En sistemas web modernos, este proceso suele realizarse mediante el ingreso de credenciales como usuario y contraseña, o bien mediante la autenticación de terceros (OAuth). La autorización, por otro lado, consiste en verificar qué recursos puede o no utilizar ese usuario autenticado.

### OAuth 2.0
OAuth 2.0 es un protocolo de autorización que permite a las aplicaciones obtener acceso limitado a cuentas de usuario en un servicio HTTP. A través de este protocolo, el usuario puede conceder acceso a su información sin compartir sus credenciales. Es el estándar más común para autenticación en redes sociales y servicios en la nube.

### Google Cloud Console
Es la plataforma de administración de servicios de Google Cloud Platform. Permite crear proyectos, habilitar APIs, gestionar permisos, y configurar credenciales OAuth 2.0 para conectar aplicaciones externas con los servicios de Google.

### Passport.js
Passport es un middleware de autenticación para Node.js extremadamente flexible y modular. Permite autenticar usuarios usando diferentes estrategias, una de ellas es `passport-google-oauth20`, utilizada en esta práctica.

### JSON Web Token (JWT)
JWT es un estándar abierto (RFC 7519) que define un método compacto y seguro para transmitir información entre partes como un objeto JSON. En esta práctica, se utiliza para mantener sesiones autenticadas desde el frontend.

---

## DESCRIPCIÓN DEL PROCEDIMIENTO

1. **Configuración de Google Cloud Console**  
   - Se creó un nuevo proyecto.
   - Se habilitó la API de Google+ (Google People API).
   - Se configuró una pantalla de consentimiento para autenticación OAuth.
   - Se creó una credencial de tipo OAuth Client ID especificando el tipo de aplicación como “Aplicación Web”.
   - Se especificó el URI autorizado para redireccionamiento, en este caso:  
     `http://127.0.0.1:5500/frontend/auth/google/callback`  
     *(para compatibilidad con Live Server del frontend HTML puro).*

   ![Figura 1. Configuración de credenciales en Google Cloud](https://imgur.com/2JoSo2D.png)

2. **Configuración del Servidor Backend**
   - Se instaló Node.js y Express.
   - Se agregaron las dependencias `passport`, `passport-google-oauth20`, `express-session`, `dotenv`, entre otras.
   - Se implementó el archivo `passport.js` con la estrategia de Google OAuth 2.0, serialización y deserialización del usuario.

   ![Figura 2. Estrategia de autenticación con Passport](https://imgur.com/lfarLlG.png)

   - Se configuraron rutas en `authRoutes.js` para `/auth/google`, `/auth/google/callback` y `/protected`.

   ![Figura 3. Rutas de autenticación](https://imgur.com/gad0SRv.png)

3. **Frontend (HTML Puro)**
   - Se implementó un botón de login con redirección a `/auth/google`.
   - Una vez autenticado, se redirige al frontend donde se almacena el token JWT en `localStorage`.
   - Se muestra información del usuario si la sesión está activa.

   ![Figura 4. Código frontend HTML](https://imgur.com/xYOiApB.png)

   ![Figura 5. Vista login en ejecución](https://imgur.com/8qhGTSd.png)

---

## ANÁLISIS DE RESULTADOS

Durante la ejecución del laboratorio se logró establecer un flujo completo de autenticación OAuth 2.0 entre el cliente (HTML puro) y el servidor backend. Al acceder desde el navegador al botón "Iniciar sesión con Google", se redirige correctamente al flujo de autenticación proporcionado por Google, donde el usuario selecciona su cuenta y otorga permisos a la aplicación. Tras esto, Google redirecciona al backend en la ruta de callback especificada, donde Passport procesa el token y los datos del perfil del usuario. Estos datos se pueden visualizar en consola o utilizar para construir sesiones seguras.

Una vez completado el proceso, el servidor redirige al frontend, el cual almacena el token JWT en `localStorage`. Con este token, el frontend puede realizar peticiones autenticadas a rutas protegidas. El análisis mostró que, incluso sin usar React o frameworks, es totalmente viable mantener sesiones seguras en una SPA HTML simple, siempre que se maneje correctamente el flujo y la persistencia del token.

Además, se detectaron algunos desafíos comunes como la diferencia entre `localhost` y `127.0.0.1` (que afecta los dominios autorizados en Google), la necesidad de adaptar la estrategia OAuth a Live Server y cómo controlar sesiones sin cookies, solo con JWT en localStorage. La consola del navegador fue clave para depurar problemas de sesión y validación del token.

   ![Figura 6. Uso de Callback para la redirección exitosa](https://imgur.com/LKXyzhd.png)

La correcta obtención del perfil del usuario, el ID de Google y el correo electrónico confirman que el flujo OAuth fue implementado con éxito. El hecho de trabajar con HTML puro permitió entender con claridad cada paso del proceso, sin depender de librerías de abstracción como Axios, React Router o Redux.

---

## DISCUSIÓN

La implementación de este sistema de autenticación demostró que los mecanismos modernos de login no están restringidos al uso de frameworks avanzados. A través del uso de tecnologías básicas (HTML, Node.js y Express), se logró construir un sistema completamente funcional y seguro, lo que resalta la importancia de entender los fundamentos del protocolo OAuth 2.0.

Un aspecto clave fue la configuración en Google Cloud Console, que exigió comprender la estructura de credenciales, el flujo de redireccionamientos y los permisos solicitados. Igualmente, la estrategia de Passport exigió claridad sobre el ciclo de vida de una sesión: desde la autenticación, pasando por la serialización del usuario, hasta la generación de un token válido para el cliente.

   ![Figura 7. Ejecución de la autenticación de google](https://imgur.com/fmfI9PM.png)

   ![Figura 8. Acceso correcto y uso del chat](https://imgur.com/zTltjaB.png)


Es importante resaltar que si bien el uso de `localStorage` puede ser útil para almacenar el token JWT, también representa un vector de riesgo si no se toman medidas adicionales como expiración de token, validación desde backend o cifrado. La práctica sirvió para entender estos riesgos y plantear posibles soluciones futuras, como el uso de cookies seguras (`httpOnly`) o tokens de corta duración con refresh tokens.

También se evidenció cómo el uso de Live Server introduce peculiaridades en la autenticación debido a su uso de IP `127.0.0.1` en lugar de `localhost`, obligando a ajustar las configuraciones de retorno (`callbackURL`) y las URLs autorizadas en Google.

---

## CONCLUSIONES

1. La implementación del login con cuentas de Google usando OAuth 2.0 y Passport.js permite establecer un sistema de autenticación seguro, moderno y funcional sin necesidad de frameworks de frontend, demostrando que es posible gestionar sesiones e integrar terceros de forma manual y comprensible. Esta experiencia aporta un aprendizaje fundamental para entender el funcionamiento de la autenticación basada en tokens y sesiones.

2. La configuración adecuada de Google Cloud Console es un paso crítico y determinante en el éxito del sistema, ya que errores en los dominios autorizados, en la pantalla de consentimiento o en las credenciales, pueden impedir completamente la autenticación. Esta etapa exige precisión y conocimiento sobre cómo opera la plataforma de Google.

3. A través del laboratorio se logró no solo implementar una funcionalidad útil, sino también reforzar el conocimiento sobre sesiones, almacenamiento de tokens, seguridad del lado cliente, y flujo OAuth. Esto abre la puerta para implementar futuros sistemas más complejos, como login con múltiples proveedores, autorización por roles o integración con microservicios.

---

## RECOMENDACIONES

- Siempre validar el entorno de redireccionamiento (`localhost`, `127.0.0.1`) al usar Live Server y Google Cloud Console.
- Nunca almacenar el token JWT en localStorage en aplicaciones en producción sin las debidas medidas de seguridad.
- Explorar el uso de cookies seguras (`httpOnly`) para manejar tokens en vez de `localStorage`, mejorando la seguridad contra XSS.

---

## BIBLIOGRAFÍA

- Google Developers. (2023). *Using OAuth 2.0 for Web Server Applications*. https://developers.google.com/identity/protocols/oauth2  
- Passport.js. (2023). *Google OAuth 2.0 Strategy*. http://www.passportjs.org/packages/passport-google-oauth20/  
- JWT.io. (2023). *JSON Web Tokens Introduction*. https://jwt.io/introduction  
- Node.js Documentation. (2023). *Express.js Guide*. https://expressjs.com/  

---
#   L a b 1 U 3 _ M e n d o z a J h o n s o n 
 
 