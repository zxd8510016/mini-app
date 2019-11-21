// pages/welcome/welcome.js
Page({
  onTap(){
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})