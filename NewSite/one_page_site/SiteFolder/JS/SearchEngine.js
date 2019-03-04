//Search Engine----------------------------
class SearchEngine {
    constructor() {

    }

    async getDBPosts() {
        let response = await fetch('SiteFolder/DB/all_posts.json');
        let val = await response.json();
        return val
    }
    getQuery() {
        return window.location.search.split("=")[1].split("+")
    }
    async findPosts() {
        var select_posts = []
        var all_posts = await this.getDBPosts()
        var query_tags = this.getQuery() //array with tags
        for (var i in all_posts) {
            var post = all_posts[i]
            var post_tags = post['search tags'].split(",")
            post_tags=post_tags.concat(post['secondary search tags'].split(","))
            for (var j in post_tags) {
                for (var e in query_tags) {
                    if (query_tags[e] == post_tags[j]) {
                        select_posts.push(post)
                    }
                }
            }

        }
        return select_posts
    }

}