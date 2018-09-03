
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
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
      <View>
        <Text>still works!</Text>
        {this.state.data.map((item, i) =>
        <Image
          key={item.id.videoId}
          source={{uri: item.snippet.thumbnails.medium.url}}
          style={{width: 320, height: 180}}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
