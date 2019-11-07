#!/usr/bin/env python
# coding: utf-8

# In[1]:


# univariate multi-step lstm
from math import sqrt
from numpy import split
from numpy import array
from pandas import read_csv
from sklearn.metrics import mean_squared_error
from matplotlib import pyplot
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Flatten
from keras.layers import LSTM
import numpy as np


# In[14]:


# split a univariate dataset into train/test sets
def split_dataset(data):
	# split into standard days
    #prints from 1st data point to (full datset-328 from the end) datapoint and from the end point of train set to (full datset-6 from the end) data point
	train, test = data[1:7057], data[7057:]
    #train, test = data[1:7057], data[7057:-13]
	# restructure into windows of 4hrs data
	Train = np.array(split(train.value, len(train)))
	Test = np.array(split(test.value, len(test)))
	return Train, Test


# In[15]:


# convert history into inputs and outputs
def to_supervised(train, n_input, n_out=4):
	# flatten data
	data = train.reshape((train.shape[0], train.shape[1]))
	X, y = list(), list()
	in_start = 0
	# step over the entire history one time step at a time
	for _ in range(len(data)):
		# define the end of the input sequence
		in_end = in_start + n_input
		out_end = in_end + n_out
		# ensure we have enough data for this instance
		if out_end <= len(data):
			x_input = data[in_start:in_end, 0]
			x_input = x_input.reshape((len(x_input), 1))
			X.append(x_input)
			y.append(data[in_end:out_end, 0])
		# move along one time step
		in_start += 1
	return array(X), array(y)


# In[16]:


# evaluate a single model
def evaluate_model(train, test, n_input,Trainedmodel):
	# fit model
	# fit model
	
	history = [x for x in train]
	# walk-forward validation over each week
	predictions = list()
	for i in range(len(test)):
		# predict the week
		yhat_sequence = forecast(model, history, n_input)
		# store the predictions
		predictions.append(yhat_sequence)
		# get real observation and add to history for predicting the next week
		history.append(test[i, :])
	# evaluate predictions hours for each day
	predictions = array(predictions)
	#score, scores = evaluate_forecasts(test[:, 0], predictions)
	return predictions


# In[17]:


# make a forecast
def forecast(model, history, n_input):
	# flatten data
	data = array(history)
	data = data.reshape((data.shape[0], data.shape[1]))
	# retrieve last observations for input data
	input_x = data[-n_input:, 0]
	# reshape into [1, n_input, 1]
	input_x = input_x.reshape((1, len(input_x), 1))
	# forecast the next week
	yhat = model.predict(input_x, verbose=0)
	# we only want the vector forecast
	yhat = yhat[0]
	return yhat


# In[26]:


def build_model(train, n_input):
	# prepare data
    train_x, train_y = to_supervised(train, n_input)
	# define parameters
    verbose, epochs, batch_size = 1, 50, 10
    n_timesteps,n_outputs = train_x.shape[1],train_y.shape[1]
	# define model
    model = Sequential()
    model.add(LSTM(500, activation='relu'))
    model.add(Dense(200, activation='relu'))
    model.add(Dense(200, activation='sigmoid'))
    model.add(Dense(n_outputs))
    model.compile(loss='mse', optimizer='adam',metrics=['acc'])
	# fit network
    model.fit(train_x, train_y, epochs=epochs, batch_size=batch_size, verbose=verbose)
    return model


# In[23]:



# load the new file
dataset = read_csv('CleanedData(29-Aug).csv', header=0, infer_datetime_format=True, parse_dates=['time'], index_col=['time'])
train, test = split_dataset(dataset)


# In[24]:


train_x, train_y=to_supervised(train,1)


# In[27]:


model=build_model(train,1)


# In[28]:


# evaluate the model
scores = model.evaluate(train_x, train_y, verbose=0)
print("%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))


# In[ ]:


test_x,test_y=to_supervised(test, 1)
y_pred = model.predict(test_x)
plt.figure(figsize=(10,12))
plt.plot(test_y)
plt.plot(y_pred)
plt.legend(['test', 'pred'])


# In[ ]:


test.shape


# In[160]:


import pickle
pickle.dump(model, open('fakemodelLSTM2.pkl','wb'))


# In[117]:


history = [x for x in test]
data = array(history)
data = data.reshape((data.shape[0], data.shape[1]))
# retrieve last observations for input data
input_x = data[-1:, 0]
print(input_x.shape)
# reshape into [1, n_input, 1]
input_x = input_x.reshape((1, len(input_x), 1))
# forecast the next week
yhat = model.predict(input_x, verbose=0)


# In[136]:


yhat=yhat.reshape(4,1)


# In[137]:


yhat.item(1)


# In[149]:


mydict={"1h":0.5,"2h":0.5,"3h":0.5,"4h":0.5}


# In[150]:


mydict={"1h":yhat.item(0),"2h":yhat.item(1),"3h":yhat.item(2),"4h":yhat.item(3)}


# In[155]:


import json

json.dumps(mydict)


# In[159]:


import Flask as flask
from flask import jsonify

flask.jsonify(mydict)


# In[ ]:




