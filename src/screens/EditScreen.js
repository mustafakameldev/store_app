import React, { Component } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");
class EditScreen extends Component {
  state = (state = {
    name: null,
    price: 0,
    units: 0,
    id: 0,
  });

  editItem = () => {
    console.log(
      this.state.name,
      "     ",
      this.state.price,
      "    ",
      this.state.units
    );
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE products2 set name=?, price=? , units=? where id=?",
          [this.state.name, this.state.price, this.state.units, this.state.id]
        );
      }, null);
    } catch (e) {
      console.log(e);
    }
    this.props.navigation.navigate("HomeList");
  };
  componentDidMount = () => {
    let name = this.props.route.params.item.name;
    let price = this.props.route.params.item.price.toString();
    let units = this.props.route.params.item.units.toString();
    let id = this.props.route.params.item.id.toString();
    this.setState({ name, price, units, id });
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <Input
            placeholder="product name"
            inputContainerStyle={{
              borderBottomColor: "#58A7E5",
            }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
          <Input
            placeholder="price"
            inputContainerStyle={{
              borderBottomColor: "#58A7E5",
            }}
            onChangeText={(price) => this.setState({ price })}
            value={this.state.price}
            keyboardType="numeric"
          />
          <Input
            placeholder="units"
            inputContainerStyle={{
              borderBottomColor: "#58A7E5",
            }}
            onChangeText={(units) => this.setState({ units })}
            keyboardType="numeric"
            value={this.state.units}
          />

          <Button title="Edit" type="outline" onPress={() => this.editItem()} />
        </View>
      </View>
    );
  }
}

export { EditScreen };
