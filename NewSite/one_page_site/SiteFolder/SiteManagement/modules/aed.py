# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:14:14 2019

@author: Luis Cristovao
"""

import json
import os
 
def get_dirpath_less(less):
    out=""
    dirpath = os.getcwd()
    array=dirpath.split("\\")
    for i in range(len(array)-less):
        out+=array[i]+"\\"
    
    return out

def test():
    print("Test import \n\n")

def get_json_file(filepath):
    print("open file:",filepath,"\n")
    with open(filepath) as f:
        data = json.load(f)
        
    
    return data

def dump_json_in_file(filepath,json_val):
    with open(filepath, mode='w', encoding='utf-8') as f:
        json.dump(json_val, f)


def get_all_posts():
    #dirpath=get_dirpath_less(2) #to work locally
    dirpath=get_dirpath_less(1)# to work as a module of server
    print(get_json_file(dirpath + "DB/all_posts.json"))
        

print(__name__)

#dirpath=get_dirpath_less(2)
#data=get_json_file(dirpath + "DB/all_posts.json")
#dump_json_in_file(dirpath + "DB/blog_posts.json",data)