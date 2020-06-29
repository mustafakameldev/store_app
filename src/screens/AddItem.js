import React from "react";
import { View } from "react-native";
import * as SQLite from "expo-sqlite";
import { Button, Input } from "react-native-elements";

const db = SQLite.openDatabase("db.db");

class AddItem extends React.Component {
  state = {
    products2: null,
    name: "mospro",
    price: 20,
    code: 21255565,
    units: 50,
  };

  addProduct = () => {
    const { name, price, code, units } = this.state;
    db.transaction((tx) => {
      tx.executeSql(
        "insert into products2 (name, price, code, units) values (?, ?, ?, ?)",
        [name, price, code, units]
      );
    }, null);
    this.props.navigation.navigate("ScanHome");
  };

  async componentDidMount() {
    this.setState({ code: this.props.route.params.data });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE if not exists products2 (id INTEGER NOT NULL,name	TEXT NOT NULL, code TEXT, units INTEGER ,price	REAL NOT NULL,PRIMARY KEY(id AUTOINCREMENT));"
      );
    });
  }

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
          />
          <Input
            placeholder="price"
            inputContainerStyle={{
              borderBottomColor: "#58A7E5",
            }}
            onChangeText={(price) => this.setState({ price })}
            keyboardType="numeric"
          />
          <Input
            placeholder="units"
            inputContainerStyle={{
              borderBottomColor: "#58A7E5",
            }}
            onChangeText={(units) => this.setState({ units })}
            keyboardType="numeric"
          />

          <Button
            title="Add"
            type="outline"
            onPress={() => this.addProduct()}
          />
        </View>
      </View>
    );
  }
}

export { AddItem };
