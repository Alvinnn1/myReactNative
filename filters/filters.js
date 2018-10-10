export function host(url) {
  if (!url) return ''
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function https(url) {
  const env = weex.config.env || WXEnvironment
  if (env.platform === 'iOS' && typeof url === 'string') {
    return url.replace(/^http\:/, 'https:')
  }
  return url
}
export function formatDate(date){
  if(!date) return
  var dateArr = date.split('-')
  return `${dateArr[1]}月${dateArr[2]}日`
}
export function formatDateToWeek(date){
  const dayZH = ['日', '一', '二', '三', '四', '五', '六'],
    lang = 'ZH'
  if (!date) return
  const year = date.split('-')[0],
    month = date.split('-')[1],
    day = date.split('-')[2]
  console.log(day)
  const myDate = new Date(year, Number(month) - 1, day)
  let weekStr = ''
  if (lang === 'ZH') {
    weekStr = '周' + dayZH[myDate.getDay()]
  } else {
    weekStr = dayZH[myDate.getDay()]
  }
  return weekStr
}
// export function formatDateToWee(date) {
//
//     const dayZH = ['日', '一', '二', '三', '四', '五', '六'],
//         lang = 'ZH'
//     if (!date) return
//
//     const year = date.split('-')[0],
//         month = date.split('-')[1],
//         day = date.split('-')[2]
//     const myDate = new Date(year, Number(month) - 1, day)
//     let weekStr = ''
//     if (lang === 'ZH') {
//         weekStr = '周' + dayZH[myDate.getDay()]
//     } else {
//         weekStr = dayZH[myDate.getDay()]
//     }
//     console.log(weelStr)
//     return weekStr
// }
//2017-09-12 => Sept || 2017-09-12 =>12
export function adaptDate(date, type, lang) {
  if(!date) return
  var dateStr = {
      EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },
    weekday=['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  if (type === 'm') {
    var month = Number(date.split('-')[1])
    if (lang === 'EN') {
      return dateStr.EN[month - 1]
    } else {
      return month + '月'
    }
  } else if (type === 'd') {
    return date.split('-')[2]
  } else if (type === 'week') {
    var d = new Date(date)
    if(d.getDay() == 0){
      return weekday[6]
    }else{
      return weekday[d.getDay()-1]
    }
  }
}
//1249 => ¥1,249
export function currencyInt(price, symbol) {
  symbol =''
  if (price === null || price === undefined) {
    return ''
  }

  var priceArr = typeof price !== 'string' ? String(price).split('.') : price.split('.'),
    currencyList = []

  priceArr[1] = priceArr[1] ? priceArr[1] + '00' : ''

  for (var i = 0, len = priceArr[0].length; i < len; i++) {
    currencyList.push(priceArr[0].substr(len - i - 1, 1))
    if (i !== 0 && i + 1 != len && (i + 1) % 3 === 0) {
      currencyList.push(',')
    }
  }

  return symbol + ' ' + currencyList.reverse().join('')
}

/*1249.153 => ¥1,249.2*/
export function currencyPointOne(price, symbol) {
  if(!symbol){
    symbol = ''
  }else{
    symbol = symbol + ' '
  }
  if (price === null || price === undefined){
    return ''
  }
  price = '' + price
  var priceArr = price.split('.')
  var pricePoint = priceArr[1] ? priceArr[1].split('')[0] : '0'
  var  currencyList = []
  for (var i = 0, len = priceArr[0].length; i < len; i++) {
    currencyList.push(priceArr[0].substr(len - i - 1, 1))
    if (i !== 0 && i + 1 != len && (i + 1) % 3 === 0) {
      currencyList.push(',')
    }
  }
  return symbol + currencyList.reverse().join('') + '.' + pricePoint


}

export function currencyPointNoOne(price, symbol) {
  if(!symbol){
    symbol = ''
  }else{
    symbol = symbol + ' '
  }
  if (price === null || price === undefined){
    return ''
  }
  price = Math.ceil(price)
  price = '' + price
  // var priceArr = price.split('.')
  // var pricePoint = priceArr[1] ? priceArr[1].split('')[0] : '0'
  // var  currencyList = []
  // for (var i = 0, len = priceArr[0].length; i < len; i++) {
  //     currencyList.push(priceArr[0].substr(len - i - 1, 1))
  //     if (i !== 0 && i + 1 != len && (i + 1) % 3 === 0) {
  //         currencyList.push(',')
  //     }
  // }
  return symbol + price + '.' + '0'


}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function unescape(text) {
  let res = text || ''

  ;
  [
    ['<p>', '\n'],
    ['&amp;', '&'],
    ['&amp;', '&'],
    ['&apos;', '\''],
    ['&#x27;', '\''],
    ['&#x2F;', '/'],
    ['&#39;', '\''],
    ['&#47;', '/'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&nbsp;', ' '],
    ['&quot;', '"']
  ].forEach(pair => {
    res = res.replace(new RegExp(pair[0], 'ig'), pair[1])
  })

  return res
}


export function timestampFormat(timestamp) {
  if (!timestamp) {
    return ''
  }

  var date = new Date(timestamp)

  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()

  month = (month < 10 ? '0' : '') + month
  day = (day < 10 ? '0' : '') + day
  hour = (hour < 10 ? '0' : '') + hour
  min = (min < 10 ? '0' : '') + min

  return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min
}



