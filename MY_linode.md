## address
172.104.122.100
## login step
1. ```ssh root@172.104.122.100```
2. enter password
3. login success
## installation part
### basic
* ```$ sudo apt-get install git-all ``` git安裝
* ```sudo apt-get install unzip -y  ```解壓縮程式安裝
* ```sudo apt-get install curl ```安裝下載器
### deno and node
* ``` curl -fsSL https://deno.land/x/install/install.sh | sh ```安裝deno
* ```apt-get install nodejs```安裝nodejs
* ```sudo apt-get install npm```安裝npm

### elasticsearch 
  1.  sudo apt update
  2.  sudo apt install oracle-java8-installer
  3.  sudo apt install default-jre
  4.  sudo apt install default-jdk
  5.  sudo apt install oracle-java8-installer
  6.  javac
  7.  wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
  8.  sudo apt-get install apt-transport-https
  9.  sudo apt-get update && sudo apt-get install elasticsearch
  10.  sudo -i service elasticsearch start
  11.  curl localhost:9200
## command
* ``` &```Linux 允許把命令放到背景中執行，僅僅需要在命令的最後加上一個 &，就可以利用 Linux 的多工特性執行多個背景程式
* ``` nohup```全寫是 “no hangup”, HUP hangup (HUP) 訊號會在使用者登出時, 系統向 process 發出, 通知 process 結束, 但透過 nohup 執行的指令, nohup 會將 HUP 訊息截取, 讓指令可以繼續執行。
* ```vim ~/.bashrc```設定
* ```sudo```superuser超級使用者(權限)
* ```cd``` 這是用來變換工作路徑的指令。
* ```pwd```:如果你想要知道目前所在的目錄。
* ```ls --color``` 以彩色顯示檔案資料。
* ```ls -l``` 詳細列出檔案系統結構。
* ```ls -al```同時顯示隱藏檔與詳細資料。
* ```mkdir``` 建立新的目錄。
* ```mv``` 移動檔案或目錄的指令。( mv 來源檔（或目錄） 目的檔（或目錄）)
* ```exit``` login out 的意思。
* ```shutdown``` Linux 用來關機的指令。
* ```reboot``` 重新開機的指令。
* ```curl```在linux中curl是一個利用URL規則在命令列下工作的檔案傳輸工具,可以說是一款很強大的http命令列工具。它支援檔案的上傳和下載,是綜合傳輸工具,但按傳統,習慣稱url為下載工具。
* ```clear```清除命令提示字元之文字

## vi
* ex: vi test.dat
### 編輯模式：
* ```i``` (插入：在目前的游標所在處插入輸入之文字，已存在的文字會向後退)
* ```a``` (增加：由目前游標所在的下一個字開始輸入，已存在的文字會向後退)
* ```o``` (插入新的一行：從游標所在的下一行枝行首開始輸入文字)
* ```r``` (取代：會取代游標所在的那一個字元)
* ```R``` (全部取代：會一直取代游標所在的文字，直到按下 ESC 為止)
* ```:wq``` (存檔並離開的指令很簡單)
* esc 回到原本狀態
### 游標移動指令:
* ```k```  或向上鍵 (向上移一個字元)
* ```j```  或向下鍵 (向下移一個字元)
* ```h```  或向左鍵 (向左移一個字元)
* ```l```  或向右鍵 (向右移一個字元)
* ```H``` (游標移動到螢幕頂端)
* ```M``` (游標移動到螢幕正中央)
* ```L``` (游標移動到螢幕最夏方)
* ```+``` (游標移動至非空白字元的下一列)
* ```-``` (游標移動至非空白字元的前一列)
* ```Ctrl + b``` (螢幕向『後』移動一頁)
* ```Ctrl + f``` (螢幕向『前』移動一頁)
* ```Ctrl + u``` (螢幕向『後』移動半頁)
* ```Ctrl + d``` (螢幕向『前』移動半頁)
* ```n+space``` (先按數字後再按空白鍵：游標向後面移動 n 個字元)
* ```0``` (數字鍵『0』：移動到這一列的第一個字元)
* ```$``` (移動到這一行的行尾)
* ```G``` (移動到最後一行)
* ```nG``` (移動到第 n 行（常與 :set nu 合用）)
* ```J``` (將目前游標所在行與下一行連結)
* ```yy```複製一行
* ```cc```剪下一行
* ```p```貼上
* ```dd```刪除一行
* ```:100```跳到指定第幾行就這樣用（到第一百行）
