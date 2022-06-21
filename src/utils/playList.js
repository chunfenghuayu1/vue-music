// 存储歌曲
export const setSong = (list) => {
  localStorage.setItem('PLAYLIST', JSON.stringify(list))
}
// 获取歌曲列表
export const getSong = () => {
  const list = localStorage.getItem('PLAYLIST')
  return JSON.parse(list)
}
// 删除歌曲
export const deleteSong = (id) => {
  const list = getSong()
  const newList = list.filter(a => a.id !== id)
  console.log(newList)
  setSong(newList)
}
// 清空歌曲
export const removeSong = (id) => {
  if (id === -1) {
    // const list = []
    // setSong(list)
    localStorage.removeItem('PLAYLIST')
  }
}
