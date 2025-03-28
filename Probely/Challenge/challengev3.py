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
        print("\n________________________________\n________________________________\n")
    
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
                        on_both.append({"id":res1["id"],"index1":i,"index2":j,"state":res1["state"]})
                        break
                    else:
                        if j==len(results2)-1:
                            only_in_first.append({"id":res1["id"],"index":i,"state":res1["state"]})
            
            for i in range(len(results2)):
                res2=results2[i]
                for j in range(len(on_both)):
                    if res2["id"]==on_both[j]["id"]:
                        
                        break
                    else:
                        if j==len(on_both)-1:
                            only_in_second.append({"id":res2["id"],"index":i,"state":res2["state"]})
        
        else:
            for i in range(len(results2)):
                for j in range(len(results1)):
                    res1=results1[j]
                    res2=results2[i]
                    if res1["id"]==res2["id"]:
                        on_both.append({"id":res1["id"],"index1":i,"index2":j,"state":res1["state"]})
                        break
                    else:
                        if j==len(results1)-1:
                            only_in_second.append({"id":res2["id"],"index":j,"state":res2["state"]})
            
            for i in range(len(results1)):
                res1=results1[i]
                for j in range(len(on_both)):
                    if res1["id"]==on_both[j]["id"]:
                        break
                    else:
                        if j==len(on_both)-1:
                            only_in_first.append({"id":res1["id"],"index":i,"state":res1["state"]})
        
        
        
        
        
        
        return (only_in_first,only_in_second,on_both)
    
    
    
    def CompareFindings(self,target_id,scan_id1,scan_id2):
        findings1=self.ListFindings(target_id,scan_id1)
        findings2=self.ListFindings(target_id,scan_id2)
        
        print("findings results from",scan_id1,":",len(findings1["results"]))
        print("findings results from",scan_id2,":",len(findings2["results"]))
        self.Divisory()
        
        
        (only_in_first,only_in_second,on_both)=self.SepResults(findings1["results"],findings2["results"])
                
#        for val in on_both:
#            print(val)
#        self.Divisory()
#        for val in only_in_first:
#            print(val)
#        self.Divisory()
#        for val in only_in_second:
#            print(val)
        print("findings \"fixed\" not present in second scan:")
        for val in only_in_first:
            if val["state"]=="fixed":
                print("id:",val["id"])
        

        self.Divisory()

        print("NotFixed findings equal in both scans:")
        for val in on_both:
            if val["state"]=="notfixed":
                print("id:",val["id"])


        self.Divisory()

        print("New in second scan")
        for val in only_in_second:
            print("id:",val["id"])                
        
        

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

