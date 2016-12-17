/**
 * Created by Administrator on 2016/12/14.
 */
var holder = document.getElementById('holder');
var canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

if(window.File && window.FileReader && window.FileList &&window.Blob)
{
    console.log("支持HTML5 File API!");
}
else
{
    console.log("HTML5 File API 在您的浏览器里不完全支持的。")
}
holder.ondragover = function ()
{
    this.className = 'hover';
    return false;
}
holder.ondragend = function ()
{
    this.className = 'normal';
    return false;
}
holder.ondrop = function (e)
{
    this.className = 'normal';
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    reader = new FileReader();
    reader.onload = function (event)
    {
        img = new Image();
        img.src = event.target.result;
        img.onload = function ()
        {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(this,0,0,canvas.width,canvas.height);
            delete this;
        }
    }
    reader.readAsDataURL(file);
    return false;
}

//---------------------------音频的js----------------------------------------
var music = document.getElementById("music");
var musicoff = document.getElementById("musicoff");
var musicon = document.getElementById("musicon");

musicon.onclick = function(){
    musicon.className = musicon.className ? "":"hidden";
    musicoff.className = musicoff.className ? "":"hidden";
    music.pause();
}
musicoff.onclick = function(){
    musicon.className = musicon.className ? "":"hidden";
    musicoff.className = musicoff.className ? "":"hidden";
    music.play();
}
//----------------------------页面加载后的动画---------------------------------
var oNickWrapper = document.getElementById('nick_h1');
var nickWrapper = document.getElementById('nickWrapper');
var oNick_p = document.getElementById('nick_p');

if(!(getComputedStyle(nickWrapper,false).display == 'block'))
{
    setTimeout(load,300);
}

function load()
{
    oNickWrapper.className = 'show';
    oNick_p.className = 'show';
}
// -------------------------响应式设计----------------------------------------
function s() {
    var winWidth = window.innerWidth;
    var oBox=document.getElementById('box');
    if(winWidth<1200)
    {
        holder.style.display = 'none';
        oBox.style.display = 'none';
    }
    else
    {
        holder.style.display = 'block';
        oBox.style.display = 'block';
    }
}
setInterval(s,30);
s();

