/* == | Study | == */
function openSubject(name){
currentSubject = name;   // 👈 THÊM DÒNG NÀY
smoothChange(()=>{

let data = JSON.parse(localStorage.getItem("study_"+name) || "{}");

if(data.grade && data.book && data.level){
    openLearning(name);
    return;
}

contentArea.innerHTML=`
<h2>📘 ${name}</h2>

<div class="q-box">
    <div class="q-title" onclick="toggleQ(this)">Lớp <span>▼</span></div>
    <div class="q-options">
        ${["6","7","8","9"].map(g=>`
        <div class="opt ${data.grade==g?"active":""}" 
        onclick="setStudy('${name}','grade','${g}',this)">
        Lớp ${g}
        </div>
        `).join("")}
    </div>
</div>

<div class="q-box">
    <div class="q-title" onclick="toggleQ(this)">Sách <span>▼</span></div>
    <div class="q-options">
        ${[
            "Kết nối tri thức",
            "Chân trời sáng tạo",
            "Cánh diều"
        ].map(b=>`
        <div class="opt ${data.book==b?"active":""}" 
        onclick="setStudy('${name}','book','${b}',this)">
        ${b}
        </div>
        `).join("")}
    </div>
</div>

<div class="q-box">
    <div class="q-title" onclick="toggleQ(this)">Phần đang học <span>▼</span></div>
    <div class="q-options">
        <input 
            class="study-input"
            placeholder="VD: Bài 4 Chương 2"
            value="${data.part||""}"
            oninput="setStudy('${name}','part',this.value)"
        />
    </div>
</div>

<div class="q-box">
    <div class="q-title" onclick="toggleQ(this)">Trình độ <span>▼</span></div>
    <div class="q-options">
        ${[
            "Không hiểu",
            "Hiểu sơ sơ",
            "Hiểu gần hết",
            "Hiểu tất cả"
        ].map(l=>`
        <div class="opt ${data.level==l?"active":""}" 
        onclick="setStudy('${name}','level','${l}',this)">
        ${l}
        </div>
        `).join("")}
    </div>
</div>

<div class="action-btn start-btn" onclick="startCourse('${name}')">
🚀 BẮT ĐẦU KHÓA HỌC
</div>
`;

showBackStudy();
});
}

function toggleQ(el){
    const box = el.nextElementSibling;
    box.classList.toggle("open");
}

function setStudy(sub,key,val,el){

    let data = JSON.parse(localStorage.getItem("study_"+sub) || "{}");
    data[key]=val;
    localStorage.setItem("study_"+sub, JSON.stringify(data));

    // nếu click từ option thì highlight đúng nhóm
    if(el){

        // tìm khối q-options chứa option đó
        const group = el.closest(".q-options");

        // chỉ xoá active trong nhóm này thôi
        group.querySelectorAll(".opt").forEach(o=>o.classList.remove("active"));

        // bật active cho option đang chọn
        el.classList.add("active");
    }
}

function startCourse(sub){
  currentSubject = sub;

    confirmStartCourse(sub,()=>{

        // đánh dấu đã bắt đầu học
        let data = JSON.parse(localStorage.getItem("study_"+sub) || "{}");
        data.started=true;
        localStorage.setItem("study_"+sub, JSON.stringify(data));

        // chuyển sang trang học của môn
        openLearning(sub);   // <-- hàm này ông sẽ dùng cho giao diện học
    });

}

function openLearning(sub){
currentSubject = sub;
    smoothChange(()=>{

        contentArea.innerHTML=`
        <h2>📚 ${sub}</h2>

        <div class="card" onclick="openTheory('${sub}')">
            📖 Lý thuyết
        </div>

        <div class="card" onclick="openPractice('${sub}')">
            ✏️ Bài tập
        </div>

        <div class="card" onclick="openTest('${sub}')">
            🧪 Kiểm tra
        </div>

        <div class="action-btn reset-lesson-btn" onclick="confirmResetLesson('${sub}')">
            ↪️ Reset bài học
        </div>
        `;

        showBackStudy();
    });
}

function learnLesson(sub, lesson){

    saveProgress(sub, lesson);   // 👈 lưu tiến trình

    contentArea.innerHTML = `
    <h2>${sub} - ${lesson}</h2>

    <div class="card">
        Nội dung bài học đang hiển thị ở đây
    </div>

    <div class="card" onclick="openLearning('${sub}')">
        ← Quay lại danh sách bài
    </div>
    `;
}

function confirmStartCourse(sub,callback){

    const modal=document.createElement("div");
    modal.className="confirm-modal";

    modal.innerHTML=`
    <div class="confirm-box">
        <div class="confirm-title">Bắt đầu khóa học?</div>
        <div class="confirm-text">
        HYDRA sẽ tạo lộ trình học cho <b>${sub}</b> dựa trên thiết lập của bạn.
        </div>

        <div class="confirm-actions">
            <button class="btn-no">Hủy</button>
            <button class="btn-yes">Bắt đầu</button>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".btn-no").onclick=()=>modal.remove();

    modal.querySelector(".btn-yes").onclick=()=>{
        modal.remove();
        if(callback) callback();
    };

    modal.onclick=e=>{
        if(e.target===modal) modal.remove();
    };
}


// Lưu tiến trình
function saveProgress(subject, lesson){
  const progress = JSON.parse(localStorage.getItem("progress") || "{}");
  progress[subject] = lesson;
  localStorage.setItem("progress", JSON.stringify(progress));
}

// Lấy tiến trình
function loadProgress(subject){
  const progress = JSON.parse(localStorage.getItem("progress") || "{}");
  return progress[subject] || null;
}

function confirmResetLesson(sub){

    const modal=document.createElement("div");
    modal.className="confirm-modal";

    modal.innerHTML=`
    <div class="confirm-box">
        <div class="confirm-title">Reset bài học?</div>
        <div class="confirm-text">
        Tiến trình học của <b>${sub}</b> sẽ bị xoá và quay về ban đầu.
        </div>

        <div class="confirm-actions">
            <button class="btn-no">Huỷ</button>
            <button class="btn-yes">Reset</button>
        </div>
    </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".btn-no").onclick=()=>modal.remove();

    modal.querySelector(".btn-yes").onclick=()=>{
        localStorage.removeItem("study_"+sub);   // xoá thiết lập
        localStorage.removeItem("progress");     // xoá tiến trình
        modal.remove();
        openSubject(sub); // quay lại setup
    };

    modal.onclick=e=>{
        if(e.target===modal) modal.remove();
    };
}

function openTheory(sub){
    const data = subjectData[sub];

    smoothChange(()=>{

        const theoryHTML = Object.values(data.theory).map(t=>{

            let content = "";

            if(t.content) content = t.content.join("<br>");
            if(t.points) content = t.points.join("<br>");
            if(t.list) content = t.list.join("<br>");

            if(t.steps){
                content = t.steps.map(s=>
                    `<b>Bước ${s.step}:</b> ${s.name}<br>${s.desc}`
                ).join("<br><br>");
            }

            if(t.math){
                content = `<div class="math">${t.math}</div>` + content;
            }

            return `
                <div class="card">
                    <b>${t.title}</b><br><br>
                    ${content}
                </div>
            `;
        }).join("");

        contentArea.innerHTML=`
            <h2>📖 Lý thuyết - ${sub}</h2>
            ${theoryHTML}

            <div class="card" onclick="openLearning('${sub}')">
                ← Quay lại
            </div>
        `;

        showBackStudy();
    });
}

function openPractice(sub){
    const data = subjectData[sub];

    smoothChange(()=>{

        contentArea.innerHTML=`
        <h2>✏️ Bài tập - ${sub}</h2>

        ${data?.practice?.map(p=>`
        <div class="card">
            ${p.q}

            <div class="opt" onclick="this.nextElementSibling.style.display='block'">
                Xem đáp án
            </div>

            <div style="display:none;margin-top:8px;color:#8fffaa">
                Đáp án: ${p.a}
            </div>
        </div>
        `).join("") || `<div class="card">Chưa có bài tập</div>`}

        <div class="card" onclick="openLearning('${sub}')">
            ← Quay lại
        </div>
        `;

        showBackStudy();
    });
}

function openTest(sub){
    const data = subjectData[sub];

    smoothChange(()=>{

        contentArea.innerHTML=`
        <h2>🧪 Kiểm tra - ${sub}</h2>

        ${data?.test?.map(t=>`
        <div class="card">
            ${t.q}

            ${t.choices.map((c,i)=>`
                <div class="opt" onclick="checkAnswer(this,${i===t.correct})">
                    ${c}
                </div>
            `).join("")}
        </div>
        `).join("") || `<div class="card">Chưa có đề kiểm tra</div>`}

        <div class="card" onclick="openLearning('${sub}')">
            ← Quay lại
        </div>
        `;

        showBackStudy();
    });
}