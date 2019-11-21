// pages/movies/more-movie/more-movie.js
const app=getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    totalCount:0,
    requestUrl:'',
    isEmpty:true
  },
  onScrollToLower(){
    //console.log('滚动到底部了')
    var nextUrl=`${this.data.requestUrl}?start=${this.data.totalCount}&count=20`;
    
    util.http(nextUrl, this.processMovieDatas);
    wx.showNavigationBarLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var {type} = options;
    wx.setNavigationBarTitle({
      title: type,
    })
    var dataUrl = '';
    switch (type) {
      case '正在热映':
        dataUrl = app.globalData.doubanApi +'/v2/movie/in_theaters';
        break;

      case '即将上映':
        dataUrl = app.globalData.doubanApi + '/v2/movie/coming_soon';
        break;

      case 'Top250':
        dataUrl = app.globalData.doubanApi + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processMovieDatas);
  },

  processMovieDatas(data) {
    var movies = [];
    data.subjects.forEach(subject => {
      if (subject.title.length > 6) {
        subject.title = subject.title.substring(0, 6) + '...'
      }
      if (parseInt(subject.rating.average) == parseFloat(subject.rating.average)) {
        subject.rating.average += '.0'
      }
      var tmp = {
        stars: util.toStarArray(subject.rating.stars),
        title: subject.title,
        average: subject.rating.average,
        image: subject.images.large,
        id: subject.id
      }
      movies.push(tmp);
    })
    var totalMovies=[];
      totalMovies = this.data.movies.concat(movies);
    

    this.setData({ movies: totalMovies });
    this.data.totalCount += 20;
    
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onMovieTap(e) {
    var movieId = e.currentTarget.dataset.movieid;
    console.log(movieId)
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})