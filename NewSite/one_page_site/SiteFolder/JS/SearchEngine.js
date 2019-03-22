//Search Engine----------------------------
class SearchEngine {
    //this.suggestions_index;
    


    constructor() {
        this.tagsdb;
        this.suggestions_index = 0
        this.getTags()
        this.search_suggestions = []
    }
    
    invertArrayOrder(array) {
        var new_arr = []
        for (var i = array.length - 1; i >= 0; i--) {
            new_arr.push(array[i])
        }
        return new_arr
    }
    async getDBPosts() {
        let response = await fetch('SiteFolder/DB/all_posts.json');
        let val = await response.json();
        return val
    }
    async getTags() {
        let response = await fetch('SiteFolder/DB/tags.json');
        let val = await response.json();
        this.tagsdb=val
    }

    getQuery() {
        return window.location.search.split("=")[1].split("+")
    }

    orderBestIndex(selected_posts_map) {
        var ordered_posts_id = []
        var ordered_posts_tuple = []
        var ordered = false
        //insert in array the tuples
        for (var index in selected_posts_map) {
            ordered_posts_tuple.push({
                "id": index,
                "value": selected_posts_map[index]
            })
        }
        var change = false
        //order array with inverted buble sort (decrescent)
        if (ordered_posts_tuple.length > 1) {

            for (var i = 0; !ordered; i = (i + 1) % (ordered_posts_tuple.length - 1)) {
                if (ordered_posts_tuple[i]["value"] < ordered_posts_tuple[i + 1]["value"]) {
                    //change order
                    var backup = ordered_posts_tuple[i]
                    ordered_posts_tuple[i] = ordered_posts_tuple[i + 1]
                    ordered_posts_tuple[i + 1] = backup
                    change = true
                }
                if ((i + 1) == ordered_posts_tuple.length - 1) {
                    if (change == false) {
                        ordered = true
                    } else {
                        change = false
                    }
                }

            }
        }
        //return only posts id's
        for (var i in ordered_posts_tuple) {
            ordered_posts_id.push(ordered_posts_tuple[i]["id"])
        }
        return ordered_posts_id
    }



    arrayUpperCase(array) {
        var new_array = []
        for (var i = 0; i < array.length; i++) {
            var val = array[i]
            new_array.push(val.toUpperCase())
        }
        return new_array
    }



    async findPosts() {
        var select_posts = {}
        var all_posts = await this.getDBPosts()
        var query_tags = this.arrayUpperCase(this.getQuery()) //array with tags
        for (var i in all_posts) {
            var post = all_posts[i]
            var post_tags = this.arrayUpperCase(post['search tags'].split(","))
            post_tags = post_tags.concat(this.arrayUpperCase(post['secondary search tags'].split(",")))
            for (var j in post_tags) {
                for (var e in query_tags) {
                    if (query_tags[e] == post_tags[j]) {
                        if (select_posts[i] == null) {
                            select_posts[i] = 1
                        } else {
                            var num = select_posts[i]
                            num++
                            select_posts[i] = num
                        }
                    }
                }
            }

        }
        var ids = this.orderBestIndex(select_posts)
        //get posts from id's
        select_posts = []
        for (var i in ids) {
            select_posts.push(all_posts[ids[i]])
        }
        return select_posts
    }

    createSuggestionDiv(input, suggestions) {



        var html = ""
        var div;
        if (document.getElementById("suggestions") != null) {
            if (suggestions.length == 1 && suggestions[0] == "") {
                var el = document.getElementById("suggestions")
                el.parentElement.removeChild(el)
            } else {

                div = document.getElementById("suggestions")
                html += '<ul class="list-group list-group-flush">'
                for (var i = 0; i < suggestions.length; i++) {
                    var val = suggestions[i]
                    html += '<li class="list-group-item">' + val + '</li>'
                }
                html += '</ul>'
                div.innerHTML = html
            }
        } else {


            if (suggestions.length == 1 && suggestions[0] != "") {

                var body = document.body
                var width = input.offsetWidth
                var top = input.offsetTop
                var left = input.offsetLeft
                var height = input.offsetHeight
                div = document.createElement("div")
                div.setAttribute("id", "suggestions")
                div.setAttribute("style", "position:absolute")
                div.setAttribute("class", "card")
                div.style.width = width + 'px'
                div.style.top = top + height + 10 + 'px'
                div.style.left = left + 'px'
                html += '<ul class="list-group list-group-flush">'
                for (var i = 0; i < suggestions.length; i++) {
                    var val = suggestions[i]
                    html += '<li class="list-group-item">' + val + '</li>'
                }
                html += '</ul>'
                div.innerHTML = html
                body.appendChild(div)
            }

        }
    }

    onKeyPressSuggestion(search_input) {
        //calculate suggestion
        var suggestions=this.calculateSuggestions(search_input.value.split(" "))
        this.createSuggestionDiv(search_input, suggestions)
        //this.createSuggestionDiv(search_input, search_input.value.split(" "))
        
    }
    calculateSuggestions(search_query_tags){
        var suggestions=[]
        
        for(var i =0 ;i<search_query_tags.length;i++){
            var search_query=search_query_tags[i]
            var first_letter=search_query[0].toUpperCase()
            for(var key in this.tagsdb[first_letter]){
//                if(this.compare(search_query,key)>0.5){
//                    suggestions.push(key)
//                }
                //just test version
                suggestions.push(key)
            }
        }
        return suggestions
    }
    compare(search_word,word){
        
    }
    supercompare(search_word, word) {
        //Second method
        var matches = 0;
        var missMatches = 0;
        
        for (i = 0; i < word.length; i++) {
            //if not exists
            if (word_freq[word[i]] == null) {
                word_freq[word[i]] = 1;
            } //already exists
            else {
                var count = word_freq[word[i]];
                count++;
                word_freq[word[i]] = count;
            }
        }
        for (i = 0; i < search_word.length; i++) {
            //if not exists
            if (search_freq[search_word[i]] == null) {
                search_freq[search_word[i]] = 1;
            } //already exists
            else {
                var count = search_freq[search_word[i]];
                count++;
                search_freq[search_word[i]] = count;
            }
        }
        //
        matches = 0;
        missMatches = 0;
        for (var key in search_freq) {
            //both have same letter
            if (search_freq[key] != null && word_freq[key] != null) {


                //
                if (search_freq[key] == word_freq[key]) {
                    matches += search_freq[key];
                } else {
                    //give the lowest value of matches
                    matches += (search_freq[key] < word_freq[key]) ? search_freq[key] : word_freq[key];
                    difference = Math.abs(search_freq[key] - word_freq[key]);
                    missMatches += difference;
                }

            } else {
                missMatches++;
            }
        }
        //count missmatches if word bigger than search word
        for (var key in word_freq) {
            if (search_freq[key] == null && word_freq[key] != null) {
                missMatches++;
            }
        }
        var compare_index = matches / (matches + missMatches)
        //
        return compare_index;

    }

}







///Old function
//supercompare(search_word, word) {
//    //first method
//    var dif = Math.abs(search_word.length - word.length);
//    var matches = 0;
//    var missMatches = 0;
//    var word_freq = {};
//    var search_freq = {}
//    var compare_lenght = Math.floor(word.length * 0.5);
//    //first method
//    for (i = 0; i < compare_lenght; i++) {
//        if (search_word[i] == word[i]) {
//            matches++;
//        }
//    }
//
//    var compare_index0 = matches / (compare_lenght);
//
//
//    //Second methods
//    matches = 0;
//    missMatches = 0;
//    for (i = 0; i < word.length; i++) {
//        //if not exists
//        if (word_freq[word[i]] == null) {
//            word_freq[word[i]] = 1;
//        } //already exists
//        else {
//            var count = word_freq[word[i]];
//            count++;
//            word_freq[word[i]] = count;
//        }
//    }
//    for (i = 0; i < search_word.length; i++) {
//        //if not exists
//        if (search_freq[search_word[i]] == null) {
//            search_freq[search_word[i]] = 1;
//        } //already exists
//        else {
//            var count = search_freq[search_word[i]];
//            count++;
//            search_freq[search_word[i]] = count;
//        }
//    }
//    //
//    matches = 0;
//    missMatches = 0;
//    for (var key in search_freq) {
//        //both have same letter
//        if (search_freq[key] != null && word_freq[key] != null) {
//
//
//            //
//            if (search_freq[key] == word_freq[key]) {
//                matches += search_freq[key];
//            } else {
//                //give the lowest value of matches
//                matches += (search_freq[key] < word_freq[key]) ? search_freq[key] : word_freq[key];
//                difference = Math.abs(search_freq[key] - word_freq[key]);
//                missMatches += difference;
//            }
//
//        } else {
//            missMatches++;
//        }
//    }
//    //count missmatches if word bigger than search word
//    for (var key in word_freq) {
//        if (search_freq[key] == null && word_freq[key] != null) {
//            missMatches++;
//        }
//    }
//    var compare_index2 = matches / (matches + missMatches);
//
//
//    var compare_index = (compare_index2 + compare_index0) / 2;
//    //
//    return compare_index;
//
//}
