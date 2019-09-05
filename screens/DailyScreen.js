import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  SectionList,
  Text,
  View,
  FlatList,
  AsyncStorage
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button, Appbar, ProgressBar, Colors } from "react-native-paper";
import * as Progress from "react-native-progress";
import VitaminList from "../components/VitaminList";

// const URL = "http://localhost:3000"
// const URL = "http://77b3767e.ngrok.io"
const URL = "https://tricycle-nutrition.herokuapp.com/";

export default class DailyScreen extends Component {
  constructor() {
    super();
    this.state = {
      compoundData: null,
      days: ""
    };
  }

  static navigationOptions = {
    title: "Daily"
  };

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      if (token !== null) {
        // We have data!!

        return token;
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async componentDidMount() {
    const token = await this.getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    };
    fetch(URL + "/api/v1/food/day", config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json,
          days: json.day
        });
      });
  }

  percentProgress = compound => {
    const percentage = compound.amount / compound.rdv;
    if (percentage > 1) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Progress.Bar
            borderColor={"black"}
            borderRadius={10}
            progress={1}
            height={15}
            width={300}
            color={"green"}
          />
          <Button
            icon="done-all"
            compact="true"
            contentStyle={{ alignSelf: "flex-end", height: 15, width: 50 }}
          ></Button>
        </View>
      );
    } else if (percentage == NaN) {
      return null;
    } else if (percentage == Infinity) {
      return null;
    } else if (percentage < 0.1) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Progress.Bar
            borderColor={"black"}
            borderRadius={10}
            progress={percentage}
            height={15}
            width={300}
            color={"red"}
          />
        </View>
      );
    } else if (percentage < 0.9) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Progress.Bar
            borderColor={"black"}
            borderRadius={10}
            progress={percentage}
            height={15}
            width={300}
            color={"blue"}
          />
        </View>
      );
    } else if (percentage >= 9 && percentage <= 1) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Progress.Bar
            borderColor={"black"}
            borderRadius={10}
            progress={percentage}
            height={15}
            width={300}
            color={"green"}
          />
          <Button
            icon="done-all"
            compact="true"
            contentStyle={{ alignSelf: "flex-end", height: 15, width: 50 }}
          ></Button>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        //  flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#F6F4F3"
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44
      },
      subText: {
        padding: 10,
        fontSize: 14,
        height: 40
      }
    });

    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header
          style={{ backgroundColor: "#023618" }}
          statusBarHeight={25}
        >
          {/* <Appbar.BackAction
              onPress={this._goBack}
            /> */}
          <Appbar.Content
            title="Daily"
            // subtitle="Daily"
          />
          {/* <Appbar.Action icon="search" onPress={this._onSearch} />
            <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
        <View style={styles.container}>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            automaticallyAdjustContentInsets={true}
            showsVerticalScrollIndicator={false}
          >
            {this.state.compoundData ? (
              <VitaminList
                time="day"
                data={this.state.compoundData.total}
                percentProgress={this.percentProgress}
              />
            ) : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}
