/* == | Chat | == */
function outsideClick(e){
if(header.classList.contains("open") &&
   !header.contains(e.target) &&
   (!chatBar || !chatBar.contains(e.target))){

header.classList.remove("open");
header.classList.add("compact");

if(chatBar){
chatBar.style.opacity="1";
chatBar.style.pointerEvents="auto";
}
}
}

function restoreHeader(){
header.classList.remove("compact");

if(chatBar){
chatBar.remove();
chatBar=null;
}

document.removeEventListener("click",outsideClick);
header.classList.remove("open");
}

function sendMsg(){
const input=document.getElementById("chatInput");
const box=document.getElementById("chatMessages");

if(!input.value.trim()) return;

const msg=document.createElement("div");
msg.className="msg";
msg.textContent=input.value;

box.appendChild(msg);
input.value="";
box.scrollTop = box.scrollHeight;
}

function startNoticeCountdown(){

    if(!localStorage.getItem("has_notice")) return;
    if(noticeTimer) return; // tránh chạy trùng

    noticeTimer = setTimeout(()=>{
        localStorage.removeItem("has_notice");

        const dot=document.getElementById("notifyDot");
        const bar=document.getElementById("miniBar");
        const text=document.querySelector(".notify-text");

        if(dot) dot.classList.remove("notify-on");
        if(bar) bar.classList.remove("notify-on");
        if(text) text.classList.remove("notify-on");

        noticeTimer = null;
    },15000);
}

function clearNotify(){
    const dot=document.getElementById("notifyDot");
    const text=document.querySelector(".notify-text");

    if(dot) dot.classList.remove("notify-on");
    if(text) text.classList.remove("notify-on");
}