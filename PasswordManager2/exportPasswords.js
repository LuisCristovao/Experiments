let export_password = getElement("export_password")
let export_text_area = getElement("export_data")


function Export() {
    let data=dbToCsv(export_password.value)
    export_text_area.value=data
}
