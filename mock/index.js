const express = require("express");
const matchMock = require("./matchMock");

const app = express();

app.use(matchMock);

const server = app.listen(9090, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("murray app listening at http://%s:%s", host, port);
});
