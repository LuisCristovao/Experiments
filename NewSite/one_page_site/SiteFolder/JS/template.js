//------------------------------------------------
//global variables
var server;
var scroll;
//global functions
function Search(btn) {
    var parent = btn.parentElement
    var input = parent.children[0]
    window.location.search = input.value

}

function SearchKeyPress(event, input) {
    //press enter
    if (event.keyCode == 13) {
        var value = input.value
        window.location.search = input.value

    }

}
function scrollToTop(btn) {

        document.body.scrollTo(0, 0)
        btn.parentNode.removeChild(btn);
    }
//function to do at beginning
function Init() {
    server = new ServePages()
    scroll= new Scroll()
   
    requestAnimationFrame(server.run)
    requestAnimationFrame(scroll.detectScrollTopUnderNavBar)
}


//-------------------------------------------------------------------
//scroll class  controls navbar when scroll down and a button to scroll up
class Scroll {
    constructor() {
        this.navbar_visibility_point = 63
        this.nav = document.getElementById("navbar")
        this.detectScrollTopUnderNavBar=this.detectScrollTopUnderNavBar.bind(this);
    }

    
    screenHightBiggerThanWidth(){
        return (screen.availHeight>=screen.availWidth)
    }
     scrollBtnDimensions(){
        if (this.screenHightBiggerThanWidth()){
            return {"font-size":"2em","left":"92%"}
        }else{
            return {"font-size":"3em","left":"90%"}
        }
    }
    createScrollTopBtn() {

        if (document.getElementById("scrollToTopBtn") == null) {

            var body = document.body
            var div = document.createElement("div")
            body.appendChild(div)
            var height = document.body.scrollTop + window.innerHeight * 0.80;
            //console.log(height)
            var btn_dimensions=this.scrollBtnDimensions()
            div.setAttribute("style", "background-color:white;cursor:pointer;border-radius:25px;border:1px solid black;font-size:"+btn_dimensions["font-size"]+";color:blue;position:absolute;top:" + height + "px;left:"+btn_dimensions["left"]+";width:10%,height:10%;")
            div.setAttribute("id", "scrollToTopBtn")
            div.innerHTML = "^"
            div.setAttribute("onclick", "scrollToTop(this)")
        } else {
            var height = document.body.scrollTop + window.innerHeight * 0.80;
            //console.log(height)
            var btn = document.getElementById("scrollToTopBtn")
            btn.style.top = height + "px"
            var btn_dimensions=this.scrollBtnDimensions()
            btn.style.left=btn_dimensions["left"]
            btn.style["font-size"]=btn_dimensions["font-size"]
        }
    }
    detectScrollTopUnderNavBar() {

        if (document.body.scrollTop > this.navbar_visibility_point) {

            this.nav.style.position = "absolute"
            this.nav.style["z-index"] = 1
            this.nav.style.top = document.body.scrollTop + "px"
            this.nav.style.width = "100%"

            this.createScrollTopBtn()

        } else {
            this.nav.style = ""
            var btn = document.getElementById("scrollToTopBtn")
            if (btn != null) {

                btn.parentNode.removeChild(btn);
            }
        }
        requestAnimationFrame(this.detectScrollTopUnderNavBar)
    }
}
//Class to Serve the html pages
class ServePages {

    constructor() {
        this.actual_page = window.location.hash
        this.previous_page = ""
        this.pages;
        this.getPages()
        //setTimeout(()=>{},1000)
    }

    detectChange() {
        if (this.actual_page != this.previous_page) {
            return true
        } else {
            return false
        }
    }

    updatePreviousPage() {
        this.previous_page = this.actual_page
    }
    setActualPage(value) {
        this.actual_page = value
    }
    async getHtml(filename) {
        let response = await fetch(filename);
        let val = await response.text();
        $("#pageContent").html(val)
    }
    //    getHtml(filename){
    //        var xhttp = new XMLHttpRequest();
    //        xhttp.onreadystatechange = function() {
    //            if (this.readyState == 4 && this.status == 200) {
    //              document.getElementById("pageContent").innerHTML =this.responseText;
    //            }
    //        };
    //        xhttp.open("GET", filename, true);
    //        xhttp.send();
    //    }
    //    getPages() {
    //        fetch('pages.json').then(str => str.json()).then(str => {
    //            this.pages = str;
    //        })
    //    }
    async getPages() {
        let response = await fetch('SiteFolder/DB/pages.json');
        let val = await response.json();
        this.pages = val
    }
    //cheating.............
    //    readTextFile(file)
    //    {
    //        var rawFile = new XMLHttpRequest();
    //        var allText;
    //        rawFile.open("GET", file, false);
    //        rawFile.onreadystatechange = function ()
    //        {
    //            if(rawFile.readyState === 4)
    //            {
    //                if(rawFile.status === 200 || rawFile.status == 0)
    //                {
    //                     allText= rawFile.responseText;
    //                    //alert(allText);
    //
    //                }
    //            }
    //        }
    //        rawFile.send(null);
    //        return allText;
    //    }
    run = () => {
        this.setActualPage(window.location.hash)

        if (this.detectChange()) {

            if (this.pages != undefined) {

                this.updatePreviousPage()
                var page = this.pages[window.location.hash]
                this.getHtml(page)
            }
        }
        requestAnimationFrame(this.run)
    }


}


//Main-------------------------------
window.onload = Init()
