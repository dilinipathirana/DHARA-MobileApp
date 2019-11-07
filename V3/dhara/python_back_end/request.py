#!/usr/bin/env python
# coding: utf-8

# In[5]:


import requests

# URL
url = 'http://localhost:5000/api'

# Change the value of experience that you want to test
r = requests.post(url,json={'id':0.08})
print(r.json())


# In[ ]:




