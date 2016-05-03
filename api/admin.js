var express = require('express');
var router = express.Router();


// 3    ADMIN CRUD
// 3.a  admin CREATE
//      IN {personaname,realname,avatar,price,capacity,admin_id}
//      OUT {error,mensaje} || {mensaje}
router.post('/admin', function(req, res){
  var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?)";
  var table = [
    "admin",
    "personaname",
    "realname",
    "avatar",
    "mail",
    "pass",
    "loccountrycode",
    "locstatecode",
    "loccityid",
    req.body.personaname,
    req.body.realname,
    req.body.avatar,
    req.body.mail,
    md5(req.body.pass),
    req.body.loccountrycode,
    req.body.locstatecode,
    req.body.loccityid
  ];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"error" : true, "mensaje" : err});
      } else {
          res.json({"mensaje" : "Administrador agregado con exito."});
      }
  });
});
// 3.b  admin READ
//      Devolvemos un admin indicado por su (id)
//      IN {admin.id}
//      OUT {league{league_id,steam_leagueid,name,avatar,description,capacity,price,admin_id}}
router.get('/admin/:admin_id', function(req, res){
  var query = "SELECT * FROM ?? WHERE ??=?";
  var table = [
    "admin",
    "id",
    req.params.admin_id
  ];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"error" : true, "mensaje" : "Error executing MySQL query"});
      } else {
          res.json({"admin" : rows});
      }
  });
});
//3.c admin UPDATE
// Actualizamos al admin con su (admin.id)
router.put('/admin/:admin_id', function(req, res){
  var query = "UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?  WHERE ??=?";
  var table = [
    "admin",
    "personaname",
    "realname",
    "avatar",
    "mail",
    "pass",
    "loccountrycode",
    "locstatecode",
    "loccityid",
    "id",
    req.body.personaname,
    req.body.realname,
    req.body.avatar,
    req.body.mail,
    md5(req.body.pass),
    req.body.loccountrycode,
    req.body.locstatecode,
    req.body.loccityid,
    req.params.admin_id
  ];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"error" : true, "mensaje" : "Error executing MySQL query"});
      } else {
          res.json({"mensaje" : "Admin "+req.params.admin_id+" actualizado."});
      }
  });
});
//3.d DELETE
// Eliminamos un admin por su (admin.id)
// ELIMINAMOS EL ROW COMPLETO
router.delete('/admin/:admin_id', function(req, res){
  var query = "DELETE FROM ?? WHERE ??=?";
  var table = [
    "admin",
    "id",
    req.params.admin_id
  ];
  query = mysql.format(query,table);
  connection.query(query,function(err,rows){
      if(err) {
          res.json({"error" : true, "mensaje" : "Error executing MySQL query"});
      } else {
          res.json({"mensaje" : "Admin "+req.params.admin_id+" eliminado"});
      }
  });
});

module.exports = router;
