export function isNotEmptyObject(obj) {
  for (var key in obj) {
    return true
  }
  return false
}
export function quickSort(arr, sortParam) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][sortParam] < pivot[sortParam]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left, sortParam).concat([pivot], this.quickSort(right, sortParam))
}