import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default class HomeScreen extends Component {
    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#f57e42',
              alignItems: 'center',
              justifyContent: 'center',
            },
          });

          const getToken = (jwt) => {
            return localStorage.getItem('jwt')
          }

        return(
            <Text>Today</Text>
        )
    }
}