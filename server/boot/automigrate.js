'use strict';

const fs = require('fs');
const path = require('path');
const PATH_MODEL = './common/models/';
const dsOptions = require('../datasources.json');

module.exports = function(app) {
	/*
		TODO
		- Obter a lista de schema do banco
		- Validar se o arquivo existe de model existe
		- Criar outros models com relations
	*/
	let tenants = ['public', 'guararema' ];

	tenants.forEach(function(tenant) {
		// Obtenho as configurações padrao de conexão
		let dbConf = dsOptions.dsApplication;

		// Altero o nome para a conexao do tenant
		dbConf.name = tenant;

		// Crio um nava conexao com o nome tenant
		// console.log('migration', 'Criando a conexão para o tenant: ' + dbConf.name);
		let ds = app.loopback.createDataSource(dbConf.name, dbConf);

		// Adiciono a conexão para a lista de datasource para ficar visível 
		// no restante da aplicação
		app.dataSources[dbConf.name] = ds;

		// console.log('migration', 'Criando os models para o tenant: ' + dbConf.name);
		// Obtenho todos os arquivos do tipo json da pasta model
		fs.readdirSync(PATH_MODEL).forEach(file => {
			if(path.extname(file) === ".json") {
       			// Obtenho a configuração do Model
       			let data = fs.readFileSync(PATH_MODEL + file, 'utf8');
       			let configModel = JSON.parse(data);

       			// Altero o model de acordo para não haver model com mesmo nome
       			configModel.name = configModel.name + '_' + tenant;
       			configModel.options.postgresql.schema = tenant;

       			// Altero as relations para o model criado
				if (configModel.hasOwnProperty('relations')) {
					let changeRelationModel = configModel.relations;
				    for (var i in changeRelationModel) {
				      if (changeRelationModel.hasOwnProperty(i) ) {
				        for (var j in changeRelationModel[i] ) {
				          if (changeRelationModel[i].hasOwnProperty(j) && (j == 'model') ) {
				            changeRelationModel[i][j] = changeRelationModel[i][j] + '_' + tenant;
				          }
				        }
				      }
					}  
				}       			

				// Crio e inicializo o model ao datasource e a lista de model da aplicação
				let customModel = app.loopback.createModel(configModel);
				customModel.setup();
				app.model(customModel);
				customModel.attachTo(app.dataSources[dbConf.name]);

   			}
		}); // fim da leitura dos arquivos


	});

	// rodo o migration para cada tenant
	tenants.forEach(function(tenant) {
		// console.log('migration', 'Rodando o migration para o tenant: ' + tenant);

		app.dataSources[tenant].automigrate( function(err) {
		   	if (err) throw err;
			// console.log('Migração efetuado como sucesso para o tenant: ' + tenant );
		});

	});
	
	
};
