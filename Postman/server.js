function getElement(id){
    return document.getElementById(id)
}

const method=getElement("method")
const url=getElement("url")
const msg_body=getElement("msg-body")
const output=getElement("output")

const options={
    "get":{

        "get":true,
        "Get":true,
        "GET":true,
    },
    "post":{

        "post":true,
        "Post":true,
        "POST":true
    }    
}

async function Send(){
    if (method.value in options.get){
        try{

            var response=await fetch(url)
            output.value=await response.text()
        }catch(err){
            alert(`request fail with error ${err}`)
        }
    }else{
        if(method.value in options.post){
            try{

                var response=await fetch(url,{
                    method: 'POST',
                    "Content-Type":"text/html",
                    "withCredentials":true,
                    body:msg_body.value
                })
                output.value=await response.text()  
            }catch(err){
                alert(`request fail with error ${err}`)
            }
        }
    }
}

