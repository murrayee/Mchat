const Mock = require("mockjs");
const Random = Mock.Random;

function getUsers() {
  return Array.from(new Array(200)).map((_, i) => {
    const username = Random.first();
    return {
      _id: i,
      username: username,
      password: "123456",
      avatar: Random.image(
        "50*50",
        Random.color(),
        "#FFF",
        "png",
        username.substring(0, 1)
      ),
      vibration: true,
      onlineStatus: "offline",
      socketId: "",
      phone: "18500000000",
      firstLetter: username.substring(0, 1).toUpperCase(),
      __v: 0
    };
  });
}

module.exports = {
  "POST /api/users/login": (req, res) => {
    const { password, username } = req.body;
    if (password === "123456" && username === "admin") {
      res.status = 200;
      res.send({
        success: true,
        message: "登录成功",
        refreshTokenExpiresAt: "2019-03-25T07:33:47.630Z",
        refreshToken: "b88d8a29aa23fd88e42954b66f2b6015abbe35ca",
        accessToken: "9bae6a0e27938bb1c6951aa0935349d9ead58221",
        accessTokenExpiresAt: "2019-03-11T08:33:47.630Z",
        data: {
          avatar: Random.image("50*50", Random.color(), "#FFF", "png", "A"),
          firstLetter: "A",
          onlineStatus: "online",
          password: "123456",
          phone: "1850000000",
          socketId: "H0fqUgJ_SZ3oQtkqAAAC",
          vibration: true,
          _id: "5c7506e751aa106241fe8f52"
        }
      });
    } else {
      res.status(400).send("Bad Request");
      res.send({
        status: "error"
      });
    }
  },
  "POST /api/users/register": (req, res) => {
    res.send({ status: "ok" });
  },
  "GET /api/users": (req, res) => {
    const users = getUsers();
    res.send({ status: "ok", data: users });
  }
};
