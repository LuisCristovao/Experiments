import requests
import json

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwcm9iZWx5IiwidXNlcm5hbWUiOiJZVWt3WjhHZFhpUmkiLCJqdGkiOiJRRDdoWUFvdjdTYnIifQ.O53R154sjyE0I5iv_ykFkboz7i5qeQwRRk-Kve9hjIs',
}

response = requests.get('https://api.probely.com/targets/', headers=headers)


#print(response.content)


#Exercise 1

"""
A generic risk score is calculated by adding 1 point for every low severity finding, 10 points for
each medium severity and 40 for high severity findings. Only the findings that have not been
fixed count towards the score.
"""

#Calculate the risk score for the target with ID RzXFSNHH3qUY 

content=response.content.decode("utf-8") 
content=json.loads(content)
print (content["results"][0]["id"])

target_id=content["results"][0]["id"]
   
#Make scan on target id
#https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/
#curl https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/ \
#  -X POST \
#  -H "Content-Type: application/json" \
#  -H "Authorization: JWT PROBELY_AUTH_TOKEN"

new_url='https://api.probely.com/targets/'+target_id+'/scan_now/'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwcm9iZWx5IiwidXNlcm5hbWUiOiJZVWt3WjhHZFhpUmkiLCJqdGkiOiJRRDdoWUFvdjdTYnIifQ.O53R154sjyE0I5iv_ykFkboz7i5qeQwRRk-Kve9hjIs',
}

response = requests.post('https://api.probely.com/targets/RzXFSNHH3qUY/scan_now/', headers=headers)

print(response.content)