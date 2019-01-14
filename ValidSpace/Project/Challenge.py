# -*- coding: utf-8 -*-


#from flask import Flask
#from flask import send_from_directory

import flask as fl
#import os
import DB as db
import Compute3 as cp











#start db if not exists
db.Start()

#Start server
app = fl.Flask(__name__)

#actual_dir=os.getcwd()

#print(actual_dir)
#functions={"f1":"1+2","f2":"f1"}


def turnFunctionsToJSON(func_table):
    out={}
    if func_table!=None and len(func_table)>0:
        for f in func_table:
            out[f[0]]=f[1]
        
    return out
    

@app.route('/')
def main():
    return fl.render_template('index.html')

@app.route('/admin')
def admin():
    
    print(db.getFunctions())
    return fl.render_template('admin.html',functions=turnFunctionsToJSON(db.getFunctions()))
    #return  fl.send_from_directory(actual_dir+'/templates','index.html')

@app.route('/addfunction',methods=["POST"])
def add():
    
    name=fl.request.form['name']
    function=fl.request.form['function']
    
    #function=function.replace(" ","+")
    print(name,function)
    db.InsertNewFunction(name,function)
    
    return "Success Added new function"
    #return  fl.send_from_directory(actual_dir+'/templates','index.html')
    
@app.route('/deletefunction',methods=["POST"])
def delete():
    
    name=fl.request.form['name']
    function=fl.request.form['function']
    db.DeleteFunction(name)
    print(name,function)
    return "Success Deleted function "+name
    #return  fl.send_from_directory(actual_dir+'/templates','index.html')

@app.route('/updatefunction',methods=["POST"])
def update():
    
    name=fl.request.form['name']
    new_name=fl.request.form['newname']
    function=fl.request.form['function']
    #function=function.replace(" ","+")
    db.UpdateFunction(name,new_name,function)
    print(name,new_name,function)
    return "Successfully updated function "+name
    
@app.route('/compute',methods=["POST"])
def compute():
    
    compute=fl.request.form['compute']
    print(compute)
    #compute=compute.replace(" ","+")
    if(compute!=""):
        #compute result
        compute=cp.CompletParse(compute)
        result=cp.compute(compute)
    else:
        return "Input cannot be empty!"
    print(result)
    return "Result: "+compute+"="+str(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)