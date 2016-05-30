# d2eg

Esta es la documentación de nuestra aplicación web, queriamos otorgarles una herramienta para poder
divulgar sus habilidades en este juego y que esto conlleve una motivación extra para profesionalisarse como jugadores de Dota 2.
Esperamos que puedan monetizar sus experiencias y nosotros ser un camino para que ustedes lleguen a ello; que las excusas
se acaben al momento de explicar los motivos de por qué no llevan esto a un nivel más alto.



## Documentación APID2EG

###Player

|Endpoint | Descripcion|
|----|----|
|GET /player/:steamid | Responde un JSON con los datos del jugador.| 
|POST /player/:_id | Edita la información de un jugador.| 
|POST /player/twitch/:_id | Añade una cuenta de Twitch al jugador.|
|DELETE /player/twitch/:_id | Desvincula una cuenta de Twitch.|
