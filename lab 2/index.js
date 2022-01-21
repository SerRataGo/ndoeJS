const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      hostname = '127.0.0.1',
      port = 5000,
      getFile = (path) =>{
        try {
          return fs.readFileSync(path);
        } catch (error) {
          return null;
        }
      };

const server = http.createServer((req, res) => {
  const [, folder,file]=req.url.split('/');

  if (folder ==="") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(getFile('./html/text.html'));
  } else if (folder ==="css") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    const go = res.end(getFile(path.join(__dirname,"css",file)));
    if (go) return res.end(go);
    console.log("error");
    res.statusCode = 404;
    res.end("")
  }else if(folder==="image"){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'img/jpg');
    console.log(file);
    const gone = res.end(getFile(path.join(__dirname,"image",file)));
    if (gone) return res.end(gone);
    res.statusCode = 404;
    res.end("")
  }else{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Wrong direction</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
