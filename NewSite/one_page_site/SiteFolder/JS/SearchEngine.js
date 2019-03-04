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
            post_tags = post_tags.concat(post['secondary search tags'].split(","))
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

    supercompare(search_word, word) {
        //Second method
        matches = 0;
        missMatches = 0;
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