var postDatas = require('../../../data/posts_data.js');
var app=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.data.postId = postId;
    var postData = postDatas.postsList[postId];
    this.setData({
      postData
    })

    var postsCollected = wx.getStorageSync('posts_collected');

    if (postsCollected) {
      if (postsCollected[postId]) {
        this.setData({
          collected: postsCollected[postId]
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    if (app.globalData.g_isPlaying && app.globalData.g_currentPostId==postId){
      this.setData({
        isPlaying: true
      })
    }
    this.setAudioState()
  },

  setAudioState(){
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlaying: true
      })
      app.globalData.g_isPlaying=true;
      app.globalData.g_currentPostId=this.data.postId;
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false;
      app.globalData.g_currentPostId=null;
    })

    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false;
      app.globalData.g_currentPostId = null;
    })
  },

  onCollectionTap() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var collected = postsCollected[this.data.postId];
    collected = !collected;
    postsCollected[this.data.postId] = collected;
    
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected
    });
    wx.showToast({
      title: collected ? '收藏成功' : '取消收藏',
    })
    
  },

  onShareTap(){
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        '分享到朋友圈',
        '分享到微博',
        '分享到QQ'
      ]
    })
  },

  onAudioTap(){
    var {isPlaying} = this.data;
    var {postId} = this.data;
    if(isPlaying){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postDatas.postsList[postId].music.url,
        title: postDatas.postsList[postId].music.title,
        coverImgUrl: postDatas.postsList[postId].music.coverImg
      })
      this.setData({
        isPlaying: true
      })
    }
  }
})