var ProductNameInput = document.getElementById("productName");
var ProductPriceInput = document.getElementById("productPrice");
var ProductCatInput = document.getElementById("productCat");
var ProductDescInput = document.getElementById("productDesc");
var addBtn =document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");

var temp;
var productList =[];



if (localStorage.getItem("product") !=null){
     productList= JSON.parse(localStorage.getItem("product"));
     productDisplay(productList);
}
function addProduct(){
    var uniqeId =  (new Date()).getTime();
    if(validateProductName()==true && validaetProductPrice()==true
    &&validateProductCat()==true && validateProductDesc()==true){

    var product = {
        pName :ProductNameInput.value,
        price:ProductPriceInput.value,
        Category:ProductCatInput.value,
        description :ProductDescInput.value,
        id:uniqeId
    }
productList.push(product);

localStorage.setItem ("product",JSON.stringify(productList));

productDisplay(productList);
clearForm();
    }
}

function productDisplay(list){
    var cartona=``;
    for(var i=0;i<list.length;i++){
      
   
        cartona += ` <tr>
        <td>${i+1}</td>
        <td>${list[i].newName ? list[i].newName:list[i].pName} </td>
        <td>${list[i].price}</td>
        <td>${list[i].Category}</td>
        <td>${list[i].description}</td>
    
        <td><button onclick ="setFormForUpdate(${i})"  class="btn btn-warning btn-sm">Update</button></td>
        <td><button  onclick="deleteProduct(${list[i].id})" class="btn btn-danger btn-sm" >Delete</button></td>
    </tr>`

    }
document.getElementById("display").innerHTML=cartona;

}

function clearForm(){
    ProductNameInput.value="";
    ProductPriceInput.value="";
    ProductCatInput.value="";
    ProductDescInput.value="";
}                           
function deleteProduct(productId){
    for(var i =0; i<productList.length;i++){
        if(productList[i].id==productId){
            productList.splice(i,1);
            localStorage.setItem ("product",JSON.stringify(productList));

            productDisplay(productList);
      
        }    
    }

}

function searchProducts(term){
 var searchList=[];
    for(var i =0;i<productList.length;i++){
        if(productList[i].pName.toLowerCase().includes(term.toLowerCase())==true){
            productList[i].newName =
            productList[i].pName.toLowerCase().replace(term.toLowerCase(),`<span class="text-danger">${term}</span>`);
            searchList.push(productList[i]);
        }
    }
    productDisplay(searchList);
}
function setFormForUpdate(index){
addBtn.classList.replace("d-block","d-none");
updateBtn.classList.replace("d-none","d-block");
ProductNameInput.value=productList[index].pName;
ProductPriceInput.value=productList[index].price;
ProductCatInput.value=productList[index].Category;
ProductDescInput.value=productList[index].description;
temp = index;

}

function updateProduct(){
    if(validateProductName()==true && validaetProductPrice()==true
    &&validateProductCat()==true && validateProductDesc()==true){
   var product = {
        pName :ProductNameInput.value,
        price:ProductPriceInput.value,
        Category:ProductCatInput.value,
        description :ProductDescInput.value
    }
    productList[temp] = product;
    addBtn.classList.replace("d-none","d-block");
updateBtn.classList.replace("d-block","d-none");
    localStorage.setItem ("product",JSON.stringify(productList));
    productDisplay(productList);
    clearForm();
    }
 
 }


// validation///
function validateProductName(){
    var regex= /^[A-Z][a-z]{2,8}$/;
    if(regex.test(ProductNameInput.value)==true){
        ProductNameInput.style.border = "none";
        document.getElementById("wrongName").classList.add("d-none");
        return true;
    }else{
        ProductNameInput.style.border="5px solid red";
        document.getElementById("wrongName").classList.remove("d-none");
        return false;
        
    }
}
function validaetProductPrice(){
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if(regex.test(ProductPriceInput.value)==true){
        ProductPriceInput.style.border = "none";
        document.getElementById("wrongPrice").classList.add("d-none");

        return true;
    }else{
        ProductPriceInput.style.border="5px solid red";
        document.getElementById("wrongPrice").classList.remove("d-none");
        return false;
    }
}

function validateProductCat(){
    var regex =/^(laptob|mobil|tv)$/mgi;
    if(regex.test(ProductCatInput.value)==true){
        ProductCatInput.style.border="none";
         document.getElementById("wrongCategory").classList.add("d-none");
        return true;
    }else{
        ProductCatInput.style.border="5px solid red";
        document.getElementById("wrongCategory").classList.remove("d-none");
        return false;
    }
}

function validateProductDesc(){
    var regex =/^[a-z0-9]{25,200}$/mgi;
    if(regex.test(ProductDescInput.value)==true){
        ProductDescInput.style.border="none";
        document.getElementById("wrongDesc").classList.add("d-none");
        return true;
    }else{
        ProductDescInput.style.border="5px solid red";
        document.getElementById("wrongDesc").classList.remove("d-none");
        return false;
    }
}

