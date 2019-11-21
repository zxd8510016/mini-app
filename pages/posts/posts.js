// pages/posts/posts.js
var postsList=require('../../data/posts_data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      postsList: postsList.postsList
    })
  },

  onPostTap(e){
    var postId = e.currentTarget.dataset.postid;
    this.navigateTo(postId)
  },
  onSwiperTap(e){
    var postId = e.target.dataset.postid;
    this.navigateTo(postId)
  },
  navigateTo(postId){
    wx.navigateTo({
      url: './posts-detail/posts-detail?id=' + postId
    })
  }
})