


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

