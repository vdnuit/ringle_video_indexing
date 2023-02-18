import json
f = open("C:/Users/82109/Desktop/ringle/front/src/assets/subtitle.txt", 'r')
data={
    # 'subtitles':[{
    #     'number':1,
    #     'start': '00:00:09.960',
    #     'end' : '00:00:12.320',
    #     'subtitle':'Wonderful. Wonderful. Thank you so much.'
    # }]
}
lines=[]
while True:
    line = f.readline()
    lines.append(line)
    if not line: break
i=0;
groups=[]
while True:
    if i+4 > len(lines): break
    group={}
    if lines[i]=='\n':
        
        group['number']=lines[i+1]
        group['number']=int(group['number'].replace('\n', ''))

        times=lines[i+2].split(" --> ")

        group['start']=times[0]
        group['end']=times[1]
        group['end']=group['end'].replace('\n', '')

        group['subtitle']=lines[i+3]+lines[i+4]
        group['subtitle']=group['subtitle'].replace('\n', ' ')
    if group:
        groups.append(group)

    i+=1
data['subtitles']=groups

print(data)

f.close()
with open('./subtitle.json', 'w', encoding='utf-8') as make_file:
    json.dump(data, make_file, indent="\t")