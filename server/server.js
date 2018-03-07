const http = require('http');
const port = 3000;
const domain = 'localhost';

const server = http.createServer((req, res) => {
  console.log('Oba! Tem request');
  res.end('a')
});

server.listen(port, domain, () => {
  console.log('Server listening at http:' + domain + ':' + port)
});

/*
* https://www.instagram.com/oauth/authorize/?client_id=46e2b209ccc7402a9454335da801a1e8&response_type=token&redirect_uri=http://localhost:3000&scope=public_content
* https://api.instagram.com/v1/tags/vivaoepico/media/recent?access_token=308174912.46e2b20.df862a405c364257a4524c81de900f0ac
* */