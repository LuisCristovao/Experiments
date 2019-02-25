# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:12:02 2019

@author: Luis Cristóvão
"""

import flask as fl

from importlib.machinery import SourceFileLoader

#import module aed.py from folder modules
aed = SourceFileLoader("aed.py", "modules/aed.py").load_module()
#aed.get_all_posts()


#Start server-----------------------------
app = fl.Flask(__name__)



@app.route('/')
def index():
    return fl.render_template('index.html')

@app.route('/add_edit')
def add_edit():
    return fl.render_template('add_edit.html')

@app.route('/delete')
def delete():
    return fl.render_template('delete.html')

@app.route('/search')
def search():
    return fl.render_template('search.html')

@app.route('/generate_tags')
def gen_tags():
    return fl.render_template('gen_tags.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)