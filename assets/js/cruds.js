// -------------- inputs --------------
let title = document.getElementById('title');
let price = document.getElementById('price');
let tasks = document.getElementById('tasks');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let category = document.getElementById('category');
let total = document.getElementById('total');
// -------------- btns --------------
let formBtn = document.getElementById('formBtn');
let clearContent = document.getElementById('clear-content');
let clearBtn = document.getElementById('clear');

// -------------- table--------------
let tbody = document.querySelector('tbody');
let contentTable = document.querySelector('table');
let tableContainer = document.querySelector('.table');
let empty = document.querySelector('.empty');
// -------------- Search items--------------
let searchInput = document.getElementById('search');
let searchBtn = document.getElementById('searchbtn');
let formTitle = document.getElementById('form-title');

let elementIndex = 0;
let mood = 'create';

// -------------- Create Procducts--------------
formBtn.addEventListener('click',()=>{
    validateOnSubmit();
    if(isValidate){
        ProductForm();
        clearInputs();
        getTotal();
        closeFormModal();
        getAllProducts();
        CheckProdcuts();
    }
})

// product list
let products;
if(localStorage.products != null){
    products = JSON.parse(localStorage.products);
}else{
    products = [];
}

//Product form
function ProductForm(){
    let product = {
        title: title.value,
        price: price.value,
        ads : ads.value,
        tasks : tasks.value,
        discount : discount.value,
        total : total.innerHTML,
        category: category.value,
    };

    if(mood === "update"){
        products[elementIndex] = product;
        formBtn.innerHTML = 'Create';
        formTitle.innerHTML = 'Create new product';
        mood = "create";

    }else{
        products.push(product);
    }
    localStorage.setItem('products',JSON.stringify(products));
}


// -------------- Get All Products --------------
getAllProducts();
function getAllProducts(){
    let table = '';
    if(products.length > 0){
        for(let i = 0; i< products.length; i++){
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>$${products[i].price}</td>
                <td class="tasks">$${products[i].tasks}</td>
                <td class="discount">$${products[i].discount}</td>
                <td class="ads">$${products[i].ads}</td>
                <td class="total">$${products[i].total}</td>
                <td class="category">${products[i].category}</td>
                <td class="action-btns">
                    <button class="action" id="open-action" onclick="openActionModel()">action</button>
                    <div id="action-model">
                        <div class="action-modal">
                            <button class="close" id="close-action" onclick="closeActionModal()"><i class="bi bi-x"></i></button>
                            <button id="update" onclick="openUpdateModal(${i})"><i class="bi bi-pen"></i><span>Update</span></button>
                            <button id="delete" onclick="openDeleteModal(${i})" ><i class="bi bi-trash"></i><span>Delete</span></button>
                        </div>
                    </div>
                </td>
            </tr>
            `;
        }
        contentTable.style.display = 'block';
        empty.style.display = 'none';
        tbody.innerHTML = table;
    }else{
        contentTable.style.display = 'none';
        empty.style.display = 'block';
    }
}

// -------------- Delete one Product --------------
let deleteBtn = document.getElementById('deletebtn');
deleteBtn.addEventListener('click',()=>{
    deleteModal();
    closeDeleteModal();
    getAllProducts();
    CheckProdcuts();
})

// -------------- Delete All Products --------------

clearBtn.addEventListener('click',()=>{
    deleteAll();
});
// delete all function
function deleteAll(){
    products.splice(0);
    localStorage.setItem('products',JSON.stringify(products));
    clearContent.style.display = 'none';
    getAllProducts();
}
CheckProdcuts();
function CheckProdcuts(){
    if(products.length > 0){
        clearContent.style.display = 'block';
        clearBtn.innerHTML = `Clear All (${products.length})`
    }else{
        clearContent.style.display = 'none';
    }
}
// -------------- Clear all inputs  --------------
function clearInputs(){
    formInputs.forEach(e=>{
        e.value = '';
    })
}

// -------------- Get total price --------------
getTotal();
function getTotal(){
    if(price.value === ''){
        if(total.classList.contains('valid')){
            total.classList.remove('valid');
            total.innerHTML =0;
        }
    }else{
        total.innerHTML = (+price.value + +ads.value + +tasks.value) - +discount.value;
        total.classList.add('valid');
    }
}


// -------------- Search for prodcut by name or category --------------
let searchbtn = document.querySelector('#searchbtn');
searchBtn.addEventListener('click',()=>{
    searchValidate();
    if(isValidate){
        search();
    }else{
        console.log('not don')
    }
    removeValidate();
})

// search method
function search(){
    let table = '';
    if(products.length > 0){
        for(let i = 0; i< products.length; i++){

            if(products[i].title.includes(searchInput.value)){
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>$${products[i].price}</td>
                <td class="tasks">$${products[i].tasks}</td>
                <td class="discount">$${products[i].discount}</td>
                <td class="ads">$${products[i].ads}</td>
                <td class="total">$${products[i].total}</td>
                <td class="category">${products[i].category}</td>
                <td class="action-btns">
                    <button class="action" id="open-action" onclick="openActionModel()">action</button>
                    <div id="action-model">
                        <div class="action-modal">
                            <button class="close" onclick="closeActionModal()" id="close-action"><i class="bi bi-x"></i></button>
                            <button id="update" onclick="openUpdateModal(${i})"><i class="bi bi-pen"></i><span>Update</span></button>
                            <button id="delete" onclick="openDeleteModal(${i})" ><i class="bi bi-trash"></i><span>Delete</span></button>
                        </div>
                    </div>
                </td>
            </tr>
            `;
            }else if(products[i].category.includes(searchInput.value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>$${products[i].price}</td>
                    <td class="tasks">$${products[i].tasks}</td>
                    <td class="discount">$${products[i].discount}</td>
                    <td class="ads">$${products[i].ads}</td>
                    <td class="total">$${products[i].total}</td>
                    <td class="category">${products[i].category}</td>
                    <td class="action-btns">
                        <button class="action" id="open-action" onclick="openActionModel()">action</button>
                        <div id="action-model">
                            <div class="action-modal">
                                <button class="close" onclick="closeActionModal()" id="close-action"><i class="bi bi-x"></i></button>
                                <button id="update" onclick="openUpdateModal(${i})"><i class="bi bi-pen"></i><span>Update</span></button>
                                <button id="delete" onclick="openDeleteModal(${i})" ><i class="bi bi-trash"></i><span>Delete</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                `;
            }
            tbody.innerHTML = table;
        }
    }
}


// -------------- inputs validation --------------

let inputs = document.querySelectorAll('.input');
let formInputs = document.querySelectorAll('.form .input');
// validate on write
validateInputs();
function validateInputs(){
    
    inputs.forEach((e)=>{
        e.onfocus = function(){
            e.onkeyup = function(){
                getTotal();
                if(this.value === ""){
                    this.classList.add('in-valid');
                }else if(this.value !== ""){
                    this.classList.remove('in-valid');

                    this.classList.add('valid');
                }
            }
        }
    });

}

// validate on submit
var isValidate;
function validateOnSubmit(){
    formInputs.forEach(ele=>{
        if(ele.value === ""){
            ele.classList.add('in-valid');
            isValidate = false;
        }else{
            ele.classList.add('valid');
            isValidate = true;
        }
    })
}

// -------------- Search validation --------------
searchValidate();
function searchValidate(){
    searchInput.onfocus =()=>{
        searchInput.oninput = ()=>{
            if(searchInput.value === ''){
                searchInput.classList.add('in-valid');
                isValidate = false;
                getAllProducts();
            }else{
                searchInput.classList.add('valid');
                searchInput.classList.remove('in-valid');
                isValidate = true;
            }
        }
    }
}

// -------------- remove validation after submit --------------
// ---- remove form validation ----
function removeValidate(){
    inputs.forEach((e)=>{
        if(e.classList.contains('valid')){
            e.classList.remove('valid');
        }else if(e.classList.contains('in-valid')){
            e.classList.remove('in-valid');
        }
    });
}
// ---- remove search validation ----
function removeSearchValidate(){
    if(searchInput.classList.contains('valid')){
        searchInput.classList.remove('valid');
    }else if(searchInput.classList.contains('in-valid')){
        searchInput.classList.remove('in-valid');
    }
}
// -------------- open / close modals --------------
let actionModel = document.getElementById('action-model');
let deleteModalForm = document.getElementById('DeleteModal');

function openFormModal(){
    removeValidate();
    createModal.classList.add('active')
}
function openActionModel(){
    actionModel.classList.add('active');
}

function closeActionModal(){
    actionModel.classList.remove('active');
}

function closeFormModal(){
    removeValidate();
    createModal.classList.remove('active');
}
function closeDeleteModal(){
    deleteModalForm.classList.remove('active')
}

function openUpdateModal(i){
    title.value = products[i].title;
    price.value = products[i].price;
    tasks.value = products[i].tasks;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    total.innerHTML = products[i].total;
    category.value = products[i].category;
    openFormModal();
    getTotal();
    elementIndex = i;
    formBtn.innerHTML = 'Update';
    formTitle.innerHTML = 'Update a product';
    mood = 'update';
}

function openDeleteModal(i){
    deleteModalForm.classList.add('active')
    elementIndex = i;
}

//delete method
function deleteModal(){
    products.splice(elementIndex,1);
    localStorage.setItem('products',JSON.stringify(products));
}




// -------------- Darck mood --------------

let darkBtn = document.getElementById('dark-btn');
let darkicon = document.querySelector('.js-dark-icon');
let lighticon = document.querySelector('.js-light-icon');
let td = document.querySelectorAll('td');
let modalDark = document.querySelector('.modal-dark');
let deleteDark = document.querySelector('.delete-dark');
let darlColor = document.querySelectorAll('.darl-color');

darkBtn.addEventListener('click',()=>{
    if(document.body.classList.contains('active-dark')){
        document.body.classList.remove('active-dark');
        deleteDark.classList.remove('active-dark');
        modalDark.classList.remove('active-dark');
        darkicon.classList.add('active');
        lighticon.classList.remove('active');
        td.forEach(e=>{
            e.style.color = '#001e00';
            console.log(e)
        })
        darlColor.forEach((e)=>{
            e.classList.remove('active-dark-color');
        })
    }else{
        document.body.classList.add('active-dark');
        deleteDark.classList.add('active-dark');
        modalDark.classList.add('active-dark');
        darkicon.classList.remove('active');
        lighticon.classList.add('active');
        td.forEach(e=>{
            e.style.color = '#5e6d55';
        })
        darlColor.forEach((e)=>{
            e.classList.add('active-dark-color');
        })
    }
})
