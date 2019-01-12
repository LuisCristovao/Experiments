# -*- coding: utf-8 -*-
import DB as db



def parse(x):
    operators = set('+-*/')
    op_out = []    #This holds the operators that are found in the string (left to right)
    num_out = []   #this holds the non-operators that are found in the string (left to right)
    buff = []
    for c in x:  #examine 1 character at a time
        if c in operators:  
            #found an operator.  Everything we've accumulated in `buff` is 
            #a single "number". Join it together and put it in `num_out`.
            num_out.append(''.join(buff))
            buff = []
            op_out.append(c)
        else:
            #not an operator.  Just accumulate this character in buff.
            buff.append(c)
    num_out.append(''.join(buff))
    return num_out,op_out


def reconstructExpression(nums,ops):
    out=""
    while len(nums)!=0:
        n1=nums.pop(0)
        op=ops.pop(0)
        n2=nums.pop(0)
        out+=n1+op+n2
        
    return out
        


def functionSubs(expression):
    nums,ops=parse(expression)
    stack=[]
    result=""
    for i in range(len(nums)):
        stack.append(nums[i])
        while len(stack)!=0:
            #print(n)
            f=db.getFunction(str(stack.pop()))
            #if f is a function then it can have more operations
            if f!='' and f!=None:
                stack.append(f)
                result=f
            else:#change nums array
                nums[i]=result
    
    return nums,ops

def compute(expression):
    return format(eval(expression))



print(__name__)


nums,ops=functionSubs("f1+f3")
val=reconstructExpression(nums,ops)
print(val)
nums,ops=functionSubs(val)
#print(nums,ops)
#val=reconstructExpression(nums,ops)
#print(val)

