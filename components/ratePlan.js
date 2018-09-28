import React from 'react';
import baseConstans from './../constants/base'
import { getRatePlan } from "./services/api";

export default class RatePlan extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.getHotelRatePlan()
  },
  render() {
    return (
      <View></View>
    )
  },
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

      }

    })
  }
}