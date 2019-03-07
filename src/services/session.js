export const fetchSessionList = async () => {
  let data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `开会啦，明天下午一点钟在天府大道会展中心一栋三楼11-1-23`,
    title: `欧洲印象居委会闲聊群${i}`,
    key: `aopfsdfm13dqwepomsd13ni${i}`,
    avatar: "http://127.0.0.1:9090/public/avatar/201809131715133574.png",
    firstLetter: "A",
    onlineStatus: "online",
    password: "123456",
    phone: "",
    socketId: "8iG6fXRgk4nlmd1FAAAH",
    username: "Admin",
    vibration: true,
    __v: 0,
    _id: "5b9a2aa1f91ab428f6801e46"
  }));
  return new Promise(function (resolve, reject) {
    resolve(data);
  });
};

export  default {
  fetchSessionList
}
