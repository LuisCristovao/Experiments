# -*- coding: utf-8 -*-


#from flask import Flask
#from flask import send_from_directory

import flask as fl
import os

import DB as db


app = fl.Flask(__name__)

actual_dir=os.getcwd()

print(actual_dir)

@app.route('/')
def main():
    return fl.render_template('index.html')

@app.route('/admin/<name>')
def admin(name):
    return fl.render_template('admin.html',name=name)
    #return  fl.send_from_directory(actual_dir+'/templates','index.html')


@app.route('/function',methods=["POST"])
def function():
    print(fl.request.headers)
    return ""+fl.request.form['name']+'      '+fl.request.form['function']



if __name__ == '__main__':
    db.Start()
    app.run(host='0.0.0.0', port=80)
    