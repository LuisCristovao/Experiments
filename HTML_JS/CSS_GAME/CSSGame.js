var character
function getStyle(data_json){
    out=""
    for(key in data_json){
        out+=key+":"+data_json[key]+";"
    }
    return out
}
function createCharacter(width,height,body_color,eye_color){
    character=document.createElement("div")
    var style= getStyle({"position":"absolute","width":width,"height":height,"background":body_color})
    character.setAttribute("style",)
}