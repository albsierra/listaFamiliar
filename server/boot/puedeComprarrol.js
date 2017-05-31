module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('comprador', function(role, context, cb) {
    var userId = context.accessToken.userId;
    app.models.Usuario.findById(userId, function(err, usuario) {
      if(err) return cb(err);
      if(!usuario) return cb(null, false);
      if (usuario.listaFamiliarId == context.remotingContext.instance.listaFamiliarId) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    });
  });
}