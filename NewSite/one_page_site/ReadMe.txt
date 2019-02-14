    
  
# One-page site Logic  
  
  

## Intro  
  
  

We have on an original page the following structure:  
  
  

* index.html -> is the first page  
* on **Site** folder we have the images, video, pages, blog, CSS, js... **folders**  
  
  

Trying to copy this structure, with just one template page where the rest HTML is copied in to.  
  
  
  

## Thinking Solution  
  
  

For instance, let the **index.html** be the **template**. It has a header with the burger menu.  
The template is basically just this because this will appear on any page so that the user has access to the menu all the time. In the case of the projects page where there is a footer, this is still not a problem.  
  

So there is a **div** with **id="pageContent"** that will have all the pages content, but it will change depending on # or ?. Then with **js** it is possible to check the url with **window.location.hash (#)** or **window.location.search (?)**.

Let us see if it is possible to create a **general js script** that works basically like flask. Meaning can get html from files and place them here.
For instance:
					
	if(window.location.hash=="#Projects"){	
		GetContent("ProjectsContent.html")	
	}
	if(window.location.hash=="#Contact"){	
		GetContent("ContactContent.html")	
	}
