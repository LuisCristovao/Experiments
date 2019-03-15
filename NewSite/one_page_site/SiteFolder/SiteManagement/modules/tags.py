# -*- coding: utf-8 -*-
"""
Created on Fri Mar 15 17:07:53 2019

@author: Luis Cristovao

goal CRUDE operation on tags.json
"""
#import json_files #to import json_files module locally
from importlib.machinery import SourceFileLoader

#to import module in json_files.py when using server
json_files=SourceFileLoader("json_files.py", "modules/json_files.py").load_module() 

def getDB():
    '''
    goal:
        return json object inside DB/pages.json
    '''
    
    #dirpath=json_files.get_dirpath_less(2) #to work locally
    dirpath=json_files.get_dirpath_less(1)# to work as a module of server
    return json_files.get_json_file(dirpath + "DB/tags.json")

def dumpInDB(new_db):
    try:
        #dirpath=json_files.get_dirpath_less(2) #to work locally
        dirpath=json_files.get_dirpath_less(1)# to work as a module of server
        json_files.dump_json_in_file(dirpath + "DB/tags.json",new_db)
        return True
    except:
        return False

def detect_if_unique(db,tag_name):
    '''
    goal:
        detect if post has unique title and if that is true returns true else returns false
    inputs:
        db:
            json with all posts data
        new_title
            
    '''
    unique= True
    for key in db:
        if key==url:
            return False
        
    return unique

def writeRowDB(url,page_site):
    try:
        db=getDB()
        if detect_if_unique(db,url):
            db[url]=page_site
            dumpInDB(db)
            return True
        else:
            return False
    except:
        return False
    
    
def editRowDB(old_url,new_url,new_page_site):
    try:
        db=getDB()
        if detect_if_unique(db,new_url):
            del db[old_url]
            db[new_url]=new_page_site
            dumpInDB(db)
            return True
        else:
            return False
    except:
        return False
    
def deleteRowDB(url):
    try:
        db=getDB()
        del db[url]
        dumpInDB(db)
        return True
    except:
        return False

print(__name__)

