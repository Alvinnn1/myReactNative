import React from 'react';
import px2dp from './tools/px2dp'
import Iconfont from "./iconfont";


export default class RatePlan extends React.Component{
  constructor(){
    super()
  }
  render(){
    return {
    <View style={{flexDirection:'row'}}>
      <View>
        <Image source={this.props.item.image} style={{width:px2dp(200),width:px2dp(200)}}></Image>
      </View>
      <View>

      </View>
    </View>
  }
  }
}