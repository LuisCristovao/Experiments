const manager_pass = getElement("pass")
let search = getElement("search password")
const password_list = getElement("passwords_list")
//const columns = ["site", "user", "pass", "description"]





// function EncryptDB(db){
//     let db_string=""
//     db.map(db_line=>{
        
//         for(key in db_line){
//             db_line[key]=encrypt(db_line[key],manager_pass.value)
//         }
//         return encrypt(JSON.stringify(db_line),manager_pass.value)+'\n'
//     })
//     localStorage["PM"]=db.reduce((acc,n)=>{acc+'\n'+n})

// }
function getPasswordInfo(){
    db = localStorage["PM"]
    if(db==null){
        return null
    }
    else{
        decrypt_db=[]
        db.split("\n").forEach(row=>{
            let decrypt_line={}
            let row_json = JSON.parse(decrypt(row, manager_pass.value))
            for(key in row_json){
                decrypt_line[key]=decrypt(row_json[key],manager_pass.value)
            }
            decrypt_db.push(decrypt_line)
        })
        return decrypt_db
    }
    

}


function getList() {
    db = getDB(manager_pass.value)
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
            
            btn.innerHTML="Edit"
            let db_line={"site":site.value,"description":description.value,"user":username.value,"pass":password.value}
            updateDB(db_line,id,manager_pass.value)
           // btn.setAttribute("onclick","showUserPass(this)")
       }
   }
   
}
function show_password_info(show_data,id){
    
   let html=`<button class="btn" style="font-size: 3em;" onclick="CloseMenu(this)" >&lt;</button>`
    html+=`<div align="center">`
    html+=`<input name="site" style="background:transparent;border:none;color:white;font-size:3em;width:50%" text-align="right" value="${show_data.site}"><br>`
    html+=`<textarea name="description" style="background:transparent;border:none;color:white;font-size:3em;width:50%" text-align="right" >${show_data.description}</textarea><br>`
    html+=`<button onclick="Copy(this.innerText,this)">Username</button><br>`
    html+=`<input name="Username" style="height:0px;color:white;background:transparent;border:none;opacity:0" value="${show_data.user}"><br>`
    html+=`<button onclick="Copy(this.innerText,this)">Password</button><br>`
    html+=`<input name="Password" style="height:0px;color:white;background:transparent;border:none;opacity:0" value="${show_data.pass}"><br>`
    html+=`<button onclick="Edit(this,${id})">Edit</button>&nbsp;&nbsp;<button>Delete</button>`
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
//Main----------
