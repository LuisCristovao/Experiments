let page_body = document.getElementById("blog_body")

let index = document.getElementById("blog_index")
var hs = {
    "H1": "H1",
    "H2": "H2",
    "H3": "H3",
    "H4": "H4",
    "H5": "H5",
    "H6": "H6"
}
let titels_subtitles_order = [{
    "type": "h1",
    "value": "sssas",
    "sub": [{
        "type": "h2",
        "value": "asjsa",
        "sub": [{
            "type": "h3",
            "value": "sssas",
            "sub": []
            }]
        }]
    }, {
    "type": "h1",
    "value": "sssas",
    "sub": [{
        "type": "h2",
        "value": "asjsa",
        "sub": [{
            "type": "h3",
            "value": "sssas",
            "sub": []
            }]
        }]
    }]
//functions-----------------------------------------------------
async function getPages() {
    let response = await fetch('SiteFolder/DB/pages.json');
    let val = await response.json();
    return val
}

function createIndex() {
    let elements = Array.from(page_body.children)
    let headers = elements.filter(el => hs[el.nodeName] != null)
    headers.forEach(el => {
        console.log(el.nodeName)
        el.setAttribute("id", el.innerText.replaceAll(" ", "-"))
    })


    var html = "<ul>"
    headers.filter(el => el.nodeName == "H1").forEach((el, index) => {
        html += `<li class="blog_li"><a href="#${el.innerText.replaceAll(" ","-")}">${el.innerText}</a></li>`
    })
    html += "</ul>"
    index.innerHTML = html

}
async function getHtml(filename) {
    let response = await fetch(filename);
    let val = await response.text();
    $("#blog_body").html(val)
}
async function loadPageContent() {
    let pages = await getPages()
    getHtml(pages[window.location.search]["page content"])
}

function init() {
    //Create Index for page
    //var hide_show_index_btn=document.getElementById("hide_show_index_btn")
    $("#hide_show_index_btn").click(() => {
        $("#blog_index").toggle("fast")
    })
    
    loadPageContent()
    
}
//main---------------------

init()
setTimeout(createIndex,500)