const manager_pass = getElement("pass")
let search = getElement("search password")
const password_list = getElement("passwords_list")

//manager_pass.setAttribute("oninput","getList()")


function getList() {
    if(manager_pass.value==""){
        password_list.innerHTML="No password inserted!"
    }else{
        db = getDB(manager_pass.value)
        if(db.length==0){
            password_list.innerHTML="Empty or Wrong password"
        }else{
            let html = ""
            db.forEach((row,id) => {
                //
                html += `<div id="${id}" class="pass_list">`
                html += `<h3>${row.site}</h3>`
                html += `<p>${row.description}</p>`
                html += `<button onclick="passwordMenu(${id})">Open</button>`
                html += `</div>`
            })
            password_list.innerHTML = html
        }
        
    }
    
}
function CloseMenu(btn){
  let parent=btn.parentElement
  parent.parentElement.removeChild(parent)
}


function Edit(btn,id){
   
    let username= document.getElementsByName("Username")[0]
    let password = document.getElementsByName("Password")[0]
    let site= document.getElementsByName("site")[0]
    let description = document.getElementsByName("description")[0]
   if(btn.innerHTML=="Edit"){
    username.style.height="20px"
    username.style.opacity="100"
    username.style.border="solid 1px white"
    password.style.height="20px"
    password.style.opacity="100"
    password.style.border="solid 1px white"
    btn.innerHTML="Submit"
    //btn.setAttribute("onclick","showUserPass(this)")
   }else{
       if(btn.innerHTML=="Submit"){
        username.style.height="0px"
        username.style.opacity="0"
        username.style.border=""
        password.style.height="0px"
        password.style.opacity="0"
        password.style.border=""
            btn.innerHTML="Edit"
            let db_line={"site":site.value,"description":description.value,"user":username.value,"pass":password.value}
            updateDB(db_line,id,manager_pass.value)
           // btn.setAttribute("onclick","showUserPass(this)")
       }
   }
   
}
function Delete(id){
    if(confirm("Are you sure?")){
        deleteDB(id,manager_pass.value)
    }
}
function checkIfUserAndPassIsEmpty(){
    let username= document.getElementsByName("Username")[0]
    let password = document.getElementsByName("Password")[0]
    if(username.value=="" && password.value==""){
        username.style.height="20px"
        username.style.opacity="100"
        username.style.border="solid 1px white"
        password.style.height="20px"
        password.style.opacity="100"
        password.style.border="solid 1px white"
    }
}
function show_password_info(show_data,id){
    
   let html=`<button class="btn" style="font-size: 3em;" onclick="CloseMenu(this)" >&lt;</button>`
    html+=`<div align="center">`
    html+=`<input name="site" style="background:transparent;border:solid white 2px;color:white;font-size:3em;width:50%" text-align="right" value="${show_data.site}" placeholder="site/page ..."><br>`
    html+=`<textarea name="description" style="background:transparent;border:solid white 2px;color:white;font-size:3em;width:50%" text-align="right" placeholder="Description ..." >${show_data.description}</textarea><br>`
    html+=`<button onclick="Copy(this.innerText,this)">Username</button><br>`
    html+=`<input name="Username" style="height:0px;color:white;background:transparent;border:none;opacity:0" value="${show_data.user}" placeholder="username"><br>`
    html+=`<button onclick="Copy(this.innerText,this)">Password</button><br>`
    html+=`<input name="Password" style="height:0px;color:white;background:transparent;border:none;opacity:0" value="${show_data.pass}" placeholder="password"><br>`
    html+=`<button onclick="Edit(this,${id})">Edit</button>&nbsp;&nbsp;<button onclick="Delete(${id})">Delete</button>`
    html+="</div>"
    
    return html
    
}
function Copy(user_pass,btn){
    let input=document.getElementsByName(user_pass)[0]
    input.select()
    document.execCommand("Copy")
    btn.innerHTML="Copied "+user_pass+" !"
    setTimeout(()=>{btn.innerHTML=user_pass},1000)
}
function passwordMenu(id){
    let decrypt_db=getDB(manager_pass.value)
    let db_line=decrypt_db[id]
    let div=document.createElement("div")
    div.style.position="absolute"
    div.style.top="100px"
    div.style.width="100%"
    div.style.top="0px"
    div.style.height="100%"
    div.style.margin="0px"
    div.style.padding="0px"
    div.style.background="#232323"
    div.style.border="solid white 2px"
    div.style["z-index"]="20"
    div.innerHTML+=show_password_info(db_line,id)
    body.appendChild(div)
}

function addNewPass(){
    let decrypt_db=getDB(manager_pass.value)
    let div=document.createElement("div")
    div.style.position="absolute"
    div.style.top="100px"
    div.style.width="100%"
    div.style.top="0px"
    div.style.height="100%"
    div.style.margin="0px"
    div.style.padding="0px"
    div.style.background="#232323"
    div.style.border="solid white 2px"
    div.style["z-index"]="20"
    div.innerHTML+=show_password_info(emptyDbLine(),decrypt_db.length)
    body.appendChild(div)
    //change Edit button to submit by finding in div children
    checkIfUserAndPassIsEmpty()
}
//Main----------
getList()