# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:12:02 2019

@author: Luis Cristóvão
"""

import flask as fl

from importlib.machinery import SourceFileLoader

foo = SourceFileLoader("aed", "/modules/aed.py").load_module()
foo.test()








#Start server-----------------------------





app = fl.Flask(__name__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)