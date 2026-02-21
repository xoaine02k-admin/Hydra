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

function showBack(){
    footerContainer.innerHTML=
    `<div class="back-btn" onclick="loadHome()">← Trang chủ</div>`;
}

function showBackStudy(){
    footerContainer.innerHTML=
    `<div class="back-btn" onclick="loadStudy()">← Học tập</div>`;
}

function hideBack(){
    footerContainer.innerHTML="";
}