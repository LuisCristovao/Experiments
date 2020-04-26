const manager_pass=getElement("pass")
let search=getElement("search password")
const password_list=getElement("passwords_list")
const columns = ["site", "user", "pass", "description"]
function getList(){
    db=localStorage["PM"]
    let html=""
    db.split("\n").forEach(row=>{
        let row_json=JSON.parse(decrypt(row,manager_pass.value))
        html+=`<div class="pass_list">${decrypt(row_json["site"],manager_pass.value)}</div>`
    })
    password_list.innerHTML=html
}
//Main----------