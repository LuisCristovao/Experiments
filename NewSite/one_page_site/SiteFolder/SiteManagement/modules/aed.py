# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:14:14 2019

@author: Luis Cristovao
"""

import json
import os
 
def get_dirpath_less(less):
    '''
    goal: get current directory or a parent directory
    inputs:
        less: number that determines the parent folder the user wants.
              for instance in this folder tree : C > main > templates > index.html (working dir)
                                                            static  
              if we used get_dirpath_less(1) we would obtain: C/main/
              if we used get_dirpath_less(0) we would obtain: C/main/templates/
    '''
    
    out=""
    dirpath = os.getcwd()
    array=dirpath.split("\\")
    for i in range(len(array)-less):
        out+=array[i]+"\\"
    
    return out

def test():
    '''
    Bla bla...
    '''
    print("Test import \n\n")

def get_json_file(filepath):
    '''
     goal: 
        gets json object in file
     inputs:
        filepath:
            complet path including filename of the file to write to.
     returns:
        json object
    '''
    
    print("open file:",filepath,"\n")
    with open(filepath) as f:
        data = json.load(f)
        
    
    return data

def dump_json_in_file(filepath,json_val):
    '''
    goal: 
        writes json object in file
    inputs:
        filepath:
            complet path including filename of the file to write to.
        json_val:
            json object
    '''
    
    with open(filepath, mode='w', encoding='utf-8') as f:
        json.dump(json_val, f)


def get_all_posts():
    '''
    goal:
        return json object inside DB/all_posts.json
    '''
    
    #dirpath=get_dirpath_less(2) #to work locally
    dirpath=get_dirpath_less(1)# to work as a module of server
    return get_json_file(dirpath + "DB/all_posts.json")
    
    


def send_all_posts_form():
    '''
    goal:
        Send json with required info for script in html to fill the form with inputs
    description:
        gets json settings/all_posts_table_columns.json and sends it.
    '''
    
    dirpath=get_dirpath_less(0)
    dirpath+="modules/"# to work as a module of server; comment this to work locally
    data=get_json_file(dirpath+"settings/all_posts_table_columns.json")
    return data


def add_posts_row(data):
    '''
    goal:
        add row to all_posts.json
        
    inputs:
        data:
            json object with data to insert on a row
    '''
    
    try:
        db=get_all_posts()
        data["id"]=len(db)
        db.append(data)
        #dump json object in db all_post.json
        dirpath=get_dirpath_less(1)# to work as a module of server
        dump_json_in_file(dirpath + "DB/all_posts.json",db)
        return True
    except:
        return False

def select_post(id_):
    '''
    goal:
        return a row with some id in all_posts.json 
        
    inputs:
        id_:
            row id 
    '''
    
    db=get_all_posts()
    return db[id_]            

print(__name__)

#dirpath=get_dirpath_less(2)
#data=get_json_file(dirpath + "DB/all_posts.json")
#dump_json_in_file(dirpath + "DB/blog_posts.json",data)