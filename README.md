## Documentación
  
###Vista
Utilizo el motor EJS para renderizar las paginas y mostrar la comunicacion con la API interna, Bootstrap como framework CSS, algunos recursos de internet para la apariencia y javascript para procesar comunicaciones con API's de terceros.
  
####Recursos
Todos los recursos utilizados son de código abierto o con permisos para ser utilizados, encontrados por los inframundos de Github y npm.
  
  * [Bootstrap](http://getbootstrap.com/)
  * Background animado [ByPeople](http://www.bypeople.com/animated-background-based/)
 @@ -22,11 +25,16 @@ se acaben al momento de explicar los motivos de por qué no llevan esto a un niv
  
  
####Routes
-Realiza HTTP request's a la API para luego renderizarlas en archivos EJS.
+Dependiendo de la ruta seleccionada a la API para luego renderizarlas en archivos EJS.
+
+/player
+* /account : panel de control para añadir o editar información del jugador
+* /
+
  
####API
-Interfaz que se comunica la base de datos, recibe peticiones HTTP y responde JSON.
- 
+Interfaz que se comunica con la base de datos, dependiendo del metodo HTTP y/o JSON responde un JSON.
+
#####Player
|Endpoint | Descripcion|
|----|----|
@@ -49,8 +57,8 @@ Interfaz que se comunica la base de datos, recibe peticiones HTTP y responde JSO


####Recursos
Todos los recursos utilizados son de código abierto o con permisos para ser utilizados, encontrados por los inframundos de Github y npm.
 
* [passport-steam](https://github.com/liamcurry/passport-steam)
* [passport-twitch](https://github.com/Schmoopiie/passport-twitch)
