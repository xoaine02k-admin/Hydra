/* == | Pages | == */
function loadHome(){
smoothChange(()=>{
  const btn = document.querySelector(".home-icon-fixed");
  if(btn) btn.remove();

contentArea.innerHTML=`
<h2>Tôi là HYDRA 5.4</h2>
<p>Hệ thống hỗ trợ học tập và giải trí.</p>

<div class="card" onclick="loadStudy()">📘 Học tập</div>
<div class="card" onclick="loadEntertainment()">🎮 Giải trí</div>
<div class="card" onclick="loadChat()">💬 Trò chuyện</div>
<div class="card" onclick="loadSystem()">⚙️ Quản lí hệ thống</div>
`;

hideBack();
restoreHeader();
closeMenu();
});
}

function loadStudy(){
smoothChange(()=>{
contentArea.innerHTML=`
<h2>📘 Học tập</h2>

<div class="card" onclick="openSubject('Toán')">➗ Toán</div>
<div class="card" onclick="openSubject('Ngữ Văn')">📖 Ngữ Văn</div>
<div class="card" onclick="openSubject('Tiếng Anh')">🌍 Tiếng Anh</div>
<div class="card" onclick="toggleScience()">🔬 Khoa học tự nhiên</div>

<div id="scienceBox" style="display:none; margin-left:10px;">
    <div class="card" onclick="openSubject('Hóa học')">🧪 Hóa học</div>
    <div class="card" onclick="openSubject('Vật lí')">⚡ Vật lí</div>
    <div class="card" onclick="openSubject('Sinh học')">🌱 Sinh học</div>
</div>

<div class="card" onclick="openSubject('Lịch sử - Địa lí')">🗺️ Lịch sử - Địa lí</div>
`;
showBack();
});
}

function loadEntertainment(){
smoothChange(()=>{
contentArea.innerHTML=`<h2>🎮 Giải trí</h2>`;
showBack();
});
}

function loadChat(){
smoothChange(()=>{

contentArea.innerHTML = `
<div class="chat-layout">
    <div id="chatMessages" class="chat-messages"></div>
    <div class="chat-input-bar">
        <input id="chatInput" placeholder="Nhập tin nhắn..." />
        <button onclick="sendMsg()">Gửi</button>
    </div>
</div>
`;

const oldBtn = document.querySelector(".home-icon-fixed");
if(oldBtn) oldBtn.remove();

const btn = document.createElement("div");
btn.className = "home-icon-fixed";
btn.innerHTML = "🏠";
btn.onclick = loadHome;
document.body.appendChild(btn);

setTimeout(()=>{
    document.getElementById("chatInput").focus();
},50);

shrinkHeader();
});
}

function loadSystem(){
let cpu=Math.floor(Math.random()*100);
let ram=Math.floor(Math.random()*100);

const modal=document.createElement("div");
modal.className="system-modal";

modal.innerHTML=`
<div class="system-box">
<h2>⚙️ Quản lí hệ thống</h2>

<p>CPU: ${cpu}%</p>
<div style="height:8px;background:#1c1f26;border-radius:10px;overflow:hidden;">
<div style="height:100%;width:${cpu}%;background:#6fa8ff;"></div>
</div>

<p style="margin-top:12px;">RAM: ${ram}%</p>
<div style="height:8px;background:#1c1f26;border-radius:10px;overflow:hidden;">
<div style="height:100%;width:${ram}%;background:#6fa8ff;"></div>
</div>

<p style="margin-top:15px;color:#6fa8ff;">
Trạng thái: Hoạt động ổn định
</p>

<div class="close-system">Đóng</div>
</div>
`;

document.body.appendChild(modal);

modal.addEventListener("click",e=>{
if(e.target.classList.contains("system-modal") ||
   e.target.classList.contains("close-system")){
modal.remove();
}
});
}

function loadProfile(){
smoothChange(()=>{
contentArea.innerHTML="<h2>Hồ sơ</h2>";
showBack();
});
}

function loadSettings(){
smoothChange(()=>{
contentArea.innerHTML="<h2>Cài đặt</h2>";
showBack();
});
}

function loadSupport(){
smoothChange(()=>{
contentArea.innerHTML=`
<h2>📩 Góp ý & báo cáo</h2>
<p>Bạn có thể gửi góp ý để HYDRA cải thiện hệ thống.</p>

<div class="card" onclick="openFeedback()">📨 Gửi góp ý</div>
<div class="card" onclick="reportBug()">🐞 Báo lỗi hệ thống</div>
`;
showBack();
});
}