import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
import numpy as np

bpm60Metroband = np.loadtxt("./60bpm.txt")
bpm120Metroband = np.loadtxt("./120bpm.txt")
bpm240Metroband = np.loadtxt("./240bpm.txt")
bpm240RadioMetroband = np.loadtxt("./radio_bpm/240.txt")

bpm60Computer = np.loadtxt("./60met.txt")
bpm120Computer = np.loadtxt("./120met.txt")
bpm240Computer = np.loadtxt("./240met.txt")

bpmData = [(bpm60Metroband, "Interval lengths for 60 BPM (Haptic Metroband)"), 
           (bpm120Metroband, "Interval lengths for 120 BPM (Haptic Metroband)"), 
           (bpm240Metroband, "Interval lengths for 240 BPM (Haptic Metroband)"), 
           (bpm60Computer, "Interval lengths for 60 BPM (Computer)"), 
           (bpm120Computer, "Interval lengths for 120 BPM (Computer)"), 
           (bpm240Computer, "Interval lengths for 240 BPM (Computer)"),
           (bpm240RadioMetroband, "Interval lengths for 240 BPM (Metroband, Radio Module)")]
graph = 6

plt.style.use('ggplot')

fig, ax = plt.subplots()
fig.set_figheight(10)
fig.set_figwidth(20)

plot = ax.boxplot(bpmData[graph][0], patch_artist=True,
                showmeans=False, showfliers=True, widths=(0.1),
                medianprops={"color": "white", "linewidth": 0.5},
                boxprops={"facecolor": "C0", "edgecolor": "white",
                          "linewidth": 0.5},
                whiskerprops={"color": "C0", "linewidth": 1.5},
                capprops={"color": "C0", "linewidth": 1.5}, vert=False)

ax.set_title(bpmData[graph][1])

plt.table(
    cellText=[[round(np.mean(bpmData[graph][0]), 3), round(np.std(bpmData[graph][0]), 3), np.median(bpmData[graph][0]), np.size(bpmData[graph][0])]],
    cellLoc='center',
    colLabels=["Mean", "Standard Deviation", "Median", "N"],
    colColours=[(0.749,0.749,0.749,1)]*8,
    loc="bottom",
    bbox=[0, -0.3, 0.3, 0.1]
)

ax.set(xticks=np.arange(min(bpmData[graph][0]), max(bpmData[graph][0]), 10))

plt.subplots_adjust(bottom=0.4)
plt.show()