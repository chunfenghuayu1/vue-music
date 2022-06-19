import formatSong from './formatSong'
export default class Song {
  constructor ({
    id,
    name,
    mvId,
    singer,
    // 简介
    alia,
    // 专辑
    album,
    // 歌曲时长
    dt,
    // 歌曲连接
    url,
    // 是否付费
    fee,
    // 是否有版权
    license,
    // 发行时间
    publishTime,
    // 简介
    tns
  }) {
    this.id = id
    this.name = name
    this.mvId = mvId
    this.singer = singer
    this.alia = alia
    this.dt = dt
    this.album = album
    this.url = url
    this.fee = fee
    this.license = license
    this.publishTime = publishTime
    this.tns = tns
  }
}
export function formatSongInfo (params) {
  return new Song({
    id: String(params.id),
    name: params.name,
    mvId: params.mv,
    singer: params.ar,
    alia: params.alia,
    album: params.al,
    dt: formatSong.formatSongTime(params.dt),
    url: `https://music.163.com/song/media/outer/url?id=${params.id}.mp3`,
    fee: params.fee,
    license: params.license,
    publishTime: formatSong.formatMsgTime(params.publishTime),
    tns: params.tns
  })
}
