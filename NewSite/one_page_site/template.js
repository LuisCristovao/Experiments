


//global functions
function Search(btn){
    var parent=btn.parentElement
    var input = parent.children[0]
    window.location.search=input.value
    
}
function SearchKeyPress(event,input){
    //press enter
    if (event.keyCode==13){
        var value= input.value
        window.location.search=input.value
        
    }
    
}

//
function Init(){
    requestAnimationFrame(server.run)
}
//-------------------------------------------------------------------
//Class to Serve the html pages
class ServePages{
    
    constructor(){
        this.actual_page=window.location.hash
        this.previous_page=window.location.hash
        this.pages;
        this.getPages()
        //setTimeout(()=>{},1000)
    }
    
    detectChange(){
        if (this.actual_page!=this.previous_page){
            return true
        }
        else{
            return false
        }
    }
    
    updatePreviousPage(){
        this.previous_page=this.actual_page
    }
    setActualPage(value){
        this.actual_page=value
    }
    
    getHtml(filename){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("pageContent").innerHTML =this.responseText;
            }
        };
        xhttp.open("GET", filename, true);
        xhttp.send();
    }
//    getPages() {
//        fetch('pages.json').then(str => str.json()).then(str => {
//            this.pages = str;
//        })
//    }
    async getPages(){
          let response = await fetch('pages.json');
          let val = await response.json();
          this.pages=val
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
    run = async ()=>{
        this.setActualPage(window.location.hash)
        
        if (this.detectChange()){
            this.pages=await this.pages
            var page=this.pages[window.location.hash]
            this.getHtml(page)
        }
        requestAnimationFrame(this.run)
    }
    
    
}
//------------------------------------------------
//global variables
const server = new ServePages();

//Main-------------------------------

Init()


