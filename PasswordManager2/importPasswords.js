let password_import = getElement("password_import")
let data = getElement("data")
let split_data = getElement("spliting character")
//import {csvToDB} from db.js


function Import() {

    
    csvToDB(data,password_import.value)
    data.value = "Imported passwords and encrypted them!"
}
