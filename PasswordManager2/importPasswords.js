let password_import = getElement("password_import")
let data = getElement("data")
let split_data = getElement("spliting character")
let columns = ["site", "user", "pass", "description"]


function Import() {

    let db = []
    let db_line = {}
    data.value.split('\n').forEach((row,id) => {
        
        let columns_data = (split_data.value == '\\t')?row.split('\t'):row.split(split_data.value)
        columns_data.forEach((data, index) => {
            db_line[columns[index]] = encrypt(data, password_import.value)
        })
        db.push(encrypt(JSON.stringify(db_line), password_import.value))
    })
    localStorage["PM"] = db.reduce((acc, n) => acc + '\n' + n)
    data.value = "Imported passwords and encrypted them!"
}
