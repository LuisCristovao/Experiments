# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:12:02 2019

@author: Luis Cristóvão
"""

import flask as fl
from importlib.machinery import SourceFileLoader
import json
#import module aed.py from folder modules
aed = SourceFileLoader("aed.py", "modules/aed.py").load_module()
#aed.get_all_posts()
index=SourceFileLoader("index.py", "modules/index.py").load_module()
#print(json.dumps(index.Menu()))
#Start server-----------------------------
app = fl.Flask(__name__)



@app.route('/')
def index_route():
    global index
    return fl.render_template('index.html',menu=index.menu)

@app.route('/add')
def add():
    global aed
    form_inputs=aed.send_all_posts_form()
    return fl.render_template('add_edit.html',menu=form_inputs)
    #return 'get add'

@app.route('/edit')
def edit():
    #return fl.render_template('add_edit.html')
    return 'get edit'

@app.route('/add_edit',methods=["POST"])
def add_edit():
    global aed
    received_values={}
    for key in fl.request.form:
        received_values[key]=fl.request.form[key]
    if aed.add_edit_posts_row(received_values):
        return 'Added:<br><br>'+json.dumps(received_values)
    else:
        return 'Error occured in inserting data on db all_posts'


@app.route('/delete')
def delete():
    #return fl.render_template('delete.html')
    return 'get delete'

@app.route('/search')
def search():
    #return fl.render_template('search.html')
    return 'get search'

@app.route('/generate_tags')
def gen_tags():
    #return fl.render_template('gen_tags.html')
    return 'get tags'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)