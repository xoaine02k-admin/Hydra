const contentArea = document.getElementById("contentArea");
const footerContainer = document.getElementById("footerContainer");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const header = document.querySelector(".header");

let chatBar = null;
let currentSubject = null;

function smoothChange(render){
    const content=document.getElementById("contentArea");
    content.classList.add("page-exit");

    setTimeout(()=>{
        shrinkHeader();
        render();

        content.classList.remove("page-exit");
        content.classList.add("page-enter");
        requestAnimationFrame(()=>{
            content.classList.remove("page-enter");
        });
    },200);
}

function shrinkHeader(){

if(chatBar) return;

header.classList.add("compact");

chatBar=document.createElement("div");
chatBar.className="chat-bar";
chatBar.id="miniBar";

chatBar.innerHTML=`
<b>HYDRA</b>
<span class="notify-text">Có thông báo mới</span>
<div class="notify-dot" id="notifyDot"></div>
`;

document.body.appendChild(chatBar);

// khôi phục trạng thái notify nếu còn
if(localStorage.getItem("has_notice")==="1"){
    chatBar.classList.add("notify-on");

    const dot=document.getElementById("notifyDot");
    if(dot) dot.classList.add("notify-on");
}

// chỉ hiện chấm đỏ nếu thật sự có thông báo
if(localStorage.getItem("has_notice")==="1"){
    const dot=document.getElementById("notifyDot");
    if(dot) dot.style.display="block";
}

let holdTimer;

chatBar.addEventListener("touchstart",()=>{
    holdTimer=setTimeout(()=>{
        chatBar.classList.add("expand");
        startNoticeCountdown(); // 👈 thêm dòng này
    },450);
});

chatBar.addEventListener("mousedown",()=>{
    holdTimer=setTimeout(()=>{
        chatBar.classList.add("expand");
        startNoticeCountdown(); // 👈 thêm dòng này
    },450);
});

function collapseBar(){
    clearTimeout(holdTimer);
    chatBar.classList.remove("expand");
}

chatBar.addEventListener("touchend",collapseBar);
chatBar.addEventListener("mouseup",collapseBar);
chatBar.addEventListener("mouseleave",collapseBar);

document.removeEventListener("click", outsideClick);
document.addEventListener("click", outsideClick);

chatBar.onclick=(e)=>{
e.stopPropagation();

let pressTimer=null;

chatBar.addEventListener("touchstart",()=>{
    pressTimer=setTimeout(()=>{
        openFakeNotify();
    },600); // giữ 0.6s
});

chatBar.addEventListener("touchend",()=>{
    clearTimeout(pressTimer);
});

chatBar.addEventListener("mousedown",()=>{
    pressTimer=setTimeout(()=>{
        openFakeNotify();
    },600);
});

chatBar.addEventListener("mouseup",()=>{
    clearTimeout(pressTimer);
});

header.classList.remove("compact");
header.classList.add("open");

chatBar.style.opacity="0";
chatBar.style.pointerEvents="none";

document.addEventListener("click", outsideClick);
};

header.onclick=(e)=>e.stopPropagation();

setTimeout(()=>{
document.addEventListener("click",outsideClick);
},0);
}

