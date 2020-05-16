let password_import = getElement("password_import")
let data = getElement("data")
let split_data = getElement("spliting character")
//import {csvToDB} from db.js
function ImportEncryptedDB(){
    let html=getElement("importPasswords").innerHTML
    html+=`<br>`
    html+=`<textarea></textarea><br>`
    html+=`<button onclick="ImportEncrypted()">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function ImportDecryptedCSV(){
    let html=getElement("importPasswords").innerHTML
    html+=`<p>Insert text Passwords like |Site|UserName|Password|Description| in textarea.</p>`
    html+=`<p>Each line must be a new site password.</p><br>`
    html+=`Password use to encrypt:<input id="password_import" type="password"><input type="checkbox">show password<br><br>`
    html+=`Data splitting character:<input id="spliting character" type="text" value=","><br>`
    html+=`<textarea id="data"></textarea>`
    html+=`<button onclick="Import()">Import</button>`
    getElement("importPasswords").innerHTML=html
}
function Import() {

    
    csvToDB(data,password_import.value)
    data.value = "Imported passwords and encrypted them!"
}
function ImportEncrypted(){
    let edb=document.getElementsByTagName("textarea")[0]
    writeDB(edb.value)
    edb.value="Imported wit success!"
}