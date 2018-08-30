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

import to editor of choice.
start emulator
react-native run-android || or react-native run-ios

solve errors? mush better to use Expo maybe...