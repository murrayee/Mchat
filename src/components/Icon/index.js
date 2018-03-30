import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createIconSet } from 'react-native-vector-icons';
import React, { Component } from 'react';
import iconFont,{map} from './custom/iconfont';

Object.keys(map).forEach((v)=>{map[v]=parseInt(map[v])})
const iconfont = createIconSet(map, 'iconfont', 'iconfont.ttf');

const iconMap = {
  fontAwesome: FontAwesome,
  iconfont: iconfont
};

class Icon extends Component {
  render() {
    const { name, size, color } = this.props;
    if (!name.includes('|')) {
      throw new Error('name 解析错误！');
      return null;
    }
    let nameArr = name.split('|');
    let fontlib = nameArr[0];
    let font = nameArr[1];
    let CustomIcon = iconMap[fontlib];
    if (!CustomIcon) throw new Error('没有找到匹配的font库，请review代码！');
    return <CustomIcon name={font} size={size} color={color} />;
  }
}
export { Icon ,iconFont};
