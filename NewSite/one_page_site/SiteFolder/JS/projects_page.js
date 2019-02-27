//Notes
//<div class="col-lg-4 col-sm-6 portfolio-item" style="margin-bottom: 20pt">
//          <div class="card " >
//            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
//            <div class="card-body">
//              <h4 class="card-title">
//                <a href="#">Project One</a>
//              </h4>
//              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellatfscfse ewfwef ewf wef wefwe fwefwsef sdcv er fwefwfweff fwefweawdwad d w wqdq wdqwd qwd qwd qw qwdqwd asdcwdwd </p>
//            </div>
//          </div>
//        </div>
//Global vars
var prev_scrollTop = 0
var db;
var loaded_projects = 0
//Global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/all_posts.json');
    let val = await response.json();
    return val
}

function jsonToHml(data) {
    var html = ""
    var val = data
    html += '<div class="col-lg-4 col-sm-6" style="margin-bottom: 20pt">'
    html += '<div class="card" >'
    html += '<a href="' + val["link"] + '"><img class="card-img-top" src="' + val["image url"] + '" alt=""></a>'
    html += '<div class="card-body">'
    html += '<h4 class="card-title">'
    html += '<a href="' + val["link"] + '">' + val["title"] + '</a>'
    html += '</h4>'
    html += '<p class="card-text">' + val["short description"] + '</p>'
    html += '</h4>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    return html
}

function fillGrid() {
    var grid = document.getElementById("projects_grid")
    data = db
    //alert(JSON.stringify(data))
    var html = ""
    for (index in data) {
        if (index < 9) {

            var val = data[index]
            html += jsonToHml(val)
        }
        loaded_projects++
    }
    grid.innerHTML = html

}

function loadMoreProjects() {

}

function detectScrollBottom() {

    if (prev_scrollTop != document.body.scrollTop) {
        prev_scrollTop = document.body.scrollTop
        if ((document.body.scrollTop + window.innerHeight) == document.body.scrollHeight) {
            alert("bottom!")
        }
    }

}
async function init() {


    db = await getDBPosts()

    fillGrid()
    setInterval(() => {
        detectScrollBottom()
    }, 100)

}
//main-----
init()