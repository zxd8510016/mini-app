// pages/movie/movie.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesShow:true,
    searchShow:false,
    searchDatas:{},
    val:''
  },
  onBindFocus(e){
    this.setData({
      moviesShow:false,
      searchShow:true
    })
  },

  onCancelTap(){
    this.setData({
      moviesShow: true,
      searchShow: false,
      searchDatas: {},
      val: ''
    })
  },
  onBindConfirm(e){
    var text=e.detail.value;
    var searchUrl = app.globalData.doubanApi + '/v2/movie/search?q='+text;
    this.getMovieList(searchUrl,'searchDatas','');
  },

  onLoad: function(options) {
    var inTheaters = app.globalData.doubanApi + '/v2/movie/in_theaters?start=1&count=3';
    var comingSoon = app.globalData.doubanApi + '/v2/movie/coming_soon?start=1&count=3';
    var top250 = app.globalData.doubanApi + '/v2/movie/top250?start=0&count=3';

    this.getMovieList(inTheaters, 'inTheaters', '正在热映');
    this.getMovieList(top250, 'top250', 'Top250');
    this.getMovieList(comingSoon, 'comingSoon', '即将上映');
    
  },

  getMovieList(url, movieType, movieTitle) {
    wx.request({
      url: url,
      success: res => {
        this.processMovieDatas(res.data.subjects, movieType, movieTitle);
      }
    })
  },

  processMovieDatas(subjects, movieType, movieTitle) {
    var movies = [];
    subjects.forEach(subject => {
      if (subject.title.length>6){
        subject.title = subject.title.substring(0,6)+'...'
      }
      if (parseInt(subject.rating.average) == parseFloat(subject.rating.average)){
        subject.rating.average+='.0'
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
    var readyData={};
    readyData[movieType]={
      movieTitle,
      movies
    };
    this.setData(readyData);
  },

  onMoreTap(e){
    var type=e.currentTarget.dataset.type;
    wx.navigateTo({
      url: './more-movie/more-movie?type='+type,
    })
  },

  onMovieTap(e){
    var movieId=e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: './movie-detail/movie-detail?id=' + movieId
    })
  }
})