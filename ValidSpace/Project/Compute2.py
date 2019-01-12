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
    for i in range(len(ops)):
        n1=nums[i]
        op=ops[i]
        n2=nums[i+1]
        if i==0:
            out+=n1+op+n2
        else:
            out+=op+n2
        
    return out
        
def isNumber(string_number):
    try:
        float(string_number)
        return True
    except:
        return False


def actualFunctions(nums):
    actual_functions=[]
    for n in nums:
        if not isNumber(n):
            actual_functions.append(n)
    
    return actual_functions

def functionSubs(expression):
    nums,ops=parse(expression)
    stack=[]
    result=""
    for i in range(len(nums)):
        stack.append(nums[i])
        while len(stack)!=0:
            #print(n)
            if not isNumber(nums[i]):
                f=db.getFunction(stack.pop())
                #if f is a function then it can have more operations
                if f!='' and f!=None:
                    stack.append(f)
                    result=f
                else:#change nums array
                    nums[i]=result
                    
            else:
                stack.pop()
            
    
    return nums,ops

def compute(expression):
    return format(eval(expression))

def CompletParse(expression):
    test=False
    prev_val=""
    val=expression
    while not test:
        nums,ops=functionSubs(val)
        val=reconstructExpression(nums,ops)
        if val==prev_val:
            test=True
        else:
            prev_val=val
            
    return val

print(__name__)


#nums,ops=functionSubs("f1+f3")
#val=reconstructExpression(nums,ops)
#print(val)
#nums,ops=functionSubs(val)
#print(nums,ops)
#val=reconstructExpression(nums,ops)
#print(val)
#print(functionSubs(val)==(['1', '2', '3', '1', '2', '3', '1', '2', '3'], ['+', '+', '+', '+', '+', '+', '+', '+']))
#print(CompletParse("f1+f3"))