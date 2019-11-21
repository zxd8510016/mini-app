function toStarArray(stars){
  var num = stars.substring(0,1);
  var starsArr=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      starsArr.push(1);
    }else{
      starsArr.push(0);
    }
  }
  return starsArr;
}

function http(url,callBack){
  wx.request({
    url: url,
    success: res => {
      callBack(res.data);
    }
  })
}

function convertToCastString(casts){
  var castJson='';
  for (var idx in casts){
    castJson += casts[idx].name+'/';
  }
  return castJson.substring(0, castJson.length-2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports={
  toStarArray,
  http,
  convertToCastString,
  convertToCastInfos
}