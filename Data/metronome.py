import time

intervals = []

for i in range(0,5000):
    prev = time.time()
    time.sleep(1)
    intervals.append(int((time.time() - prev) * 1000))

with open("60met.txt", "a") as f:
    for i in intervals:
        f.write(str(i) + "\n")

