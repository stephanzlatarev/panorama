const compression = require('compression')
const express = require('express');
const app = express();

var port = process.env.PORT ? process.env.PORT : 80;

app.use(compression());
app.set('port', port);
app.listen(port, function() {
  console.log('Server starts on port ' + port)
});
app.get('*', (req, res) => {
  if (req.url === '/kill/' + process.env.COMPUTERNAME) {
    console.log('received kill command');
    process.exit(0);
  }

  var path = req.params['0'];
  if (path === '/') {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.sendFile(__dirname + path);
  }
})
