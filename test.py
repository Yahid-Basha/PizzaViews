lis = [0,1,2,2,3,0,4,2]
# print lis
for i in range(len(lis)):
    print(lis[i])

for i in range(lis.count(2)):
    lis.remove(2)

print(lis)