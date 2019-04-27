const http = require('http');
import app from './backend/app';

const port = process.env.PORT || 8000;

app.set('port', port);

const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
