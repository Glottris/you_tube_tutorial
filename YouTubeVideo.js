
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';


export class YouTubeVideo extends React.Component{

  render() {
    return (
      <View style={styles.container}>
        <YouTube
          videoId={this.props.navigation.state.params.youtubeId}   // The YouTube video ID
          play={true}             // control playback of video with true/false
          fullscreen={true}       // control whether the video should play in fullscreen or inline
          loop={false}            // control whether the video should loop when ended
          apiKey={'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'}
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
