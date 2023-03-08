# reformat all the data files so that they can be printed onto paper
# this means that the data should be moved from one number per line
# to multiple numbers per line, in csv format. Use numpy.reshape()
# to do this. The data should be in the format:
# 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
# 17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32
# 33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48
# ...

import numpy as np

# Path: Data\reformatting.py
for txt in ["60bpm.txt", "120bpm.txt", "240bpm.txt", "60met.txt", "120met.txt", "240met.txt"]:
    data = np.loadtxt(f"./{txt}", dtype=float)

    # make the array a multiple of 16 by adding np.NaN to the end
    # of the array
    for i in range(0, 16 - (len(data) % 16)):
        data = np.append(data, np.NaN)

    # reshape the array into a 2D array with 16 columns
    data = np.reshape(data, (len(data)//16, 16))

    # save the array to a file
    open(f"./Reformatted/{txt}", "w").close()
    np.savetxt(f"./Reformatted/{txt}", data, delimiter=", ", fmt="%s")
