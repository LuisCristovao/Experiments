# -*- coding: utf-8 -*-
"""
Created on Tue Feb 26 08:57:59 2019

@author: Luis Cristovao
"""


import json

'''
index.html will use menu map to write menu and its href
'''
menu={
         "Add":"/add",
         "Edit":"/edit",
         "Delete":"/delete",
         "Search":"/search",
         "Generate Tags":"/generate_tags"
      }
def Menu():
    global menu
    return json.dumps(menu)

print(__name__)