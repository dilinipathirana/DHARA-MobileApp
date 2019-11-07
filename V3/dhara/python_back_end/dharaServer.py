#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!/usr/bin/env python
# coding: utf-8

# In[ ]:


# Create API of ML model using flask

'''
This code takes the JSON data while POST request an performs the prediction using loaded model and returns
the results in JSON format.
'''

# Import libraries
import numpy as np
import requests
import tensorflow as tf
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
print("t1")
model = pickle.load(open('fakemodelLSTM2.pkl','rb'))
graph = tf.get_default_graph()
print("t2")

@app.route('/api',methods=['POST'])
def predict():
    global graph
    print("t3")
    with graph.as_default():
        # Get the data from the POST request.
        #data = {'id': 0.8}#request.get_json(force=True)
        r = requests.get('https://environment.data.gov.uk/flood-monitoring/id/stations/1491TH/readings?_sorted&_limit=10')
        dataj=r.json()
        levels = [item['value'] for item in dataj['items']]
        data={"value":levels[0]}
        arr=np.array( tuple(data.values()))
        darray=arr.reshape((1, len(arr), 1))
        print("@@@@@")
        # Make prediction using model loaded from disk as per the data.
        print("t4")
        prediction = model.predict(darray)
        print("t5")
        # Take the first value of prediction
        output =prediction.reshape(4,1)
        print("&&&&&")
        mydict=[{"hour1":round(output.item(0),3),"hour2":round(output.item(1)),"hour3":round(output.item(2)),"hour4":round(output.item(3),3)}]
        

    return jsonify(mydict)
    #return data

if __name__ == '__main__':
    #pp.debug=True
    app.run(port=5001, debug=False)


# In[ ]:





# In[ ]:




