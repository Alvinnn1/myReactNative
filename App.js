/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import px2dp from './tools/px2dp'
import {
  ScrollView,
  Platform,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import { getHotelDetail } from "./services/api";



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hotelDetail: {},
      imageList: []
    }
  }
  getHotelDetailData() {
    getHotelDetail(404601, res => {
      console.log(res)
      if (res.code !== 200) return
      const tempList = []
      res.data.images.forEach((item, index) => {
        tempList.push({src : encodeURI(item.url)})
      })
      this.setState({
        hotelDetail: res.data,
        imageList: tempList
      })

    })
  }
  render() {

    return (
      <ScrollView style={{flex:1}}>
        {this.state.imageList.length > 0
          ?
          <View style={styles.imgBox}>
            <Image source={{uri:this.state.imageList[0].src}} style={{height:px2dp(340),flex:1}}/>
            <View style={styles.rowBox}>
              <Image source={{uri:this.state.imageList[1].src}} style={{height:px2dp(160),flex:1,marginRight:px2dp(5)}}/>
              <Image source={{uri:this.state.imageList[2].src}} style={{height:px2dp(160),flex:1,marginRight:px2dp(5)}}/>
              <Image source={{uri:this.state.imageList[3].src}} style={{height:px2dp(160),flex:1}}/>
              <View style={styles.totalBox}>
                <Text>共{this.state.imageList.length}张</Text>
              </View>
            </View>
          </View>
          :
          <Text>No Data</Text>
        }
        <View>
          {this.state.hotelDetail.hotelID
            ?
            <View style={{flex:1,flexDirection:'row'}}>
              <View stye={{width: px2dp(550)}}>
                <Text style={styles.titleName} selectable={true}>{this.state.hotelDetail.nameChn || this.state.hotelDetail.nameEng}</Text>
                <Text style={styles.titleNameEn}>{this.state.hotelDetail.nameEng}</Text>
                {/*<Text style={styles.titleNameEn} numberOfLines={1} ellipsizeMode='tail'>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</Text>*/}
              </View>
              <View stye={{width: px2dp(200)}}></View>
            </View>
            :
            <Text></Text>

          }
        </View>
        <View style={styles.ratePlanBox}>

        </View>

      </ScrollView>
    );

  }
  componentDidMount(){
    this.getHotelDetailData()
   }
}

const styles = StyleSheet.create({
  imgBox: {
    flex:1
  },
  rowBox: {
    flexDirection: 'row',
    marginTop: px2dp(5)
  },
  totalBox: {
    width:px2dp(100),
    height:px2dp(50),
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    position: 'absolute',
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right:0,
    bottom:0
  },
  titleName: {
    fontFamily: "PingFang SC",
    fontWeight: 'bold',
    fontSize: px2dp(40),
    lineHeight: px2dp(50),
    color: '#464646',
    marginBottom:px2dp(10)
  },
  titleNameEn: {
    fontFamily: "PingFangSC-Light",
    fontSize: px2dp(26),
    lineHeight: px2dp(36),
    color: '#464646',
    marginBottom:px2dp(10)
  },
  titleAddr: {

  }
});
