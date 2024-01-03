hex={\
    "0":"0000","1":"0001","2":"0010","3":"0011","4":"0100",\
    "5":"0101","6":"0110","7":"0111","8":"1000","9":"1001",\
    "a":"1010","b":"1011","c":"1100","d":"1101","e":"1110",\
    "f":"1111" 
     }
    
def hex_dec(ew,mw,h):
    x=""
    for a in h:
        x+=hex.get(str(a))
    sign=x[0]
    assert len(x)==ew+mw+1
    e=x[1:ew+1]
    m=x[ew+1:]
    exp=-2**(ew-1)+1
    if set(e)=={'0'}:
        mant=0
        exp+=1
        print("denorm")
    else:
        mant=1.0
    for a,b in enumerate(e):
        exp+=int(b)*(2**(len(e)-1-a))
    for a,b in enumerate(m):
        #print(int(b)*(2**-(a+1)))
        mant+=int(b)*(2**-(a+1))
    if sign=="0":
        s=1
    elif sign=="1":
        s=-1
    print(f"{s},{exp},{mant}")
    #print(f"{sign},{e},{m}")
    #print(-2**(ew-1))
    return(s*(2**exp)*mant)
print(hex_dec(5,10,"8001")) 