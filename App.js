
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { YouTube } from 'react-native-youtube';
import { createStackNavigator } from 'react-navigation';

const apiKey = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs';
const channelId = 'UCYGRnZ50MyvueoDN_Vo2PHA';
const maxResults = '4';


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
