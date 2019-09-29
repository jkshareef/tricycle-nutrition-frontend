import React, { Component } from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";
import VitaminItem from "./VitaminItem";
import { acceptedList, acceptedHash } from "../helpers/acceptedList";
import { Title } from "react-native-paper";

export default class VitaminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    const sectionListData = data => {
      // array = this.props.data.filter(compound => acceptedList.includes(compound.name))
      // return array
      return acceptedHash.map(acceptCompound => {
        compound = data.find(function(compound) {
          return (
            compound.name.toLowerCase() === acceptCompound.name.toLowerCase()
          );
        });
        if (compound !== undefined) {
          return compound;
        } else {
          return {
            name: acceptCompound.name,
            rdv: acceptCompound.rdv,
            amount: 0,
            description: acceptCompound.description,
            units: acceptCompound.units
          };
        }
      });
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "#F6F4F3"
      },
      sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "rgba(247,247,247,1.0)"
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44
      },
      subText: {
        padding: 10,
        fontSize: 14
        // height: 40
      }
    });
    return this.props.data ? (
      <View style={styles.container}>
        <SectionList
          sections={[{ title: "", data: sectionListData(this.props.data) }]}
          renderItem={({ item }) => (
            <VitaminItem
              time={this.props.time}
              compound={item}
              percentProgress={this.props.percentProgress}
              graphData={this.props.graphData}
            />
          )}
          //   renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>
          // }
          keyExtractor={(item, index) => index}
        />
      </View>
    ) : (
      <View>
        <Title style={{ marginTop: 35 }}>No Meals to Show</Title>
      </View>
    );
  }
}
