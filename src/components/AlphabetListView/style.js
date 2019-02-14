/**
 * Created by bear on 2017/6/28.
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  itemContent: {
    backgroundColor: 'white',
  },
  itemWrap: {
    height: 45,
    borderBottomWidth: .5,
    borderBottomColor: 'rgb(240,241,241)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  itemThumb: {
    width: 30,
    height: 30,
  },
  itemTitle: { paddingLeft: 8 },
  sectionWrap: {
    height: 30,
    backgroundColor: '#f1f1f1',
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 30,
    paddingLeft: 8,
  },
  footerWrap: {
    height: 80,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 80,
    color: '#343434',
  },
  letterContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    width: 20,
    height: height - 170,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  letterIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
  },
  letterWrap: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  letter: {
    width: 15,
    height: 15,
    textAlign: 'center',
    lineHeight: 15,
    fontSize: 10,
    color:'#333333',
  },

  searchInfo: {
    height: 46,
    flex: 1,
    backgroundColor: 'rgb(240,241,241)',
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    margin: 8,
    backgroundColor: 'white',
    // alignItems:'center'
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 3,
  },
  text: {
    textAlign: 'center',
    lineHeight: 30,
    color: 'rgb(189,189,189)',
    marginLeft: 8,
    fontSize: 14,
  },
  searchIcon: {
    lineHeight: 30,
    color: 'rgb(189,189,189)',
    marginTop: 3,

  },
  voiceIcon: {
    position: 'absolute',
    lineHeight: 30,
    color: 'rgb(189,189,189)',
    marginTop: 3,
    right: 0,
    marginRight: 10,
  },
});


