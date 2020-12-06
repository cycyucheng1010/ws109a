// 安裝套件： npm install URIjs
// 執行方法： node crawler http://news.baidu.com/


//引入模組
var fs = require('fs');
var http = require('http');
var URI = require('URIjs');
var c = console;

//前置設定
var urlMap  = { };
var urlList = [ ];
var urlIdx  = 0;

urlList.push(process.argv[2]); // 新增第一個網址

crawNext(); // 開始抓

// 下載下一個網頁
function crawNext() { 
  //如果沒有網頁則return
  if (urlIdx >= urlList.length) 
    return;
  // indexOf() 方法會回傳給定元素於陣列中第一個被找到之索引，若不存在於陣列中則回傳-1。
  var url = urlList[urlIdx];
  if (url.indexOf('http://')!==0) {
    urlIdx ++;
    crawNext();
    return;
  }
  //輸出
  c.log('爬取之網頁連結url[%d]=%s', urlIdx, url);
  fs.writeFileSync("resulturl.json", JSON.stringify(urlList));
  urlMap[url] = { downlioad:false };

  pageDownload(url, function (data) {
    var page = data.toString();
    urlMap[url].download = true;
    var filename = urlToFileName(url);
    fs.writeFile('data/'+filename, page, function(err) {
    });
    var refs = getMatches(page, /\shref\s*=\s*["'#]([^"'#]*)[#"']/gi, 1);
    //將網頁連結轉string後加入陣列中
    for (i in refs) {
      try {
      var refUri = URI(refs[i]).absoluteTo(url).toString();
      c.log('ref=%s', refUri);
      if (refUri !== undefined && urlMap[refUri] === undefined)
        urlList.push(refUri);
      } catch (e) {}
    }
    urlIdx ++;
    crawNext();
  });
}
// 下載一個網頁
function pageDownload(url, callback) {
  http.get(url, function(res) {
    res.on('data', callback);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
// 取得正規表達式比對到的結果成為一個陣列
function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}
// 將網址改寫為合法的檔案名稱
function urlToFileName(url) {
  return url.replace(/[^\w]/gi, '_');
}
