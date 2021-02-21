// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../App/Screens/List';
import Profile from '../App/Screens/Profile';
import Detalle from '../App/Screens/Detalle';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootMiddleware from './Middleware/root.middleware';
import { getListReducer } from '../App/Reducers/GetList';





const Stack = createStackNavigator();
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let createWithRoot = applyMiddleware(rootMiddleware);

const store = createStoreWithMiddleware(
  getListReducer,
  {},
  createWithRoot
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Detalle" component={Detalle} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;