require('http').get({
  host: '127.0.0.1',
  port: process.env.PORT ? process.env.PORT : 80,
  path: '/kill/' + process.env.COMPUTERNAME
}).on('error', function(error) {
  console.log(error.code);
})
