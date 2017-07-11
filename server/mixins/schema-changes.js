// var LoopBackContext = require('loopback-context');

// console.log('entrou no mixin');
// function getSubdomain(ctx) {
//   var parts = ctx.req.headers.host.split('.');
//   if (parts.length === 3) {
//     return parts[0];
//   }
//   return null;
// }

// module.exports = function(model, debug) {
//   model.beforeRemote('**', function(ctx, unused, next) {
//     var schema = getSubdomain(ctx);
//     if (schema) {
//       LoopBackContext.getCurrentContext().set('schema', schema);
//     }
//     next();
//   });
// };