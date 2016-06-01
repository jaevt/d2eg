# d2eg
##Descripción
Esta es la documentación de nuestra aplicación web, queriamos otorgarles una herramienta para poder
divulgar sus habilidades en este juego y que esto conlleve una motivación extra para profesionalisarse como jugadores de Dota 2.
Esperamos que puedan monetizar sus experiencias y nosotros ser un camino para que ustedes lleguen a ello; que las excusas
se acaben al momento de explicar los motivos de por qué no llevan esto a un nivel más alto.



## Documentación

###Vista

####Recursos

* [Bootstrap](http://getbootstrap.com/)
* Background animado [ByPeople](http://www.bypeople.com/animated-background-based/)
* [SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor)

###Controlador



####Routes
Realiza HTTP request's a la API para luego renderizarlas en archivos EJS.

####API
Interfaz que se comunica la base de datos, recibe peticiones HTTP y responde JSON.
 
#####Player
|Endpoint | Descripcion|
|----|----|
|GET /player | Responde un JSON con todos los jugadores.| 
|GET /player/:steamid | Responde un JSON con los datos del jugador.| 
|POST /player | Registra un jugador.| 
|PUT /player/:_id | Edita la información de un jugador.| 
|POST /player/twitch/:_id | Añade una cuenta de Twitch al jugador.|
|DELETE /player/twitch/:_id | Desvincula una cuenta de Twitch.|

#####League
|Endpoint | Descripcion|
|----|----|
|GET /league/ | Responde un JSON con todas las competencias.| 
|GET /league/:steamid | Responde un JSON con los datos de una competencia específica.|
|POST /league | Registra una competencia.| 
|PUT /league/:_id | Edita la información de un jugador.| 
|POST /league/battlefy/:_id | Añade una id de Battlefy a la competicion.|
|DELETE /league/battlefy/:_id | Borra id de Battlefy.|


####Recursos
Todos los recursos utilizados son de código abierto o con permisos para ser utilizaros, encontrados por los inframundos de
 Github y npmjs.

* [passport-steam](https://github.com/liamcurry/passport-steam)
* [passport-twitch](https://github.com/Schmoopiie/passport-twitch)
* [md5](https://github.com/pvorb/node-md5)
* [express](https://www.npmjs.com/package/express)
* [request](https://www.npmjs.com/package/request)

###Modelo

####Recursos

* [mongoose](https://www.npmjs.com/package/mongoose)
