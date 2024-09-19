import re

times = [
"10:40 AM", 
"11:20 AM", 
"12:00 PM", 
"12:40 PM", 
"1:20 PM", 
"2:00 PM", 
"2:40 PM", 
"3:20 PM", 
"4:00 PM", 
"4:40 PM", 
"5:20 PM", 
"6:00 PM", 
"6:40 PM", 
"7:20 PM", 
]

times = [[i for i in re.split(r'[: ]', t)] for t in times]
times = [[int(t[0]), int(t[1]), t[2]] for t in times]
for i, t in enumerate(times):
    if t[2] == "PM" and t[0] != 12:
        t[0] += 12
print("[")
for t in times:
    print("\t{\"h\": " + str(t[0]) + ", \"m\": " + str(t[1]) + "}" + (", " if t != times[-1] else ""))
print("]")