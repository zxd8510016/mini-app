var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var detailUrl = app.globalData.doubanApi+'/v2/movie/subject/'+id;
    console.log(detailUrl)
    util.http(detailUrl, this.processMovieDatas);
  },

  processMovieDatas(data){
    console.log(data)
    var director = {
      avatar: "",
      name: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
    }
    if (parseInt(data.rating.average) == parseFloat(data.rating.average)) {
      data.rating.average += '.0'
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.toStarArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }

    this.setData({...movie})
  },

  viewMovieImage(e){
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})