/* == | Notify | == */ 
function loadNotify(){
smoothChange(()=>{

let notices = JSON.parse(localStorage.getItem("notice_list") || "[]");

let html = `
<h2>🔔 Thông báo hệ thống</h2>
<p style="opacity:.7">Lưu tất cả thông báo từ server</p>
`;

if(notices.length===0){
    html += `<p style="opacity:.6">Chưa có thông báo nào</p>`;
}else{

    html += `<div style="margin-top:15px;">`;

    notices.forEach(n=>{

        const date = new Date(n.time).toLocaleString();

        html += `
        <div class="card"
onclick="toggleNotice(${n.id})"
style="
            position:relative;
            border-left:4px solid ${n.read ? "#3a3f4f" : "#6fa8ff"};
        ">
            <div style="font-size:12px;opacity:.6">${date}</div>

            <div style="margin-top:6px;font-size:15px">
                <div style="margin-top:6px;font-size:15px;font-weight:600">
    ${n.title}
</div>

${n.opened ? `
<div style="
    margin-top:8px;
    opacity:.85;
    line-height:1.4;
">
    ${n.body}
</div>
` : ""}
            </div>

            ${!n.read ? `<div style="
                position:absolute;
                top:12px;
                right:12px;
                width:8px;height:8px;
                border-radius:50%;
                background:#6fa8ff;
            "></div>`:""}

            <div style="margin-top:10px;display:flex;gap:10px;">

                <button onclick="markNoticeRead(${n.id})"
                style="background:#2a2f3a;border:none;color:#6fa8ff;padding:6px 10px;border-radius:8px;cursor:pointer;">
                Đã đọc
                </button>

                <button onclick="deleteNotice(${n.id})"
                style="background:#2a2f3a;border:none;color:#ff6b6b;padding:6px 10px;border-radius:8px;cursor:pointer;">
                Xóa
                </button>

            </div>
        </div>`;
    });

    html += `</div>

    <button onclick="clearAllNotice()"
    style="
    margin-top:20px;
    padding:10px 14px;
    background:#2a2f3a;
    border:none;
    border-radius:10px;
    color:#ff6b6b;
    cursor:pointer;">
    🧹 Xóa toàn bộ thông báo
    </button>`;
}

contentArea.innerHTML = html;
showBack();
});
}

function markNoticeRead(id){
    let notices = JSON.parse(localStorage.getItem("notice_list") || "[]");
    notices = notices.map(n=>{
        if(n.id===id) n.read=true;
        return n;
    });
    localStorage.setItem("notice_list", JSON.stringify(notices));
    loadNotify();
}

function toggleNotice(id){
    let notices = JSON.parse(localStorage.getItem("notice_list") || "[]");

    notices = notices.map(n=>{
        if(n.id===id){
            n.opened = !n.opened;

            // 👇 Tự đánh dấu đã đọc khi mở
            if(!n.read){
                n.read = true;
            }
        }
        return n;
    });

    localStorage.setItem("notice_list", JSON.stringify(notices));

    // 👇 nếu không còn notice chưa đọc -> tắt badge
    const stillUnread = notices.some(n=>!n.read);
    if(!stillUnread){
        localStorage.removeItem("has_notice");
    }

    loadNotify();
}

function deleteNotice(id){
    let notices = JSON.parse(localStorage.getItem("notice_list") || "[]");
    notices = notices.filter(n=>n.id!==id);
    localStorage.setItem("notice_list", JSON.stringify(notices));
    loadNotify();
}

function clearAllNotice(){
    localStorage.removeItem("notice_list");
    loadNotify();
}

function showNotify(){
    const dot=document.getElementById("notifyDot");
    if(dot) dot.style.display="block";
}

let noticeTimer = null;