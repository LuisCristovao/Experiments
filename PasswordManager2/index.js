//constants----
const body = getElement("body")
const pages = {
    "?Manage-Passwords": () => getHtml("managePasswords.html"),
    "?Import-Text-Passwords": () => getHtml("importPasswords.html"),
    "?Change-Master-Password": () => getHtml("changeMasterPass.html"),
    "?Export-Passwords": () => getHtml("exportPasswords.html")
}



function PageWithHeightRatio() {
    // 1 is equal size; >1 bigger width else the contrary
    return body.offsetWidth / body.offsetHeight
}
async function getHtml(filename) {
    let response = await fetch(filename);
    let val = await response.text();
    var el = document.createElement( 'DIV' );
    el.innerHTML=val
    body.appendChild(el)
    Array.from(el.getElementsByTagName( 'script' )).forEach(s => {
        const scriptEl = document.createElement("script")
        scriptEl.src = s.src
        document.body.appendChild(scriptEl)
    })
}

//functions----
function getElement(id) {
    return document.getElementById(id)
}
function goToInitialMenu(){
    window.location.search=""
}
function init() {
    const url = window.location.search
    const defaultPage = () => getHtml("home.html")
    if (url in pages) {
        pages[url]()
    } else {
        defaultPage()
    }
}
//main----

window.onload = init()
