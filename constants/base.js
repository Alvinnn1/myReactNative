const formData = {
  checkInDate: '2018-10-19',
  checkOutDate: '2018-10-21',
  room:1,
  adult:2,
  child:0,
  childAge:[]
}
const filter = {
  breakfast: null,
  bedType: null,
  price: null,
  cancelable: false,
  discount: []
}
export default {
  formData: formData,
  filter: filter
}