/* == Utils == */
function toggleScience(){
const box = document.getElementById("scienceBox");
if(!box) return;
box.style.display = box.style.display==="none" ? "block" : "none";
}

window.addEventListener("resize",resizeCanvas);

document.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
const input=document.getElementById("chatInput");
if(input && document.activeElement===input){
sendMsg();
}
}
});