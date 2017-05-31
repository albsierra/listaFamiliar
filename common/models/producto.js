'use strict';

module.exports = function(Producto) {
	Producto.observe("before save", function(ctx, next) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		if (ctx.isNewInstance) {
			Usuario.findById(ctx.options.accessToken.userId, function(err, usuario) {
				if (err) next(err);
				if (ctx.instance) {
					ctx.instance.listaFamiliarId = usuario.listaFamiliarId;
				}
				next();
			})
		} else {
			next();
		}
	});
	Producto.limpiarproducto = function(ctx, cb) {
		var app = require('../../server/server.js')
		var Usuario = app.models.Usuario;
		console.log(ctx.req.accessToken.userId);
		Usuario.findById(ctx.req.accessToken.userId, function(err, usuario) {
			if (err) next(err);
			Producto.updateAll({
				listaFamiliarId: usuario.listaFamiliarId
			}, {
				comprar: 0
			}, function(err, info) {
				if (err) cb(err);
				cb(null, info);
			});
		})

	};
	Producto.prototype.productocomprado = function(callback) {
		this.comprar= !this.comprar;
		var comprado=this.comprar;
		this.save(function(err, callback){
				if (err) callback(err);
			});
		callback(null, comprado);
	};
};