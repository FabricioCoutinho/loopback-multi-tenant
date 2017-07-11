'use strict';

// var bodyParser = require('body-parser');

module.exports = function(app) {
	// app.use(bodyParser.urlencoded({ extended: true }));
	var router = app.loopback.Router();


	// router.post('/api/Categoria', function(req, res) {
	// 	console.log('entrou no categoria post');
	// 	res.send('schema is post');

	// });

	router.post('/api/Categoria/:schema', function(req, res) {

		// console.log('req', req.body);
		var tenant = req.params.schema;
	

	
		app.models.Categoria.settings.postgresql.schema = tenant;
		// console.log(app.loopback.findModel('Categoria_' + tenant));
		// console.log('schema', app.models.Categoria.settings.postgresql.schema);
		var msg = '';
		app.models.Categoria.create
			([req.body], 
			function(err, obj) {
				if (err) {
					msg = err;
				} else {
					msg = obj;
				}
					// console.log('err', err);

					console.log('obj', obj);
		});

		// console.log('customCategoria', customCategoria);

		// customCategoria.create([{nome : 'tenant'}], 
		// 	function(err, obj) {
		// 			console.log('err', err);
		// 			console.log('obj', obj);



		// }); 
		res.send(msg);

	});

	app.use(router);

}