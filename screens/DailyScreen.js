import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class DailyScreen extends Component {
    render() {

        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#f57e42',
              alignItems: 'center',
              justifyContent: 'center',
            },
          });

        return (
            <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
        )
    }
}