// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-mixins
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

function getSubdomain(ctx) {
  var parts = ctx.req.headers.host.split('.');
  if (parts.length === 3) {
    return parts[0];
  }
  return null;
}

module.exports = function(model, debug) {
  model.beforeRemote('**', function(ctx, unused, next) {
    console.log('entrou na funcao');
    var schema = getSubdomain(ctx);

    if (schema) {
      console.log('beforeRemote.schema', schema);
    }
    next();
  });
};