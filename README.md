# busqueda_tesoro_server
Servidor para la app de la búsqueda del tesoro

## ENDPOINTS
- /login/web
	- Login from web
- /login/android/
 	- Register from android
- /login/android/google
	- Login with googleId (already registered users)
	- Return user and history info
- /historias
	- GET historias
- /historias/:id
	- GET historia
- /historias/:idHistoria/usuarios/:idUsuario
	- POST nueva historia
	- PUT nuevo punto conseguido
	- GET progreso en historia
-
