window.onload = function(){
var btn = document.querySelector('input');
var text = document.querySelector('textarea');
var list = document.querySelector('#list');
var colors = ["red","pink"];
var nub = 0;
btn.onclick = function(){
if(text.value.trim() == ""){
alert("write something...");
return false;
}
var li = document.createElement("li");
li.innerHTML = text.value;

if(list.children[0]&&list.children[0].className=="red"){
li.className = "pink";
} 
else {
li.className = "red";
}
var a = null;
li.onmouseover = function(){
if(a) {
a.style.display = "block";
} 
else {
a = document.createElement("a");
a.href = "javascript:;";
a.className = "clos";
a.innerHTML = "delet";
a.onclick = function (){
list.removeChild(this.parentNode);
};
this.appendChild(a);
}
};
li.onmouseout = function(){
a.style.display = "none";
};
list.insertBefore(li,list.children[0]);
text.value = "";
nub  ;
};
}; 