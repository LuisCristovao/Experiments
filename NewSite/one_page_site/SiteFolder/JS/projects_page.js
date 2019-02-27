
//Global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/all_posts.json');
    let val = await response.json();
    return val
}
async function show(){
    data=await getDBPosts()
    alert(JSON.stringify(data))
}
//main-----
show()