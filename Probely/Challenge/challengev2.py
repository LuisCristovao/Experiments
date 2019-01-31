# -*- coding: utf-8 -*-
"""
Created on Thu Jan 31 16:23:23 2019

@author: Samsung
"""

import requests
import json


class ProbelyApiRequest:
    
    def __init__(self):
        self.url='https://api.probely.com/targets/'
        self.auth='JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwcm9iZWx5IiwidXNlcm5hbWUiOiJZVWt3WjhHZFhpUmkiLCJqdGkiOiJRRDdoWUFvdjdTYnIifQ.O53R154sjyE0I5iv_ykFkboz7i5qeQwRRk-Kve9hjIs'
        
    def SendRequest(self,url,method):
        headers ={
            'Content-Type':'application/json',
            'Authorization': self.auth,
        }
        if method =='get' or method =='GET':
            response = requests.get(url,headers=headers)
            content=response.content.decode("utf-8") 
            content=json.loads(content)
            return content
        else:
            response = requests.post(url,headers=headers)
            content=response.content.decode("utf-8") 
            content=json.loads(content)
            return content
        


api=ProbelyApiRequest()

#Exercise 1

"""
A generic risk score is calculated by adding 1 point for every low severity finding, 10 points for
each medium severity and 40 for high severity findings. Only the findings that have not been
fixed count towards the score.
"""

#Calculate the risk score for the target with ID RzXFSNHH3qUY 

content=api.SendRequest(api.url,"get")

target_id=content["results"][0]["id"] # ID RzXFSNHH3qUY


#Now we can send a request to start a scan on target_id RzXFSNHH3qUY
url='https://api.probely.com/targets/'+target_id+'/scan_now/'

#target_scan_content=api.SendRequest(url,"post")

#print(target_scan_content) 

#b'{"id":"ohxpSnKyQEHi","target":{"id":"RzXFSNHH3qUY","name":"","desc":"","url":"https://test-0.ox.qa.prbly.win","stack":[{"id":"3XxEPJEIygTD","name":"PHP","desc":""},{"id":"Dzjp24cG2ZcY","name":"Nginx","desc":""}]},"status":"queued","started":null,"completed":null,"scan_profile":"normal","lows":0,"mediums":0,"highs":0,"created":"2019-01-31T16:23:07.613516Z","created_by":{"id":"31jGBbzvb32k","email":"","name":"exercise 1"},"changed":"2019-01-31T16:23:07.613516Z","changed_by":{"id":"31jGBbzvb32k","email":"","name":"exercise 1"}}'

#scan_id=target_scan_content["id"]
scan_id='ohxpSnKyQEHi'



#Scanning status is queued so lets see its progression
#https://api.probely.com/targets/AxtkqTE0v3E-/scans/S6dOMPn0SnoH/
url=api.url+target_id+'/scans/'+scan_id

scan_status=api.SendRequest(url,"get")

#if scan staus is "completed"

if scan_status["status"]=='completed':
    
else:
    print ("Scan Status",scan_status["status"])   

#headers = {
#    'Content-Type': 'application/json',
#    'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwcm9iZWx5IiwidXNlcm5hbWUiOiJZVWt3WjhHZFhpUmkiLCJqdGkiOiJRRDdoWUFvdjdTYnIifQ.O53R154sjyE0I5iv_ykFkboz7i5qeQwRRk-Kve9hjIs',
#}
#
#response = requests.get('https://api.probely.com/targets/', headers=headers)
#
#
##print(response.content)
#
#
##Exercise 1
#
#"""
#A generic risk score is calculated by adding 1 point for every low severity finding, 10 points for
#each medium severity and 40 for high severity findings. Only the findings that have not been
#fixed count towards the score.
#"""
#
##Calculate the risk score for the target with ID RzXFSNHH3qUY 
#
#content=response.content.decode("utf-8") 
#content=json.loads(content)
#print (content["results"][0]["id"])
#
#target_id=content["results"][0]["id"]
#   
##Make scan on target id
##https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/
##curl https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/ \
##  -X POST \
##  -H "Content-Type: application/json" \
##  -H "Authorization: JWT PROBELY_AUTH_TOKEN"
#
#new_url='https://api.probely.com/targets/'+target_id+'/scan_now/'
#headers = {
#    'Content-Type': 'application/json',
#    'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwcm9iZWx5IiwidXNlcm5hbWUiOiJZVWt3WjhHZFhpUmkiLCJqdGkiOiJRRDdoWUFvdjdTYnIifQ.O53R154sjyE0I5iv_ykFkboz7i5qeQwRRk-Kve9hjIs',
#}
#
#response = requests.post('https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/', headers=headers)
#
#print(response.content)