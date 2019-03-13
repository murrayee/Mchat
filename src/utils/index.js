"use strict";

export { NavigationActions, StackActions } from "react-navigation";
import momentjs from "moment";
import momentLocale from "moment/locale/zh-cn";

export { default as Storage } from "./storage";

export const moment = momentjs;

moment.updateLocale("zh-cn", momentLocale);

export const delay = time => new Promise(resolve => setTimeout(resolve, time));
export const createAction = type => payload => ({ type, payload });

/**
 * 分组联系人
 * @param users
 * @returns
 */
export const formatUserGroup = users => {
  return users
    .reduce((prev, current) => {
      let index = -1;
      prev.some((user, i) => {
        if (user.data[0].firstLetter === current.firstLetter) {
          index = i;
          return true;
        }
      });
      if (index > -1) {
        prev[index].data.push(current);
      } else {
        prev.push({
          key: current.firstLetter,
          data: [current]
        });
      }
      return prev;
    }, [])
    .sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt());
};

/**
 * 格式化时间
 * @param date yyyy-MM-dd
 * @returns {*}
 */
export const formatDate = date => {
  const createAt = new Date(date);
  const time = new Date().getTime() - createAt.getTime();

  if (time / 86400000 < 31) {
    return moment(date).fromNow();
  }
  return moment(date).format("YYYY-MM-DD");
};
