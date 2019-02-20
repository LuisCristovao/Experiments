

        
        
        
  
  
# One-page site Logic  
  
  
  
  

## Intro  
  
  
  
  

We have on an original page the following structure:  
  
  
  
  

* index.html -> is the first page  
* on **Site** folder we have the images, video, pages, blog, CSS, js... **folders**  
  
  
  
  

Trying to copy this structure, with just one template page where the rest HTML is copied in to.  
  
  

## Features  
  
  
  
  

- Have a good navbar with a menu (projects, blog, contact,...)  
- Needs to be scalable, if I want new menu options it has to be really easy. Or adding a new project must be automated.  
- Every project must have a **date, tags/categories, title, short description**  
- Every project must have its own page, and it should have a systematic way to create these pages.  
- It must be possible to search by category or just by writing a text in search input.  
- The search engine must be capable of search in the text of projects pages.  
- There will be template pages to show all projects  
  
  
  

## Thinking Solution  
  
  
  
  

For instance, let the **index.html** be the **template**. It has a header with the burger menu.  
The template is basically just this because this will appear on any page so that the user has access to the menu all the time. In the case of the projects page where there is a footer, this is still not a problem.  
  
  
  

So there is a **div** with **id="pageContent"** that will have all the pages content, but it will change depending on # or ?. Then with **js** it is possible to check the url with **window.location.hash (#)** or **window.location.search (?)**.  
  
  

Let us see if it is possible to create a **general js script** that works basically like Flask. Meaning can get HTML from files and place them here.  
For instance:  
  

if(window.location.hash=="#Projects"){  
GetContent("ProjectsContent.html")  
}  
if(window.location.hash=="#Contact"){  
GetContent("ContactContent.html")  
}  
  
  
  

GetContent could be done with **fetch** or an **ajax request**  
  
  

### Automate creation of a new project  

To create a new project it is needed the following:  
  

- Create an HTML page specific for the new project  
- Add a row on projects DB (there should only exist a single DB to facilitate the process)  
  

This should be it for adding a new project on Blog or projects  
  

### DB for projects and blog posts  

So the DB should have the following format:  
  
    [  
            {  
                "id": array index number,
                "title":"X",  
                "type":"blog or project".
                "short description":"x",  
                "creation date":"dd/mm/yyyy",
                "last update date":"dd/mm/yyyy",  
                "link": "project or page link",  
                "image": "image link",  
                "search tags":["x1","bla bla","x2"]  
              
            }  
    ]  

This is what the project showcase page will drink from. From this JSON the project page should be able to generate itself.

To automate the site creation I will have to create a python script that fills up the DB tables such as:
* Blog posts table
* Project posts table
* Search tags table
#### Blog Posts Table Formate:
    [  
        {  
	        "id":"id": array index number,
            "main id": id from the table with all projects(foreing key),
            "title":"X",  
            "type":"blog or project".
            "short description":"x",  
            "date":"dd/mm/yyyy",  
            "link": "project or page link",  
            "image": "image link",  
            "search tags":["x1","bla bla","x2"]  
          
        }  
    ]  
But only with the blog posts. **I will do another file with only project posts.**
#### SearchTags.json File Formate:

    {
        "A":[aba,abc,...,ordered search tags that begin with "a/A"],
        "B":[...same with b],
        ...
    }
Need to create an ordering algorithm in python to order inside arrays. Something like having an array with the alphabet and think later ...
### Dates
The main page will show 3 recently updated projects and 3 random blog/projects.
On the projects and blog pages it will have projects ordered by creation date but can have a switch that changes the order from creation date -> recently updated. That way I can see if I doing posts or not.

### Python File 
This python file will be useful to automate the following processes:

 - Add new post
 - Edit post 
 - Delete post

#### Add Post:
The python file will first ask if I want to create, delete or edit a post.
If I choose to add a post, the program should make me answer a form to fill the JSON I can even make a flask application to make the HTML forms and so on...
Probably will do this I could also do a Django but, is simpler if I just do a one file server that handles everything

#### Edit Post:
The same html form but now the inputs are already filled.
#### Delete Post:
The first phase can just be insert the post id and the program will delete the post in all tables (CASCADE Delete)


The python program will always check if the exists a title with the same text and it always will insert the posts in the main posts table. The posts table should be the reference to create the others.

### Search Tags Page:
This page should be like the projects and blog posts showcase pages, but instead of an Image it should show a Big Letter like A,B,C ... and under them the list of tags: **#unity** links. This page should be generated from Search tags.json table and only print the letters that exist. 

### Serving Pages:
The mnethod  I came up with is with # links such as: **<a href="#Projects"...** the **Js script** detects the change in the url and serves the page. I will do the url with **#** because othewise the browser or github server will try to serve another page that probaly does not exists. 

### Search Engine:
To simplefy this I will just use tags and a python or js program to generate from the pages the important tags.
The search engine itself will use **window.location.search** of the url. Meaning when there is a change in the **?** of the url than the engine starts running. It has priority over the normal pages. What the search engine will do is the following:

 - Read input and change the url **?query**
 - The search engine will find the tags that best corelate with the query.
 - The algorithm will search for the best tags that match the query and send a JSON with it to categories page so the user sees th........ To continue....
 

## Conclusion
Apperantly this is it 

