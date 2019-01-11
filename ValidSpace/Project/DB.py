# -*- coding: utf-8 -*-
"""
Created on Wed Jan  9 11:30:38 2019

@author: Samsung
"""

import sqlite3 as sql
import os


#http://www.sqlitetutorial.net/sqlite-python/create-tables/


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sql.connect(db_file)
        print("Success connecting",db_file)
        return conn
    except sql.Error as e:
        print(e)
 
    return None



def Start():
    if not existsDB('functions.db'):
        conn = create_connection('functions.db') # Warning: This file is created in the current directory
        cursor=conn.cursor()
        try:
            query=""" CREATE TABLE IF NOT EXISTS functions (
                                            name text PRIMARY KEY,
                                            function text NOT NULL
                                        ); """
            cursor.execute(query)
            cursor.close()
            print("Success creating table!")
#            InsertNewFunction("f1","1+2")
#            InsertNewFunction("f2","f1")
            
        except sql.Error as e:
            print(e)
    
    
    
def DropTable():
    conn = create_connection('functions.db')
    try:
        query="Drop TABLE functions"
        conn.execute(query)
        conn.commit()
        conn.close()
        print("Success Deleting Table functions!")
    except sql.Error as e:
        print(e)   

def InsertNewFunction(name,function):
    conn = create_connection('functions.db') # Warning: This file is created in the current directory
    cursor=conn.cursor()
    try:
        query="INSERT INTO functions (name,function) VALUES ('"+name+"','"+function+"')"
        cursor.execute(query)
        last_id=cursor.lastrowid
        conn.commit()
        cursor.close()
        print("Success inserting",last_id)
    except sql.Error as e:
        print(e)
    
    
def UpdateFunction(name,new_name,new_function):
    conn = create_connection('functions.db')
    try:
        query="UPDATE functions SET name = '"+new_name+"',function = '"+new_function+"' WHERE name ='"+name+"'"
        conn.execute(query)
        conn.commit()
        conn.close()
        print("Success Updating Entry!")
    except sql.Error as e:
        print(e)   
    

def DeleteFunction(name):
    conn = create_connection('functions.db') # Warning: This file is created in the current directory
    cursor=conn.cursor()
    try:
        query="delete from functions where name='"+name+"'"
        cursor.execute(query)
        last_id=cursor.lastrowid
        conn.commit()
        cursor.close()
        print("Success Delete",name,"|| last id:",last_id)

    except sql.Error as e:
        print(e)
      
        
        
def Query(query):  
    conn = create_connection('functions.db') # Warning: This file is created in the current directory
    cursor=conn.cursor()
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except sql.Error as e:
        print(e)
    
    return None
      

def getFunctions():
    conn = create_connection('functions.db') # Warning: This file is created in the current directory
    cursor=conn.cursor()
    try:
        query="select * from functions"
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except sql.Error as e:
        print(e)
    
    return None

def existsDB(db_name):
    work_directory_files= os.listdir(os.getcwd())
    for file in work_directory_files:
        if file==db_name:
            return True
        
    return False

print(__name__)
        
        
#Start()
#print(existsDB("functions.db"))
#InsertNewFunction("f1","1+2+1")
#InsertNewFunction("f2","f1")
#print(getFunctions())
#DeleteFunction("www")
#print(getFunctions())
#UpdateFunction('dsfre','www','oihoihjo')