import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
import numpy as np

bpm60 = np.loadtxt("./60bpm.txt", delimiter="\n")
bpm120 = np.loadtxt("./120bpm.txt", delimiter="\n")
bpm240 = np.loadtxt("./240bpm.txt", delimiter="\n")

bpmData = [bpm60, bpm120, bpm240]
graph = 2

plt.style.use('ggplot')

fig, ax = plt.subplots()
fig.set_figheight(10)
fig.set_figwidth(20)

plot = ax.boxplot(bpmData[graph], patch_artist=True,
                showmeans=False, showfliers=True, widths=(0.1),
                medianprops={"color": "white", "linewidth": 0.5},
                boxprops={"facecolor": "C0", "edgecolor": "white",
                          "linewidth": 0.5},
                whiskerprops={"color": "C0", "linewidth": 1.5},
                capprops={"color": "C0", "linewidth": 1.5}, vert=False)

ax.set_title(f"Interval lengths for 120 BPM")

plt.table(
    cellText=[[round(np.mean(bpmData[graph]), 3), round(np.std(bpmData[graph]), 3), np.median(bpmData[graph]), np.size(bpmData[graph])]],
    cellLoc='center',
    colLabels=["Mean", "Standard Deviation", "Median", "N"],
    colColours=[(0.749,0.749,0.749,1)]*8,
    loc="bottom",
    bbox=[0, -0.3, 0.3, 0.1]
)

ax.set(xticks=np.arange(min(bpmData[graph]), max(bpmData[graph]), 10))

plt.subplots_adjust(bottom=0.4)
plt.show()