# 期末作業:Search Engine = Deno + Elasticsearch
* [網頁連結](http://172.104.122.100:8000)
## 資料的收尋及筆記
* [MY_linode](https://github.com/cycyucheng1010/ws109a/blob/master/MY_linode.md)
* [My_deno](https://github.com/cycyucheng1010/ws109a/blob/master/My_deno.md)
## 過程
1. 利用爬蟲將網址爬取並存下
2. 程式透過elasticsearch進行收尋
3.完成收尋
## 程式碼
* [denocrawler.js](https://github.com/cycyucheng1010/ws109a/blob/master/final/denocrawler.js)
```
import { get, post } from './esearch.js'
//import { writeJson } from 'https://deno.land/std/fs/mod.ts'
import { writeJson, writeJsonSync } from 'https://deno.land/x/jsonfile/mod.ts';
var urlList = [
  // 'http://msn.com', 
  'https://en.wikipedia.org/wiki/Main_Page'
]

var urlMap = {}

async function getPage(url) {
  try {
    const res = await fetch(url);
    return await res.text();  
  } catch (error) {
    console.log('getPage:', url, 'fail!')
  }
}

function html2urls(html) {
  var r = /\shref\s*=\s*['"](.*?)['"]/g
  var urls = []
  while (true) {
    let m = r.exec(html)
    if (m == null) break
    urls.push(m[1])
  }
  return urls
}

// await post(`/web/page/${i}`, {url, page})
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function craw(urlList, urlMap) {
  var count = 0
  for (let i=0; i<urlList.length; i++) {
  // for (let i=0; i<10; i++) {
    var url = urlList[i]
    console.log('url=', url)
    await sleep(2000);//delay
    if (!url.startsWith("https://en.wikipedia.org/wiki")) continue;
    console.log(url, 'download')
    count ++
    if (count >=10) break
    try {
      var page = await getPage(url)
      await post(`/web7/page/${count}`, {url, page})
      // await Deno.writeTextFile(`data/${i}.txt`, page)
      var urls = html2urls(page)
      // console.log('urls=', urls)
      for (let surl of urls) {
        var purl = surl.split(/[#\?]/)[0]
        var absurl = purl
        if (surl.indexOf("//")<0) { // 是相對路徑
           absurl = (new URL(purl, url)).href
           // console.log('absurl=', absurl)
        }
        if (urlMap[absurl] == null) {
          urlList.push(absurl)
          urlMap[absurl] = 0
        }
      }
    } catch (error) {
      console.log('error=', error)
    }

    writeJson("./users1.json",urlList);
  }
}

await craw(urlList, urlMap)
```
* [主程式](https://github.com/cycyucheng1010/ws109a/blob/master/final/app.js)
```
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://ccc-js.github.io/view-engine/mod.ts" // from "https://deno.land/x/view_engine/mod.ts";
import { get, post } from "./essearch.js";
import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const router = new Router();

router
  .get('/', (ctx)=>{
    ctx.response.redirect('/public/search.html')
  })
  .get('/search', search)
  .get('/public/(.*)', pub)

const app = new Application();
app.use(viewEngine(oakAdapter, ejsEngine));
app.use(router.routes());
app.use(router.allowedMethods());
const parser = new DOMParser();

async function search(ctx) {
  const query = ctx.request.url.searchParams.get('query')
  console.log('query =', query)

  let docs = await get('/web7/page/_search', {page:query})
  docs=docs.hits.hits
  let document=[]
  let title1=[]
  
  for(var i=0;i<docs.length;i++){
    let s = ""
    let s1=""
    docs[i]["_title"]=""
    title1=parser.parseFromString(docs[i]["_source"]["page"],"text/html")//JSON字串轉換成 JavaScript的數值或是物件
    title1.querySelectorAll('title').forEach((node)=>s1+=(node.textContent))//querySelectorAll()，這個不但可以把同樣的元素選起來外，還會以陣列的方式被傳回
    docs[i]["_title"]=s1
    console.log("title=",s1)
    console.log(docs[i])
    document = parser.parseFromString(docs[i]["_source"]["page"],"text/html")//.querySelector('#mw-content-text') 
    document.querySelectorAll('p').forEach((node)=>s += (node.textContent))//返回與指定選擇器匹配的文檔中所有Element節點的列表。
    var j=s.indexOf(query)
    docs[i]["_source"]["page"]=s.substring(j-150,j+150)
  }

  ctx.render('views/searchResult1.ejs', {docs:docs})
}

async function pub(ctx) {
  var path = ctx.params[0]
  await send(ctx, path, {
    root: Deno.cwd()+'/public',
    index: "index.html",
  });
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
```

## 成果
![command.PNG](https://github.com/cycyucheng1010/ws109a/blob/master/command.PNG)
![homepage.PNG](https://github.com/cycyucheng1010/ws109a/blob/master/homepage.PNG)
![result.PNG](https://github.com/cycyucheng1010/ws109a/blob/master/result.PNG)
## 備註
* 程式碼參考鍾誠老師以及柯泓吉同學之程式碼，並使用在個人申請之linode後端上。
* 感謝鍾誠老師這學期的教學，雖然目前對deno及後端的理解還十分有限，但相信透過這學期的認識以及後續的努力一定可以闖出一片天的!
* 在學習的過程中主要遇到的問題有一下兩點: 首先是對deno的熟悉程度不足以及對linux系統的不理解，導致光安裝deno的環境就花了不少時間。
* 使用deno爬蟲爬取資料後再搭配elasticsearch做收尋引擎。
* 來源網址為維基百科。
