'use strict';

module.exports = function(Categoria) {
  console.log('carregou o mixin para o model', Categoria.modelName);

	Categoria.validatesLengthOf('categoria', {min: 5, message: {min: 'nome é muito curto' + Categoria.modelName}});

	Categoria.beforeRemote('**', function(ctx, model, next) {
      console.log('beforeRemote', model.name);
      next();
    });

	Categoria.afterRemote('**', function(ctx, model, next) {
      console.log('afterRemote', model.name);
      next();
    });


	Categoria.beforeRemote('*.__create__events', function(ctx, modelInstance, next) {
    	console.log('Before creating events');
    	next();
  	});    


	var create = Categoria.sharedClass.findMethodByName('create');
	create.description = 'Altero a descrição do método';


  Categoria.observe('before save', function before_save(ctx, next) {
    console.log('before save', Categoria.modelName);
    // console.log('before save ctx', ctx);
  next();
  });

 Categoria.observe('after save', function after_save(ctx, next) {
    console.log('after save', Categoria.modelName);
    // console.log('after save ctx', ctx);
  next();
  });

	
// Categoria.remoteMethod(  
//   'publish',
//   {
//     http: {path: '/:id/publish', verb: 'put'},
//     accepts: {arg: 'id', type: 'string', required: true, http: { source: 'path' }},
//     returns: {root: true, type: 'object'},
//     description: 'Marks a blog as published.'
//   }
// );    
};
