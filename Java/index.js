let productName=document.getElementById("Name")
let productprice=document.getElementById("Price")
let productcategory=document.getElementById("Category")
let productDescription=document.getElementById("description")
var myRow=document.getElementById("myRow")
var myBtn=document.getElementById("myBtn")
let productsList
var updatedIndex



if(localStorage.getItem("productInfo"))
{
    productsList=JSON.parse(localStorage.getItem("productInfo"))
    display(productsList)
}
else
{
    productsList=[]
}

function addProduct () {
     // Check if all inputs are filled
     if (productName.value.trim() === "" || 
     productprice.value.trim() === "" || 
     productcategory.value.trim() === "" || 
     productDescription.value.trim() === "") {
     alert("Please fill in all fields before adding a product.");
     return;
 }
    if(myBtn.innerHTML=="Add")
    {

        var prdoducts = {
          Name: productName.value,
          price: productprice.value,
          cat: productcategory.value,
          des: productDescription.value,
        };
    productsList.push(prdoducts);

       
    }
    else if(myBtn.innerHTML==="Update")
    {
        //the values saved but still not displaying
        productsList[updatedIndex].Name=productName.value
        productsList[updatedIndex].price=productprice.value
        productsList[updatedIndex].des=productDescription.value
        productsList[updatedIndex].cat=productcategory.value
        console.log("update");
        console.log(productsList);
        myBtn.innerHTML="Add"

    }
    display(productsList);
    addtoLocalStorage()
    clearValues()

};

function addtoLocalStorage()
{
    localStorage.setItem("productInfo", JSON.stringify(productsList))
}

function clearValues()
{
    productName.value=''
    productprice.value=''
    productcategory.value=''
    productDescription.value=''
}

function removeProd(index)
{
    productsList.splice(index, 1);
    display(productsList);
    addtoLocalStorage()
}
function updateProd (index) 
{ 
    updatedIndex=index
    console.log(productsList[updatedIndex]);
    productName.value=productsList[index].Name
    productprice.value=productsList[index].price
    productcategory.value=productsList[index].cat
    productDescription.value=productsList[index].des
    console.log("update");
    console.log(updatedIndex);
    myBtn.innerHTML="Update"

 }
 document.addEventListener('keydown',function(e)
{
    if(e.key==="Enter")
    {
        addProduct()
    }
})
function display(plist)
{
    let cartona = ''
    for (let i = 0; i < plist.length; i++) {
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${plist[i].Name}</td>
            <td>${plist[i].price}</td>
            <td>${plist[i].cat}</td>
            <td>${plist[i].des}</td>
            <td><button class="btn btn-outline-danger" onclick="removeProd(${i})">Delete</button></td>
            <td><button class="btn btn-outline-warning"onclick="updateProd(${i})">Update</button></td>
        </tr>
        `;
    }
    myRow.innerHTML = cartona
}

function priceValidation()
{
    let regex=/^[0-9]{1,}$/
    if(regex.test(productprice.value))
    {
        productprice.classList.add('is-valid')
        productprice.classList.remove('is-invalid')
        $("#priceError").removeClass('d-block').addClass('d-none');
        return true
    }
    else
    {
        productprice.classList.add('is-invalid')
        productprice.classList.remove('is-valid')
        $("#priceError").removeClass('d-none').addClass('d-block');
        return false
    }
}
