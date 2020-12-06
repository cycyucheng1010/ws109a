# My_midterm

## About crawler
網路爬蟲（又被稱為網頁蜘蛛，網路機器人，在FOAF社群中間，更經常的稱為網頁追逐者），是一種按照一定的規則，自動地抓取全球資訊網資訊的程式或者指令碼。另外一些不常使用的名字還有螞蟻、自動索引、模擬程式或者蠕蟲。

## Describe 
* 程式碼參考鍾誠老師gitlab上之程式碼 了解程式碼並部分改寫
* 使用工具及環境: VScode, nodejs(ver: 6.14.4)
* 收尋網站: [百度新聞](http://news.baidu.com/)
* 找到之連結會存於resulturl.json裡面
## Code
* [crawler.js](https://github.com/cycyucheng1010/ws109a/blob/master/crawler.js)
```
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
```
## result
* [resulturl.json](https://github.com/cycyucheng1010/ws109a/blob/master/resulturl.json)
## Additional
* fs：它包含檔案的存取／操作的一些類別，方法及事件。
* http：它包含可以用來建立http server 的一些類別, 方法, 及事件。 
* url：它包含可以解析url的一些方法。
* indexOf() 方法會回傳給定元素於陣列中第一個被找到之索引，若不存在於陣列中則回傳-1。
## Reference
* [程式前沿/分分鐘鐘教你用node.js寫個爬蟲](https://codertw.com/ios/20272/#outline__1)
* [鍾誠老師的gitlab](https://gitlab.com/ccckmit/course/-/wikis/%E9%99%B3%E9%8D%BE%E8%AA%A0/%E6%9B%B8%E7%B1%8D/%E7%B6%B2%E7%AB%99%E8%A8%AD%E8%A8%88/httpCrawler)
* [IT邦幫忙 Node.JS - 30 天入門學習筆記系列 作者:circleuniv](https://ithelp.ithome.com.tw/articles/10185302)
