overlay.addEventListener("click", ()=>{
    closeMenu();
});

function toggleMenu(){
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
}

function closeMenu(){
    menu.classList.remove("active");
    overlay.classList.remove("active");
}

function menuAction(action){
    closeMenu();
    setTimeout(action,10);
}