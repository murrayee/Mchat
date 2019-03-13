const Mock = require("mockjs");
const avatars = require("./image");
const Random = Mock.Random;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getUsers() {
  let username = "";
  Array.from(new Array(getRandomIntInclusive(5, 10))).forEach(() => {
    username += Random.character("lower");
  });
  return username;
}

function getMessages() {
  return Array.from(new Array(30)).map((_, id) => {
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    return {
      id: `message${id}`,
      username: Random.name(),
      message: Random.sentence(3, 20),
      count: Mock.mock({
        "number|0-100": 20
      }),
      avatar: avatar,

      date: Random.date("yyyy-MM-dd")
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
          username: "admin",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
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
    const users = Array.from(new Array(200)).map((_, i) => {
      const username = getUsers();
      const avatar = avatars[Math.floor(Math.random() * avatars.length)];
      return {
        avatar: avatar,
        firstLetter: username.substr(0, 1).toUpperCase(),
        onlineStatus: "online",
        password: "123456",
        username: username,
        phone: "1850000000",
        socketId: "H0fqUgJ_SZ3oQtkqAAAC",
        vibration: true,
        _id: i
      };
    });

    res.send({ status: "ok", data: users });
  },
  "GET /api/messages": (req, res) => {
    res.status(200).send({
      data: getMessages()
    });
  }
};
