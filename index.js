let urlInstance=axios.create({
    baseURL:"https://crudcrud.com/api/1e7a486944e5464a85e82ed4724e4ae1"
})
function addBill(event){
    event.preventDefault()
    let details={
        dish:event.target.recipe.value,
        price:event.target.price.value,
        table:event.target.table.value,
    }

    urlInstance.post("/orders",details)
    .then((res)=>{
        event.target.recipe.value=""
        event.target.recipe.value=""
        event.target.recipe.value=""
        addOrder(res.data)
    })
    .catch(err=>{console.log(err)})

}
function addOrder(details){
    let ul
    if(details.table==="Table 1"){
        ul=document.getElementById("orders1")
    }
    else if(details.table=="Table 2"){
        ul=document.getElementById("orders2")
    }else{
        ul=document.getElementById("orders3")
    }
    let li=document.createElement('li')
    li.id=`${details._id}`
    li.innerHTML=`<p class="myorder">${details.dish}-${details.price}</p>
    <button class="deleteOrder" onclick="deleteOrder(event)">Delete</button>`
    ul.appendChild(li)
}
window.addEventListener("DOMContentLoaded",function(){
    urlInstance.get("/orders")
    .then((res)=>{
        for(let data in res.data){
            addOrder(res.data[data])
        }
    })
    .catch((err)=>{console.log(err)})
})
function deleteOrder(event){
    let id=event.target.parentElement.id
    urlInstance.delete(`/orders/${id}`)
    .then((res)=>{
        event.target.parentElement.remove()
    })
    .catch((err)=>{
        console.log(err)
    })
}