import { Mock } from "react-native-fetch-mock";

export default {
  "/api/users/mockjs": ({ params }) => {
    const all = Mock.mock({
      "list|1-10": [
        {
          "id|+1": 1,
          name: "@first @last",
          "age|18-54": 1
        }
      ]
    }).list;
    let filtered;
    if ("undefined" !== typeof params) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }
    return {
      status: 200,
      data: filtered
    };
  }
};
