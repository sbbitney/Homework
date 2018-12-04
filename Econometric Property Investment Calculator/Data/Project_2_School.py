import requests
import json
import pandas as pd
import numpy as np

import xml.etree.ElementTree as ET



URL = 'https://api.greatschools.org/schools/nearby'

# masterData_csv = pd.read_csv("./Data/latlon_schools_NA.csv")
masterData_csv = pd.read_csv("./Data/masterDataCLEAN.csv")
master_df = pd.DataFrame(masterData_csv)

# Loop through Requests (Partial Params):
alat = []
alon = []
s_name = []
ratings = []

counter = 1


for row in master_df.itertuples():
params = {
'key' : '41c6b7482243181cbb1f77b88b04eb12',
'state' : 'TX',
'lat' : Lat,
'lon' : Lng, 
'limit' : 1,
'schoolType' : 'public'
}

school_list = requests.get(URL, params=params).json()
new_school = school_list.text
root = ET.fromstring(new_school)
#school_list.text

alat.append(Lat)
alon.append(Lng)

for child in root:
    print(child[1].text, child[5].text)
    s_name.append(child[1].text)
    try:
        rating = int(child[5].text)
        ratings.append(rating)
    except:
        ratings.append("NA")
        continue

    print(f"Processed Row # {counter}.")
    counter += 1


    
print("Finished Requests.")