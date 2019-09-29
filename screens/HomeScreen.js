import React, { Component } from "react";
import { Button } from "react-native-elements";
import {
  Appbar,
  TextInput,
  Title,
  ActivityIndicator,
  Colors,
  Banner
} from "react-native-paper";
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from "react-native";
import RecentMeal from "../components/RecentMeal";
import Icon from "react-native-vector-icons/FontAwesome";

// const URL = "http://localhost:3000"
// const URL = "https://9c268466.ngrok.io";
const URL = "https://tricycle-nutrition.herokuapp.com";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      foodList: [],
      compoundData: null,
      expanded: true,
      visible: false
    };
    this.getRecent = this.getRecent.bind(this);
  }

  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#023618"
    }
  };

  async componentDidMount() {
    this.getRecent();
  }

  async getRecent() {
    const token = await this.getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    };

    fetch(URL + "/api/v1/food/recent", config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json
        });
      })
      .catch(error => console.log("Error: ", error));
  }

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      if (token !== null) {
        // We have data!!
        this.setState({ token: token });
        return token;
      } else {
        null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  clearToken() {
    AsyncStorage.removeItem("jwt");
  }

  onPressLogout = () => {
    this.clearToken();
    this.setState({ isLoggedIn: false });
  };

  handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  onAddFood = () => {
    this.setState(state => ({
      foodList: [...state.foodList, state.query],
      bannerMessage: this.state.query,
      visible: true
    }));

    this.setState({
      query: ""
    });
  };

  onAddMeal = () => {
    this.setState({ compoundData: null });
    // let today = new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();

    // today = mm + '-' + dd + '-' + yyyy;
    const token = this.state.token;
    // const query = this.state.query
    const config = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    };

    fetch(URL + `/api/v1/add/${this.state.foodList}`, config)
      .then(resp => resp.json())
      // .then(this.setState({
      //   query: '',
      // }))
      .then(() => this.getRecent())
      .then(
        this.setState({
          foodList: []
        })
      )
      .catch(error => console.log("Error: ", error));
  };

  render() {
    const { visible } = this.state;

    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#F6F4F3"
      },
      viewContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
      },
      textField: {
        fontSize: 20,
        height: 50,
        width: 300,
        backgroundColor: "white",
        marginTop: 40,
        textAlignVertical: "top"
      },

      button: {
        width: 200,
        margin: 20,
        alignItems: "center",
        backgroundColor: "#023618",
        borderRadius: 30
      },
      buttonCircle: {
        margin: 10,
        height: 150,
        width: 150,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#023618"
      },
      buttonText: {
        padding: 20,
        color: "white"
      },
      list: {
        width: 400,
        alignItems: "center"
      }
    });

    return (
      <View>
        <Appbar.Header
          style={{ backgroundColor: "#023618" }}
          statusBarHeight={25}
        >
          <Appbar.Content
            title="Home"
            // subtitle="Home"
          />
        </Appbar.Header>
        <Banner
          visible={this.state.visible}
          actions={[
            {
              label: "Got it",
              onPress: () => this.setState({ visible: false })
            }
          ]}
        >
          {`${this.state.bannerMessage} was successfully added. Add more food items or submit meal "+" when ready.`}
        </Banner>
        {/* <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: '',
            onPress: () => () => this.setState({ visible: false })
          }}
        >
          {`${this.state.snackMessage} was successfully added`}
        </Snackbar> */}
        <ScrollView
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                mode="flat"
                autoCapitalize="none"
                style={styles.textField}
                label="Food"
                value={this.state.query}
                onChangeText={text =>
                  this.setState({
                    query: text
                  })
                }
              />
            </View>

            <Button
              raised
              onPress={this.onAddFood}
              title="Add Food"
              containerStyle={styles.button}
              buttonStyle={{
                backgroundColor: "#023618",
                width: 200,
                borderRadius: 30
              }}
            />
            <Button
              raised
              onPress={this.onAddMeal}
              title=""
              icon={<Icon name="plus" size={15} color="white" />}
              buttonStyle={{
                backgroundColor: "#023618",
                height: 70,
                width: 70,
                borderRadius: 170
              }}
            />

            <Title style={{ marginTop: 35 }}>Most Recent Meal</Title>
            {this.state.compoundData ? null : (
              <ActivityIndicator
                animating={true}
                size={"large"}
                color={Colors.green800}
                style={{ marginTop: 40 }}
              />
            )}
            {this.state.compoundData ? (
              <RecentMeal meals={this.state.compoundData} />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}
