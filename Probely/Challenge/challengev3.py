#Question2

'''
The same program that calculates the risk score should execute a second task:
Without using file resources, i.e., using only in-memory data structures, compare the list of
findings between any two scans. You can use scans 3hbQvcGEmLbW and 2RnxpEEm2qd5 as
examples.

Compare two scans and print which findings were fixed (not present in the second scan),
which are still not fixed (appear in both scans) and which ones are new (only in the
second scan).

The output does not need to be pretty, just readable. You can just print the minimum information
to identify the findings (ID #, URL and vulnerability type).

'''

#In short I should compare two scans (both given in the example)


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
        
    def GetScan(self,target_id,scan_id):
        url=self.url+target_id+'/scans/'+scan_id

        scan_result=self.SendRequest(url,"get")
        return scan_result
    
    def RiskScore(self,target_id,scan_id):
        scan=self.GetScan(target_id,scan_id)
        risk_score=scan['lows']+10*scan['mediums']+40*scan['highs'] 
        print("risk score for id",target_id,"is",risk_score)
    
    def ListFindings(self,target_id,scan_id):
        url=self.url+target_id+'/findings/?scan='+scan_id
        content=self.SendRequest(url,"get")
        return content
#    def getFindings
        

#def compareScans(scan1,scan2):
#    fixed=[]
#    not_fixed=[]
#    new=[]
#    for key in scan1:
#        if scan1[key]        

api=ProbelyApiRequest()

#Exercise 2

scan_id1='3hbQvcGEmLbW'
scan_id2='2RnxpEEm2qd5'
target_id='RzXFSNHH3qUY'

#scan_result1=api.GetScan(target_id,scan_id1)
#scan_result2=api.GetScan(target_id,scan_id2)

#api.RiskScore(target_id,scan_id2)

print(api.ListFindings(target_id,scan_id1)["results"][0]["fix"])