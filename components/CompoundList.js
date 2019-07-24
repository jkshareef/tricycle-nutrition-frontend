import React, {Component} from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

"protein", nutrient_id:1003, description: "for muscles")
    Compound.create(name: "fiber", nutrient_id:1079 , description:"for digestive")
    Compound.create(name: "calcium", nutrient_id:1087, description:"for bones")
    Compound.create(name: "iron", nutrient_id:1089, description:"for blood")
    Compound.create(name: "magnesium", nutrient_id:1090, description: "")
    Compound.create(name: "manganese", nutrient_id:1101, description: "")
    Compound.create(name: "phosphorus", nutrient_id:1091, description:"")
    Compound.create(name: "potassium", nutrient_id:1092, description:"")
    Compound.create(name: "sodium", nutrient_id:1093, description:"")
    Compound.create(name: "zinc", nutrient_id:1095, description: "")
    Compound.create(name: "copper", nutrient_id:1098, description:"")
    Compound.create(name: "selenium", nutrient_id:1103, description:"")
    Compound.create(name: "vitamin_a", nutrient_id:1106, description:"")
    Compound.create(name: "vitamin_e", nutrient_id:1109, description:"")
    Compound.create(name: "vitamin_d", nutrient_id:1114, description:"for bones")
    Compound.create(name: "vitamin_c", nutrient_id:1162, description:"for immune")
    Compound.create(name: "thiamin", nutrient_id:1165, description:"")
    Compound.create(name: "riboflavin", nutrient_id:1166, description:"")
    Compound.create(name: "niacin", nutrient_id:1167, description:"")
    Compound.create(name: "vitamin_b5", nutrient_id:1170, description:"")
    Compound.create(name: "vitamin_b6", nutrient_id:1175, description:"")
    Compound.create(name: "vitamin_b12", nutrient_id:1178, description:"")
    Compound.create(name: "choline", nutrient_id:1180, description:"")
    Compound.create(name: "vitamin_k", nutrient_id:1185, description:"")
    Compound.create(name: "folate", n

export default class CompoundList extends Component {
    render() {
      return (
        <View style={styles.container}>
          <SectionList
            sections={[
              {title: 'Calcium', data: ['Devin']},
              {title: '', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},

                
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
  
  // skip this line if using Create React Native App
  AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);
  