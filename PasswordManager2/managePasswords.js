const manager_pass = getElement("pass")
let search = getElement("search password")
const password_list = getElement("passwords_list")
const columns = ["site", "user", "pass", "description"]

function getList() {
    db = localStorage["PM"]
    let html = ""
    db.split("\n").forEach(row => {
        let row_json = JSON.parse(decrypt(row, manager_pass.value))
        html += `<div class="pass_list">`
        html += `<h3>${decrypt(row_json["site"],manager_pass.value)}</h3>`
        html += `<p>${decrypt(row_json["description"],manager_pass.value)}</p>`
        html += `<button onclick="passwordMenu()">Open</button>`
        html += `</div>`
    })
    password_list.innerHTML = html
}

function passwordMenu(){
    let div=document.createElement("div")
    div.style.position="absolute"
    div.style.top="100px"
    div.style.width="100%"
    div.style.background="#232323"
    div.style.border="solid white 2px"
    div.style["z-index"]="20"
    div.innerHTML=`<h1 align="center">New Menu</h1>`
    body.appendChild(div)
}
//Main----------
