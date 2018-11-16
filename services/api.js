const apiUrl = 'http://sitgateway.igola.com'

export function getHotelDetail(hotelId, callback) {
    const url = `${apiUrl}/api-hotel/detail?hotelId=${hotelId}`
    const option = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url, option)
      .then(res => res.json())
      .then(res => {callback(res)})
      .catch(err => {
        console.log(err)
      })
}

export function getRatePlan(req, callback) {
  const url = `${apiUrl}/api-hotel-polling-datahub/api/ratePlan`
  const option = {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(url, option)
    .then(res => res.json())
    .then(res => {callback(res)})
    .catch(err => {
      console.log(err)
    })
}