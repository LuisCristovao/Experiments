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
    @staticmethod    
    def Divisory():
        print("\n________________________________\n\n________________________\n")
    
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
    
    @staticmethod
    def SepResults(results1,results2):
        only_in_first=[]
        only_in_second=[]
        on_both=[]
        
        if len(results1)<=len(results2):
            for i in range(len(results1)):
                for j in range(len(results2)):
                    res1=results1[i]
                    res2=results2[j]
                    if res1["id"]==res2["id"]:
                        on_both.append({"id":res1["id"],"index1":i,"index2":j})
                    else:
                        if j==len(results2)-1:
                            only_in_first.append({"id":res1["id"]})
                    
                    
    
    def CompareFindings(self,target_id,scan_id1,scan_id2):
        findings1=self.ListFindings(target_id,scan_id1)
        findings2=self.ListFindings(target_id,scan_id2)
        
        print("findings results from",scan_id1,":",len(findings1["results"]))
        print("findings results from",scan_id2,":",len(findings2["results"]))
        self.Divisory()
        
        
        
        
        
        fixed_on_first=[]
        not_fixed_on_both=[]
        new_in_second=[]
        
        if len(findings1["results"])>=len(findings2["results"]):
            
            for i in range(len(findings1["results"])):
                result1=findings1["results"][i]
                result2=findings2["results"][i]
                print("result",i)
                print("result1 id:",result1["id"])
                print("result2 id:",result2["id"])
                
            
        
        

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

#api.CompareFindings(target_id,scan_id1,scan_id2)

#
#findings1=api.ListFindings(target_id,scan_id1)
#findings2=api.ListFindings(target_id,scan_id2)
#
#for key in findings1["results"][3]:
#    print(key)
#    print(findings1["results"][3][key])
#
#for key in findings2["results"][3]:
#    print(key)
#    print(findings2["results"][3][key])


api.CompareFindings(target_id,scan_id1,scan_id2)

