
let createModal = document.getElementById('CreateModal');
let closeModal = document.getElementById('close-btn');
let openModal = document.getElementById('create');

openModal.addEventListener('click',()=>{
    removeValidate();
    createModal.classList.add('active');
});
closeModal.addEventListener('click',()=>{
        createModal.classList.remove('active');
        removeValidate();
});




