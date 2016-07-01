#d2eg
##Descripción

Esta es la documentación de nuestra aplicación web, queriamos otorgarles una herramienta para poder divulgar sus habilidades en este juego y que esto conlleve una motivación extra para profesionalisarse como jugadores de Dota 2. Esperamos que puedan monetizar sus experiencias y nosotros ser un camino para que ustedes lleguen a ello; que las excusas se acaben al momento de explicar los motivos de por qué no llevan esto a un nivel más alto.

##Documentación

###Vista

Utilizo el motor EJS para renderizar las paginas y mostrar la comunicacion con la API interna, Bootstrap como framework CSS, algunos recursos de internet para la apariencia y javascript para procesar comunicaciones con API's de terceros.

####Recursos

Todos los recursos utilizados son de código abierto o con permisos para ser utilizados, encontrados por los inframundos de Github y npm.

* Bootstrap
* Background animado ByPeople
* SimpleMDE

###Controlador

####Routes

Dependiendo de la ruta seleccionada a la API para luego renderizarlas en archivos EJS.

####API

Interfaz que se comunica con la base de datos, dependiendo del metodo HTTP y/o JSON responde un JSON.

#####Player

Endpoint	|Descripcion
GET /player |	Responde un JSON con todos los jugadores.
GET /player/:steamid |	Responde un JSON con los datos del jugador.
POST /player |	Registra un jugador.
PUT /player/:_id |	Edita la información de un jugador.
POST /player/twitch/:_id |	Añade una cuenta de Twitch al jugador.
DELETE /player/twitch/:_id |	Desvincula una cuenta de Twitch.

#####League

Endpoint |	Descripcion
GET /league/ |	Responde un JSON con todas las competencias.
GET /league/:steamid |	Responde un JSON con los datos de una competencia específica.
POST /league |	Registra una competencia.
PUT /league/:_id |	Edita la información de un jugador.
POST /league/battlefy/:_id |	Añade una id de Battlefy a la competicion.
DELETE /league/battlefy/:_id |	Borra id de Battlefy.

####Recursos

Todos los recursos utilizados son de código abierto o con permisos para ser utilizados, encontrados por los inframundos de Github y npm.

* passport-steam
* passport-twitch
* md5
* express
* request

###Modelo

####Recursos

* mongoose
