
import React, {Component} from 'react';
import { StyleSheet, Text, View,  WebView, Platform , Image, ScrollView, TouchableHighlight } from 'react-native';
import { YouTube } from 'react-native-youtube';
import { createStackNavigator } from 'react-navigation';
import { YouTubeVideo } from './YouTubeVideo'

const apiKey = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs';
const channelId = 'UCYGRnZ50MyvueoDN_Vo2PHA';
const maxResults = '4';


class App extends Component {
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
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.body}>
        <Text>still works!</Text>
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

export default screens = createStackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
});
