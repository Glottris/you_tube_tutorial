# React-Native you_tube_tutorial
## Overview
This tutorial will go thru step by step how to make a video app that browse YouTube, using react-native, react-native extensions: React Navigation and YouTube API.v3
Insert Image here!

## Prerequisites 
* a code editor
* Node.js
* YouTube API key
* adb / android studio
* npm or yarn as packet manager, I will be using yarn in the examples.

This overlaps with React tutorial:
https://github.com/appsupport-at-acorn/react-and-rn-intro/blob/master/tutorial/react/prerequisites.adoc

## Setup
In your shell of preference at the location you wish to store the project run the following
``` bash
//install react native globaly?needed
> npm install -g react-native-cli

> yarn install
> //(or npm install)
> react-native init you_tube_tutorial
```
this initiates new project with our chosen name, lets go inside and have a look
``` bash
> cd you_tube_tutorial
> ll
	android/
	App.js
	app.json
	index.js
	ios/
	node_modules/
	package.json
	yarn.lock
```
App.js is the main file of out app, there are 2 folders for android and ios projects. 

import to android studio
start emulator
```
> npm start
> adb reverse tcp:8081 tcp:8081

> adb shell input keyevent 82 (or shake phone?)

// on Phone 
// Dev Settings > set IP and port of the local dev server to:
// 10.0.1.1:8081 example in error message
```

With any luck you can now edit App.js and see updates on your phone or emulator. The app is equivalent of hello wold it just prints some text.
edit it to test hot re-load. 

App.js looks something like this
``` javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
``` 
Lets clean it up a little before we start be deleting the comment, the instructions and the StyleSheet data,
it should look something like this:
``` javascript
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Hello edited!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
```
Now what we have left is:
* imports of the most basic react-native elements
* we export a default class component that contains a render function with some text in a view
* an empty styles constant

Before we continue, lets start with thinking of our component structure.
Our goal is something like this;
![alt text](https://github.com/Glottris/you_tube_tutorial/blob/master/assets/Mockup.jpg "Mock-up")

A scrolling list of videos, with some title information and an app header,
and if a video is kicked we should go to a different view where it is played in full-screen, here we should be able to go back using the 'back button' is it called that? the guy without a smartphone is writing a tutorial here Kappa.

Lets start with the deepest element and also the information we need to get from somewhere the video.
Here we could use a webView and a regular youtube embed link, 
but we will use a react-native package called react-native-youtube
https://www.npmjs.com/package/react-native-youtube
We will also use 'react-navigation' for the navigation behavior.
let go ahead and install these packages in our project
```bash 
> yarn add react-native-youtube //npm install reac...
> yarn add react-navigation
> react-native link
```
and in App.js add:
``` javascript
import { YouTube } from 'react-native-youtube';
import { createStackNavigator } from 'react-navigation';
```

now we need to get the video data from youtube, here we will use the youTube.v3 API key.
We need to create a URL to fetch the information from the API
copy the URL bellow and insert you API key where it says 'INSERT_API_KEY_HERE' in friendly text.
```
> https://www.googleapis.com/youtube/v3/search/?key=INSERT_API_KEY_HERE&channelId=UCYGRnZ50MyvueoDN_Vo2PHA&part=snippet,id&order=date&maxResults=4
```
go ahead an paste the resulting link in a browser to see how the data we get back from youtube is structured.

The other variables in the URL are; channelId, part, id&order, maxResults.
Lets add some const variables to hold these for now, bellow our imports.
I have used acorns channelId in the example bellow.
``` javascript
const apiKey = 'INSERT_API_KEY_HERE';
const channelId = 'UCYGRnZ50MyvueoDN_Vo2PHA';
const maxResults = '4';
```

We will use the componentDidMount method that is automatically run after a component is mounted.
https://reactjs.org/docs/react-component.html#componentdidmount
