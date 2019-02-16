function Search(btn){
    var parent=btn.parentElement
    var input = parent.children[0]
    setTimeout(function(){window.location.search=input.value},300)
    
}