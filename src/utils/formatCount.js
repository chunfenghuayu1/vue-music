// 处理播放次数过万
export const formatPlayCount = (val) => {
  let num = 0
  if (val > 9999) {
    num = Math.round(val / 10000 * 10) / 10 + '万'
  } else {
    num = val
  }

  return num
}
// 时间毫秒格式化处理 2020-10-30 09:30:00
export const formartDate = (originVal, fmt) => {
  const dt = new Date(originVal)
  const opt = {
    yyyy: (dt.getFullYear() + ''),
    MM: (dt.getMonth() + 1 + '').padStart(2, '0'),
    dd: (dt.getDate() + '').padStart(2, '0'),
    HH: (dt.getHours() + '').padStart(2, '0'),
    mm: (dt.getMinutes() + '').padStart(2, '0'),
    ss: (dt.getSeconds() + '').padStart(2, '0')
  }

  for (const k in opt) {
    const ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], opt[k])
    }
  }

  return fmt
}
