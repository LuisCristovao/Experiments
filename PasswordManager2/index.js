//constants----
const body = getElement("body")
const pages = {
    "": createHomePage,
    "?Manage-Passwords": createManagePasswordsPage,
    "?Import-Text-Passwords": createImportPasswordsPage,
    "?Change-Master-Password": createChangeMasterPassPage,
    "?Export-Passwords":createExportPassPage
}

function createManagePasswordsPage() {
    getHtml("managePasswords.html")
    
}
function createExportPassPage(){
    
}
function createImportPasswordsPage() {
    getHtml("importPasswords.html")
    
}

function createChangeMasterPassPage() {
    getHtml("home.html")
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
