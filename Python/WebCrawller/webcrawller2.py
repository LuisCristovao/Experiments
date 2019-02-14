# -*- coding: utf-8 -*-
"""
Created on Tue Oct 16 11:06:41 2018

@author: luis Cristovao
"""

import requests
import htmlEncode

bread={}


def web(WebUrl):
    
        url = WebUrl
        code = requests.get(url)
        plain = code.text
        return plain
    
def GetNumberOfPages():
    html=web('https://www.jumbo.pt/Frontoffice/produtos_frescos/padaria_e_pastelaria')
    return int(html.split('<div id="DivWrapperProductItem">')[1].split('</div>')[0].split("var totalPages = ")[1].split(";")[0])
    

def GetJumboBreadNameAndPrice():
    number_of_pages=GetNumberOfPages()
    for page_num in range(1,number_of_pages):
        print(page_num)
        html=web('https://www.jumbo.pt/Frontoffice/produtos_frescos/padaria_e_pastelaria#?pn='+str(page_num))
        for i in range(1,len(html.split("product-item product-item-food col-sm-4 flyers-item-mason col-md-2-4 clearfix  "))):
            product_html=html.split("product-item product-item-food col-sm-4 flyers-item-mason col-md-2-4 clearfix  ")[i]
            product_name=product_html.split("product-item-header-column col-xs-8 col-sm-12")[1].split("<h3>")[1].split("</h3>")[0]
            product_price=product_html.split("product-item-header-column col-xs-8 col-sm-12")[1].split('<p class="product-item-price ">')[1].split("<span")[0].replace(" ","").replace("\n",'')
            
            #save in dictionary
            bread[ htmlEncode.unescape(product_name)]=product_price


def ShowBread():
    for b in bread:
        print(b)
        print(bread[b])
        #print('\n')
    
        
html=web('https://www.jumbo.pt/Frontoffice/produtos_frescos/padaria_e_pastelaria')

#NUmber of pages
#print(html.split('<div id="DivWrapperProductItem">')[1].split('</div>')[0].split("var totalPages = ")[1].split(";")[0])

        
        
        
GetJumboBreadNameAndPrice()
ShowBread()        
        