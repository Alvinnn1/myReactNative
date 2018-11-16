import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import baseConstans from './../constants/base'
import rateplanGroup from './../components/rateplan-group'
import { getRatePlan } from "./../services/api";
import px2dp from './../tools/px2dp'
import { isNotEmptyObject, quickSort } from "../tools/tools";

export default class RatePlan extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      agodaItem: [],
      ctripItem: [],
      igolaItem: [],
      groupLimit: {
        agoda: 2,
        igola: 2,
        ctrip: 2
      },
      supplierLogoPath: {
        agoda: require('./../images/agoda-logo-v2.png'),
        igola: require('./../images/igola-logo-v2.png'),
        ctrip: require('./../images/ctrip-logo-v2.png'),
      },
      agodaGroupItem: [],
      ctripGroupItem: [],
      igolaGroupItem: [],
      agodaItemGroupLimit: 2,
      ctripItemGroupLimit: 5,
      igolaItemGroupLimit: 5,
      ratePlanList: []
    }
  }
  componentDidMount() {
    this.getHotelRatePlan()
  }
  render() {
    return (
      <View>
        <Text>rate</Text>
        {
          this.state.ratePlanList.map((rateItem, rateIndex) => {
           return (
             <View>
               <Image source={this.state.supplierLogoPath[rateItem.otaType]} style={{height:px2dp(160),flex:1,marginRight:px2dp(5)}}></Image>
               <Text>hello world</Text>
             </View>
           )
          })
        }

      </View>
    )
  }
  getHotelRatePlan() {
    const req = {
      newVersion: true,
      hotelId: 247820,
      checkInDate: baseConstans.formData.checkInDate,
      checkOutDate: baseConstans.formData.checkOutDate,
      adult: baseConstans.formData.adult,
      children: baseConstans.formData.child,
      childrenAge: baseConstans.formData.childAge ? baseConstans.formData.childAge.join(',') : '',
      roomCount: baseConstans.formData.room,
      extraOtaCodes: ['agoda', 'ctrip-domestic'],
      lan: 'ZH',
      filter: baseConstans.filter
    }
    getRatePlan(req, res => {
      if(res.code !== 200) {
        console.log('server error')
      } else if (res.data.rooms === null){
        console.log('rooms sold out')
      } else {
        this.separateRateplan(res.data.rateplans)
      }

    })
  }
  adaptGroupData(item) {
    const res = {
      roomName : item.rateName,
      nightlyRate: item.nightlyRate,
      rowNightlyRate: item.rowNightlyRate,
      maxOccupancy: item.maxOccupancy,
      bedType: item.bedType,
      roomInfo: item.roomInfo
    }
    return res
  }
  separateRateplan(obj) {
    let arr = []
    arr.push(
      this.adaptRateplanSource('agoda', obj.agoda, 2),
      this.adaptRateplanSource('ctrip', obj.ctrip, 2),
      this.adaptRateplanSource('igola', obj.igola, 2))
    this.setState({
      ratePlanList: arr
    })
    console.log(this.state.ratePlanList)
  }
  adaptRateplanSource(otaType, obj, groupLimit) {
    let totalList = []
    if(isNotEmptyObject(obj.rooms)) {
      let mainList = [], otherItem = [], soldOutItem = [], lastItem = []
      for(let key in obj.rooms) {
        const newItem = {
          name: key,
          list: obj.rooms[key],
          currentIndex: 0,
          lowestPrice: obj.rooms[key][0].totalAmount
        }
        const otaItem = `${otaType}Item`
        for (let i = 0; i < this.state[otaItem].length; i++) {
          if (newItem.name === this.state[otaItem][i].name) {
            newItem.currentIndex = this.state[otaItem][i].currentIndex
            break
          }
        }
        if (obj.groups[key].soldOut) {
          if (obj.groups[key].nightlyRate !== 0) {
            soldOutItem.push(newItem)
          } else {
            newItem.currentIndex = 0
            lastItem.push(newItem)
          }
        } else {
          if (key === '其他') {
            otherItem.push(newItem)
          } else {
            mainList.push(newItem)
          }
        }
      }
      mainList = quickSort(mainList, 'lowestPrice')
      if (soldOutItem.length !== 0) soldOutItem = quickSort(soldOutItem, 'lowestPrice')
      totalList = mainList.concat(otherItem, soldOutItem, lastItem)
      this[otaType + 'Item'] = totalList
    }
    return totalList.length > 0 ? { otaType: otaType, groups: obj.groups, rooms: totalList, groupLimit: groupLimit } : null
  }
}