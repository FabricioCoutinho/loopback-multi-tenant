'use strict';

module.exports = function(Categoria) {
	Categoria.validatesLengthOf('nome', {min: 5, message: {min: 'nome é muito curto'}});

};
