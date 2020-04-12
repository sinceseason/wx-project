// components/playlist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object,
      value: {},
    }
  },

  observers: {
    'playlist.playCount'(val) {
      this.setData({
        _count: this.transNumber(val, 2)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToMusiclist() {
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
      })
    },
    transNumber(val, point) {
      let numStr = val.toString().split('.')[0];
      let len = numStr.length;
      if (len < 6) {
        return numStr;
      } else if (len >= 6 && len <= 8) {
        // 获取小数部分
        let decimal = numStr.substring(len - 4, len - 4 + point);
        return parseFloat(parseInt(val / 10000) + '.' + decimal) + '万'
      } else {
        let decimal = numStr.substring(len - 8, len - 8 + point);
        return parseFloat(parseInt(val / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})
