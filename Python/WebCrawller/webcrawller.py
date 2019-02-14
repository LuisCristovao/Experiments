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
    


def GetJumboBreadNameAndPrice():
    html=web('https://www.jumbo.pt/Frontoffice/produtos_frescos/padaria_e_pastelaria#?pn=4')
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
    
        
html=web('https://www.jumbo.pt/Frontoffice/produtos_frescos/padaria_e_pastelaria#?pn=4')

#for line in html.split("product-item product-item-food col-sm-4 flyers-item-mason col-md-2-4 clearfix  "):
#    print (line)



#Get Jumbo Bread Name
#print(html.split("product-item product-item-food col-sm-4 flyers-item-mason col-md-2-4 clearfix  ")[3].split("product-item-header-column col-xs-8 col-sm-12")[1].split("<h3>")[1].split("</h3>")[0].replace("\n",""))


#Get Jumbo Bread Price
#print(html.split("product-item product-item-food col-sm-4 flyers-item-mason col-md-2-4 clearfix  ")[1].split("product-item-header-column col-xs-8 col-sm-12")[1].split('<p class="product-item-price ">')[1].split("<span")[0].replace(" ","").replace("\n",''))
        
        
        
GetJumboBreadNameAndPrice()
ShowBread()        
        