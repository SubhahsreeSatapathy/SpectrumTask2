function setActive(){
    const lists=document.querySelectorAll('.header-links li a');
   
    lists.forEach((item)=>{
        item.addEventListener('click',()=>{
            lists.forEach(others=>{
                if(item==others) item.classList.add("active");
                else others.classList.remove("active");
            });
        });
    })
}
const name=document.querySelector('#name');
const phone=document.querySelector('#phone');

name.addEventListener('input',()=>{
    if(!(/^[a-z ,.'-]+$/i.test(name.value))){
        alert("Name field is not valid")
    }
})
phone.addEventListener('input',()=>{
    const IndNum = /^[0-9]+$/;
    if(!phone.value.match(IndNum) || phone.value.length > 10)  alert("Phone field is not valid")
});

function formValid(){
    if(!(/^[a-z ,.'-]+$/i.test(name.value))){
        alert("Name field is not valid")
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)){
        alert("Email field is not valid")
    }
}




setActive();
