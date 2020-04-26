let export_password = getElement("export_password")
let export_text_area = getElement("export_data")
let columns = ["site", "user", "pass", "description"]

function Export() {
    let data = localStorage["PM"]
    let line = ""
    let db = ""
    data.split("\n").forEach(row => {
        let d = decrypt(row, export_password.value)
        let d_json = JSON.parse(d)
        line = ""
        columns.forEach((col, index) => {
            if (index < columns.length-1) {

                line += decrypt(d_json[columns[index]], export_password.value) + '\t'
            } else {
                line += decrypt(d_json[columns[index]], export_password.value)
            }
        })
        line += '\n'
        db += line
    })
    export_text_area.value = db
}
