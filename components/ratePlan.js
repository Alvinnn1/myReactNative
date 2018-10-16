import React from 'react';
import baseConstans from './../constants/base'
import rateplanGroup from './../components/rateplan-group'
import { getRatePlan } from "./services/api";

export default class RatePlan extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      agodaItem: [],
      ctripItem: [],
      igolaItem: [],
      agodaGroupItem: [],
      ctripGroupItem: [],
      igolaGroupItem: [],
      agodaItemGroupLimit: 2,
      ctripItemGroupLimit: 5,
      igolaItemGroupLimit: 5,
    }
  }
  componentDidMount() {
    this.getHotelRatePlan()
  }
  render() {
    return (
      <View>
        {
          this.state.agodaItem.length > 0 ?
            <View>
              <Image source={require('./../images/agoda-logo-v2.png')}/>
              {
                this.state.agodaItem.forEach((item, index) => {
                  index < this.state.agodaItemGroupLimit ?
                    <View>
                      <RateplanGroup item={this.adaptAgodaGroup(item)}></RateplanGroup>
                      <RateplanCell item={item}></RateplanCell>
                    </View>
                    : null
                })
              }
            </View>
            : null
        }
      </View>
    )
  }
  getHotelRatePlan() {
    const req = {
      newVersion: true,
      hotelId: 404601,
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
        this.setState({
          igolaGroupItem: res.data.roomsGroup
        })
        this.separateRateplan(res.data.rooms)
      }

    })
  }
  adaptAgodaGroup(item) {
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
    let tempList = []
    let otherItem = {}
    let agodaItem = []
    let ctripItem = {}
    for (let key in obj) {
      if (key === 'agoda') {
        agodaItem = obj['agoda']
      } else if (key === 'ctrip') {
        ctripItem = obj['ctrip']
      } else {
        const newItem = {
          name: key,
          list: obj[key],
          currentIndex: 0,
          lowestPrice: obj[key][0].totalAmount
        }
        if (key === '其他') otherItem = newItem
        for (let i = 0; i < this.igolaItem.length; i++) {
          if (newItem.name === this.igolaItem[i].name) {
            newItem.currentIndex = this.igolaItem[i].currentIndex
            break
          }
        }
        tempList.push(newItem)
      }
    }
    this.adaptAgodaData(agodaItem)
    this.adaptCtripData(ctripItem)

    // adapt igola
    if (tempList.length === 0) {
      this.igolaItem = []
    } else {
      // tempList = this.quickSort(tempList, 'lowestPrice')
      tempList = tempList.filter((item) => item.name !== '其他')
      if (otherItem.name) tempList.push(otherItem)
      this.setState({
        igolaItem: igolaItem
      })
    }
  }
  adaptAgodaData(arr) {
    if (arr.length === 0) {
      this.agodaItem = []
    } else {
      const agodaItem = []
      arr.forEach(item => {
        const tempItem = {
          name: item.rateName,
          code: item.rateCode,
          list: [item],
          currentIndex: 0,
          lowestPrice: arr[0].totalAmount
        }
        for (let i = 0; i < this.agodaItem.length; i++) {
          if (tempItem.code === this.agodaItem[i].code) {
            tempItem.currentIndex = this.agodaItem[i].currentIndex
            break
          }
        }
        agodaItem.push(tempItem)
      })
      this.setState({
        agodaItem: agodaItem
      })
    }
  }
  // expect to be a Object
  adaptCtripData(obj) {
    if (!obj.roomsGroup) {
      this.ctripItem = []
    } else {
      this.ctripRoomGroup = obj.roomsGroup
      const ctripItem = []
      for (let key in obj.rooms) {
        const newItem = {
          name: key,
          list: obj.rooms[key],
          currentIndex: 0,
          lowestPrice: obj.rooms[key][0].totalAmount
        }
        for (let i = 0; i < this.ctripItem.length; i++) {
          if (newItem.name === this.ctripItem[i].name) {
            newItem.currentIndex = this.ctripItem[i].currentIndex
            break
          }
        }
        ctripItem.push(newItem)
      }
      this.setState({
        ctripItem: ctripItem
      })
      // this.ctripItem = this.quickSort(ctripItem, 'lowestPrice')
    }
  }
}