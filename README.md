
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
>
> adb shell input keyevent 82 (or shake phone?)
// and enable hot reloade

// may need
// adb reverse tcp:8081 tcp:8081
// Dev Settings > set IP and port of the local dev server to:
// 10.0.1.1:8081 example in error message
```
## Hello world...
With any luck you can now edit App.js and see updates on your phone or emulator. The app is equivalent of hello wold it just prints some text.
Take a look at App.js and edit something to test hot re-load. 

Lets clean it up a little before we start, delete the comment, the instructions and the StyleSheet data,
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

## Component structure
Before we continue, lets start with thinking of our component structure.
Our goal is something like this;
![alt text](https://github.com/Glottris/you_tube_tutorial/blob/master/assets/Mockup.jpg "Mock-up")

A scrolling list of videos, with some title information and an app header,
and if a video is kicked we should go to a different view where it is played in full-screen, here we should be able to go back using the 'back button' is it called that? the guy without a smartphone is writing a tutorial here Kappa.

Lets start with the deepest element and also the information we need to get from somewhere the video.

## Getting Video Information
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
copy the URL bellow and insert you API key where it says **'INSERT_API_KEY_HERE'** in friendly text.
```
> https://www.googleapis.com/youtube/v3/search/?key=INSERT_API_KEY_HERE&channelId=UCYGRnZ50MyvueoDN_Vo2PHA&part=snippet,id&order=date&maxResults=4
```
go ahead an paste the resulting link in a browser to see how the data we get back from youtube is structured.

The other variables in the URL are; channelId, part, id&order, maxResults.
Lets add some const variables to hold these for now, bellow our imports. I have used acorns channelId in the example bellow.
``` javascript
const apiKey = 'INSERT_API_KEY_HERE';
const channelId = 'UCYGRnZ50MyvueoDN_Vo2PHA';
const maxResults = '4';
```

Next we will use the **componentDidMount** method that is automatically run after a component is mounted.
https://reactjs.org/docs/react-component.html#componentdidmount

Inside this function we will use Fetch api that is provided by react-native, https://facebook.github.io/react-native/docs/network

edit your App component to look like this:
``` javascript
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = { data: [] }
  }

  componentDidMount(){
    fetch('https://www.googleapis.com/youtube/v3/search/?key='+apiKey+'&channelId='+channelId+'&part=snippet,id&order=date&maxResults=' + maxResults )
    .then(res => res.json())
    .then(res => {
      const videoId = []
      res.items.forEach(item => { videoId.push(item) })
      this.setState({ data: videoId })
    })
    .catch(error => { console.error(error) })
  }

  render() {
    return (
      <View>
        <Text>still works!</Text>
      </View>
    );
  }
}

```
We setup a constructor where we set the state to take a data array.
state is used for data that will change in the app and when updated will trigger a re-render.
After fetching which is an asynchronous action we populate a list with the items from the json, then we update the state thru the setState function, this will trigger a re-render of the component.

Now we need to add something to our render function to see it on our device.  Lets add the thumbnail image from the fetched data.

In the render function things inside curly-brackets are run as JavaScript. After the text tag add the following function:
``` javascript
{this.state.data.map((item, i) =>
 <Image
   key={item.id.videoId}
   source={{uri: item.snippet.thumbnails.medium.url}}
   style={{width: 320, height: 180}}/>
)}
```
You will also need to import the 'Image' element from react-native.
And the 'key' attribute is just to avoid a warning.

Here we use the JavaScript map function to access the data, we cant access it directly since we don't know if the JSON data is loaded or not. So when the state change this will re render and the function will return a new result, but with no data map will return nothing.

## Layout
Lets start adjusting our layout,  and add a **scrollView** ==*that we need to import from react-native.*==
```javascript
  render() {
    return (
      <View style={styles.body}>
        <Text>still works!</Text>
        <ScrollView>
          {this.state.data.map((item, i) =>
            <View
              style={styles.videos}
              key={item.id.videoId}>
              <Image
                source={{uri: item.snippet.thumbnails.medium.url}}
                style={{width: 320, height: 180}}/>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  videos: {
    paddingBottom: 30,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#aaa'
  },
  videoItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  videoText: {
    padding: 20,
    color: '#000'
  },
});
```
We center align our whole app using a new style on our top View element. Make a new View element around the Image,  and put some padding between our video thumbnails. (the key warning is back so we move it to the top element returned by the map function)
We also add the new objects to our styles constant and two unused formats **videoItems** and **videoText** that will be used for the video information bellow each video.

![alt text](https://github.com/Glottris/you_tube_tutorial/blob/master/assets/Example.JPG "Exsample")

### Video info
Create a new folder for assess in you project save this icon: ![alt text](https://github.com/Glottris/you_tube_tutorial/blob/master/assets/icon.jpg "Acorn-icon")

Add this new view under the video thumbnail image tag.
```javascript
              <View style={styles.videoItems}>
                <Image
                  source={require('./assets/icon.jpg')}
                  style={{width:30, height:30, borderRadius: 20, marginRight: 5}}/>
                <Text style={styles.videoText}>
                  {item.snippet.title}
                </Text>
              </View>
```
now it should look something like this:

![alt text](https://github.com/Glottris/you_tube_tutorial/blob/master/assets/Example2.JPG "Exsample2")



## Klick to play video
In this part we make clicking the thumbnail play the video in full-screen, and we add navigation so pressing the innate 'back button' will return you to the main screen of our app.
Start by creating a new file, I called mine YouTubeVideo.js
it looks like this:
```javascript
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';

export class YouTubeVideo extends React.Component{

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          videoId="KVZ-P-ZI6W4"   // The YouTube video ID
          play={true}             // control playback of video with true/false
          fullscreen={true}       // control whether the video should play in fullscreen or inline
          loop={false}            // control whether the video should loop when ended
          apiKey={'YOUR_API_KEY_HERE'}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
```
We import the YouTube element from **react-native-youtube** that we installed in the beginning. We copy a object template from usage on this page: https://www.npmjs.com/package/react-native-youtube
And add the API key element. All inside a view with a basic container style. The videoId is just an example for now we need to pass the videoId from our app element. 

Now lets go back to App.js and import our new component
```javascript
import { YouTubeVideo } from './YouTubeVideo'
```
and also add **TouchableHighlight ** to our react-native imports, we will use this to make the video thumbnail clickable.
```javascript
import { StyleSheet, Text, View,  WebView, Platform , Image, ScrollView, TouchableHighlight } from 'react-native';
```

### Navigation
To use the navigation plugin we need remove `export default` from our App class and add export the following code instead.
put this bellow our styles constant.
```javascript
export default screens = createStackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
});
```

Okay, the last step is to change the render function, adding TuchableHighlight and an onPress function using the nagvigate plugin.
```javascript
render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.body}>
        <ScrollView>
          {this.state.data.map((item, i) =>
            <TouchableHighlight
              key={item.id.videoId}
              onPress={() => navigate('YouTubeVideo', {youtubeId: item.id.videoId})}>
              <View style={styles.videos}>
                <Image
                  source={{uri: item.snippet.thumbnails.medium.url}}
                  style={{width: 320, height: 180}}/>
                <View style={styles.videoItems}>
                  <Image
                    source={require('./assets/icon.jpg')}
                    style={{width:30, height:30, borderRadius: 20, marginRight: 5}}/>
                  <Text style={styles.videoText}>
                    {item.snippet.title}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </ScrollView>
      </View>
    );
  }
```
I added a shorthand before the return that I use in the onPress attribute. I also removed the still works text.

Now the only thing we have left is to use the videoId we pass to YouTubeVideo instead of the example one.
Go back to YouTubeVideo.js and change VideoId to get the Id from props
```javascript
videoId={this.props.navigation.state.params.youtubeId}
```

DONE!?
TODO?
add search bar??
Navigation ads a empty header, should put something or remove it?


