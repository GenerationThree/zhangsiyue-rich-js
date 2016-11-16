var context = require.context('./source/test', true, /-spec\.js$/);
context.keys().forEach(context);
// console.log(context.keys());