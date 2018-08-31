
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { YouTube } from 'react-native-youtube';
import { createStackNavigator } from 'react-navigation';

const apiKey = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs';
const channelId = 'UCYGRnZ50MyvueoDN_Vo2PHA';
const maxResults = '4';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Text>still works!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
