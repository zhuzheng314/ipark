// 数字格式
function NumFormat (value, n = 0) {
  if (value === '' || value == null) { return 0 }
  if (isNaN(value)) {
    return 0
  } else {
    value = Number(value)
  }
  // 不保留小数
  if (n === 0) {
    value = Number(value) | 0
    let intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return intPartFormat
  }
  // 保留小数
  if (n !== 0) {
    value = value.toFixed(n)
    // 截取小数部分
    let intPartFormat = value.substring(0, value.length - n - 1).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    let floatPart = value.substring(value.length - n - 1)
    return intPartFormat + floatPart
  }
}

// 百分百
function Percent (value) {
  value = Number(value * 100).toFixed(2)
  return value + '%'
}

export {
  NumFormat,
  Percent
}
