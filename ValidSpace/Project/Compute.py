






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

def order(nums,ops):
    new_nums=[]
    new_ops=[]
    for i in range(len(ops)):
        if ops[i]=='*' or ops[i]=='/':
            new_nums.append(nums[i])
            new_nums.append(nums[i+1])
            new_ops.append(ops[i])
    
    for i in range(len(ops)):
        if ops[i]=='+' or ops[i]=='-':
            if i==0:
                new_nums.append(nums[i])
                new_ops.append(ops[i])
            else:    
                new_nums.append(nums[i+1])
    #            new_nums.append(nums[i+1])
                new_ops.append(ops[i])
    
    return new_nums,new_ops   
            
            
            


def calculation(num1,num2,op):
    conditions={"+":lambda num1,num2: num1+num2,
                "-":lambda num1,num2: num1-num2,
                "*":lambda num1,num2:num1*num2,
                "/":lambda num1,num2:num1/num2
                }
    return conditions[op](num1,num2)
        

def compute(nums,ops):
    total=None# accumulates result. it starts as None to know if it is the first time doing algorithm
    
    #first and second num are pair of nums that will do operation first(op)second
    first_num=0
    second_num=0
    
    op=None # actual operation poped
    op_next=None #next operation poped
    
    # this number is used when actual operation to do has less priority than next op
    # to do next_num(op)first_num
    num_next=0 
    
    
    #postfix algorithm--------------
    while len(ops)!=0:
        #first time
        if total==None:
            op=ops.pop()
            second_num=nums.pop()
            first_num=nums.pop()
            
            #if op is of high priority
            if op=="/" or op=="*":
                total=compute(first_num,second_num,op)
            
            #if op is not priority
            else:
                
                ops_aux=ops.copy()#put array on auxiliary to not change it
                op_next=ops_aux.pop()
                #test priority of next op
                #if next op is not priority
                if op=="+" or op=="-":
                    total=compute(first_num,second_num,op)
                
                #if next op is priority     
                else:        
                    num_next=nums.pop()
                    total=compute(num_next,first_num,op_next)
                    
                    #make the remaining operation
                    total=compute(total,second_num,op)
                
        #not the first time    
        else:
            #ops is empty
            if len(ops)==0:
                break
            #ops still not empty
            else:
                op=ops.pop()
                first_num=nums.pop()
                second_num=total
                
                #if op is of high priority
                if op=="/" or op=="*":
                    total=compute(first_num,second_num,op)
                
                #not high priority op
                else:
                    
                    ops_aux=ops.copy()#put array on auxiliary to not change it
                    op_next=ops_aux.pop()
                    #test priority of next op
                    #if next op is not priority
                    if op=="+" or op=="-":
                        total=compute(first_num,second_num,op)
                    
                    #if next op is priority     
                    else:        
                        num_next=nums.pop()
                        value=compute(num_next,first_num,op_next)
                        
                        #make the remaining operation
                        total=compute(value,total,op)
    
    
    
    


print(__name__)


#Main______________

nums,ops=parse('1 + 2 * 5 + 3/4')
#nums,ops=order(nums,ops)
print(nums,ops)
print(compute(nums,ops))