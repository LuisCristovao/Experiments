






        
        
        
  
  
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
- Must have the following menu sites: **home, projects,blog posts,tags,youtube,github,contact**
    - home will show 3 recent projects (of any type, blog or not) and 3 random.
    - projects will show off all projects in chronological (recent to oldest edit)
    - blog posts will show off all blog posts the same way as projects page.
    - tags will show alphabet with all tags.
    - the rest is  the same as the previous blog
  
  
  

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
            "blog id": id from the table with all projects(foreing key),
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
The same HTML form but now the inputs are already filled.
#### Delete Post:
The first phase can just be inserting the post id and the program will delete the post in all tables (CASCADE Delete)


The python program will always check if the exists a title with the same text and it always will insert the posts in the main posts table. The posts table should be the reference to create the others.

### Search Tags Page:
This page should be like the projects and blog posts showcase pages, but instead of an Image, it should show a Big Letter like A, B, C ... and under them the list of tags: **#unity** links. This page should be generated from Search tags.json table and only print the letters that exist. 

Each tag must has an href to the following: **#search-tags : [tag1,tag2]** 
What this will do is search for all projects with these tags and show off with HTML cards.

**In this page there will exist another search input box to filter the tags**

### Serving Pages:
The method  I came up with is with # links such as **<a href="#Projects"...** the **Js script** detects the change in the URL and serves the page. I will do the URL with **#** because otherwise the browser or Github server will try to serve another page that probably does not exists. 

### Search Engine:
To simplify this I will just use tags and a python or js program to generate from the pages the important tags.
The search engine itself will use **window.location.search** of the URL. Meaning when there is a change in the **?** of the URL than the engine starts running. It has priority over the normal pages. What the search engine will do is the following:

 - Read input and change the URL **?query**
 - The search engine will find the tags that best correlate with the query.
 - The algorithm will search for the best tags that match the query the user to the following hash URL:**#search-tags : [tag1,tag2,...]**
     - This means that the server will show the projects with those tags.
 
 
## Implementation
### Steps:
 - Organize folders: **index.html, ReadMe.txt, SiteFolder[Pages, DB, Images,Projects, Blog, Videos, JS, CSS, SiteManagement]**
 - DB's: 
     - pages.json (has the map between url hash and actual path location)
     - all_projects.json (it has all content created for site blog/projects...)
     - projects.json
     - blog.json
 - Fill DB with some records and create js file to generate project show off page
 - If previous point works then create python program to add/edit/delete projects easily, and changes all json files.
 - Change template.html name 
 - create new branch, and replace previous site with new if every thing is working than merge


### after new site migration, to do:
- IMplement tags page:
    - Create a python program (or add new flask URL)
    - To read from DB and create **SearchTags.json**
- Search input
- Tags Filter input.


# Implementation

## Flask Server
This server should do the following:

 - Don't care about presentation just basic HTML
 - Have a home page where the user can select the following option:
     - Add
     - Edit
     - Delete
     - Search id by title
     - Generate Tags json

All of them were explained previously but in relation to their implementation, I will explain in the coming section.
The flask app will have the following format:

 - server.py (contains the server and the modules that it uses)
 - aed.py (add edit delete module)
 - tags.py
 - templates/... (will contain pages to serve )
 - settings (contains JSON with additional info to the server)


### Add 
- The server.py will serve the page add.html which will be able to add a post. 
- If is adding then no input of the form is filled, otherwise the contrary.  
- As it is a template I can send the form data. 
- Then is just send add a post with form data, and in the server side, the module aed.py should handle the rest.

#### aed.py:
- receives the form post and turns it to json and adds to the current json DB in **all_projects.json**. 
- Sends the form to the HTML page in such a way that it knows which is a number a string or a date or a select box.

### Edit 
The same as add but in the HTML the user first needs to select the id first and then it appears the already filled form.

 - The HTML must have a select box with all id's
 - on select box change it must send a post (fetch) and if id = -1 then DB is empty; else create a select box with available id's
 - if DB is not empty then show form with filled inputs



### Delete
Just a simple form with one input with row id and an "are you sure" question.

### Generate tags 
For later...

## Project Page
This page should be a simple HTML that imports a **js file** that reads **all_posts.json** file and generates the site.

 - Need a function to read the json file
 - need function that processes that json to create the cards thats it
 - All cards should be same size.
 - Need to filter by type
 - need to roder by last update or creation date the posts
 - Footer to load more projects, better load more projects on scroll bottom, thats it.

## Notes
 JSON format already organizes alphabetically the key!!!!!!!!
### Scroll bottom
Scroll works like this:

 1. Page as a visibility window that is called window.
 2. the **document.body.offsetHeight** or **document.body.scrollHeight**  is the complet page height and we have a visibility window that slides through the document page height.
 3. to detect the bottom is when **document.body.scrollTop + window.innerHeight == document.body.scrollHeight**. **scrollTop**  represents where the top of the view window is in the **document height**
 4. To do this there are a lot of ways:


	    \$(window).scroll(function () {
	        if (\$(window).scrollTop() + \$(window).height() == \$(document).height()) {
	            alert("bottom!");
	        }
	    });

OR    

 

    setInterval(() => {
        if (prev_scrollTop != document.body.scrollTop) {
            prev_scrollTop = document.body.scrollTop
            if ((document.body.scrollTop + window.innerHeight) == document.body.scrollHeight) {
                alert("bottom!")
            }
        }
    }, 100)

**next: need to delete the first fillGrid function and only use loadMore projects to insert project in page**