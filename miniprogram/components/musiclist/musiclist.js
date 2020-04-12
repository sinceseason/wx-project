// components/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedId: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选中后改变颜色
    onSelect(event) {
      let musicid = event.currentTarget.dataset.musicid
      this.setData({
        selectedId: musicid,
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${musicid}`,
      })
    }
  }
})
