
import json

with open("front\src\assets\subtitle.json", "r") as f:
    subtitle = json.load(f)

with open("front\src\assets\summarizeIndex.json", "r") as f:
    index = json.load(f)

for i in index['indexes']:

    hour=index['indexes']['start'][0:2]
    minute=index['indexes']['start'][3:5]
    second=index['indexes']['start'][6:8]
    start=int(hour)*60*60+int(minute)*60+int(second)

    hour=index['indexes']['end'][0:2]
    minute=index['indexes']['end'][3:5]
    second=index['indexes']['end'][6:8]
    end=int(hour)*60*60+int(minute)*60+int(second)

    for j in subtitle['subtitles']:
        if sub_start<start:
            continue
        if sub_start>=end:
            break