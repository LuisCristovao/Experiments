const home_body = getElement("home_body")
var prev_screen_ratio = PageWithHeightRatio()

function createUL() {
    //width >= height
    if (PageWithHeightRatio() >= 1) {
        return `<ul style="padding:10%;">`
    }
    //height > width
    else {
        return `<ul style="padding:5%;">`
    }
}

function createLi(text) {
    console.log(PageWithHeightRatio())
    //width >= height
    if (PageWithHeightRatio() >= 1) {
        return `<li style="padding:3%;font-size:3em">${text}</li>`
    }
    //height > width
    else {
        return `<li style="padding:10%;font-size:4em">${text}</li>`
    }
}

function checkScreenRatio() {
    if (prev_screen_ratio != PageWithHeightRatio()) {
        var home_page = ""
        home_page += createUL()
        const menu = ["Manage Passwords", "Change Master Paswword", "Import Text Passwords", "Export Passwords"]
        menu.forEach(el => {
            home_page += createLi(el)
        })
        home_body.innerHTML = home_page
    }
    setTimeout(checkScreenRatio,350)
}

function start_home() {

    var home_page = ""
    home_page += createUL()
    const menu = ["Manage Passwords", "Change Master Paswword", "Import Text Passwords", "Export Passwords"]
    menu.forEach(el => {
        home_page += createLi(el)
    })
    home_body.innerHTML = home_page
}
start_home()
checkScreenRatio()