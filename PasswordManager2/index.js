//constants----
const body = getElement("body")
const pages = {
    "": createHomePage,
    "?manage": createManagePasswordsPage,
    "?import": createImportPasswordsPage,
    "?change": createChangeMasterPassPage
}

function createManagePasswordsPage() {

}

function createImportPasswordsPage() {

}

function createChangeMasterPassPage() {

}

function PageWithHeightRatio() {
    // 1 is equal size; >1 bigger width else the contrary
    return body.offsetWidth / body.offsetHeight
}
async function getHtml(filename) {
    let response = await fetch(filename);
    let val = await response.text();
    body.innerHTML = val
}

function createHomePage() {
    getHtml("home.html")
    setTimeout(() => {
        var script_el = document.createElement("script")
        script_el.src = 'home.js'
        document.body.appendChild(script_el)
    }, 500)
    //    body.innerHTML=getHtml()
    //    var page = ""
    //    page+=`<div align="center" style="width:100%;height:100%;">`
    //    page += `<ul style="list-style-type:none;padding:10%;">`
    //    page += `<li style="padding:5%;font-size:2em">Manage Passwords</li>`
    //    page += `<li>Change Master Password</li>`
    //    page += `<li>Import Passwords from Text</li>`
    //    page += `</ul>`
    //    page+=`</div>`
    //    body.innerHTML = page
}
//functions----
function getElement(id) {
    return document.getElementById(id)
}

function init() {
    const url = window.location.search
    if (url in pages) {
        pages[url]()
    } else {
        //go to homepage
        pages[""]()
    }

}
//main----

window.onload = init()
