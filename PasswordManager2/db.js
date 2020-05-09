let columns = ["site", "user", "pass", "description"]
function getDB(pass_value){
    db = localStorage["PM"]
    if(db==null){
        return null
    }
    else{
        decrypt_db=[]
        db.split("\n").forEach(row=>{
            let decrypt_line={}
            let row_json = JSON.parse(decrypt(row, pass_value))
            for(key in row_json){
                decrypt_line[key]=decrypt(row_json[key],pass_value)
            }
            decrypt_db.push(decrypt_line)
        })
        return decrypt_db
    }

}
function updateDB(data,row_number_id,pass_value){
    let db=getDB(pass_value)
    db[row_number_id]=data
    EncryptDB(db,pass_value)
}


function EncryptDB(db,pass_value){
    let db_string=""
    let new_db=db.map(db_line=>{
        
        for(key in db_line){
            db_line[key]=encrypt(db_line[key],pass_value)
        }
        return encrypt(JSON.stringify(db_line),pass_value)
    })
    localStorage["PM"]=new_db.reduce((acc, n) => acc + '\n' + n)

}
function csvToDB(data,pass_value){
    let db = []
    let db_line = {}
    data.value.split('\n').forEach((row,id) => {
        
        let columns_data = (split_data.value == '\\t')?row.split('\t'):row.split(split_data.value)
        columns_data.forEach((data, index) => {
            db_line[columns[index]] = encrypt(data, pass_value)
        })
        db.push(encrypt(JSON.stringify(db_line), pass_value))
    })
    localStorage["PM"] = db.reduce((acc, n) => acc + '\n' + n)
}