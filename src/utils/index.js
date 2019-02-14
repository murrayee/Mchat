export { NavigationActions, StackActions } from 'react-navigation';
export { default as Storage } from './storage';
export const delay = time => new Promise(resolve => setTimeout(resolve, time));
export const createAction = type => payload => ({ type, payload });
export const formatUserGroup = (users) => {
  return users && users.reduce((prev, current) => {
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
        data: [current],
      });
    }
    return prev;
  }, []).sort((a, b) => {
    if (a.key < 'A' || b.key < 'A') {
      return -1;
    }
    return 1;
  });

};
