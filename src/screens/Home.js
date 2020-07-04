import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Button, Card, Icon } from "react-native-elements";

const db = SQLite.openDatabase("db.db");

export default class Home extends Component {
  state = {
    products2: null,
    name: "name",
    price: 0,
    code: "101",
    units: 1,
    refreshing: false,
  };

  addProduct = () => {
    const { name, price, code, units } = this.state;
    db.transaction((tx) => {
      tx.executeSql(
        "insert into products2 (name, price, code, units) values (?, ?, ?, ?)",
        [name, price, code, units]
      );
    }, null);

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM products2", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          products2: temp,
        });
      });
    });
  };

  async componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM products2", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          products2: temp,
          refreshing: false,
        });
      });
    });
  }

  clearHandler = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM products2; ");
    }, null);
    this.componentDidMount();
  };

  deleteItem = (id) => {
    console.log("item ", id, " is going to delete");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  products2 where id=?",
        [id],
        (tx, results) => {}
      );
    });
    this.componentDidMount();
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });

    this.componentDidMount();
    this.setState({ refreshing: false });
  };

  deleteHandler = (id) => {
    Alert.alert(
      "Delete Products",
      "Are you sure to delete this item ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => this.deleteItem(id) },
      ],
      { cancelable: false }
    );
  };

  searchHandler = (code) => {
    console.log("search");
    Linking.openURL(
      `https://www.google.com/search?q=${code}&oq=google+search+limk+for+app&aqs=chrome..69i57j69i64.9136j0j7&sourceid=chrome&ie=UTF-8`
    );
  };
  render() {
    if (this.state.refreshing) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.products2}
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1, marginTop: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            renderItem={({ item }) => {
              console.log(item.name);
              console.log(item.price);
              console.log(item.code);
              console.log(item.units);

              return (
                <Card
                  title={item.name}
                  style={{
                    width: Dimensions.width,
                  }}
                  titleStyle={{ color: "#5E6166", fontSize: 40 }}
                >
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-around",

                      alignItems: "center",
                      height: 80,
                      width: Dimensions.width,
                    }}
                  >
                    <View style={{}}>
                      <Text>Items:</Text>
                      <Text style={{ fontSize: 65 }}>{item.units}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 12 }}>price: </Text>
                      <Text style={{ fontSize: 65 }}>{item.price}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.width,
                      height: 0.25,
                      backgroundColor: "black",
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      icon={
                        <Icon
                          name="search"
                          color="#2089DC"
                          style={{ marginStart: 10, marginEnd: 10 }}
                        />
                      }
                      title="Search "
                      type="clear"
                      titleStyle={{ color: "#58A7E5" }}
                      buttonStyle={{ width: 125 }}
                      onPress={() => this.searchHandler(item.code)}
                    />
                    <Button
                      icon={
                        <Icon
                          name="create"
                          color="#C2C240"
                          style={{ marginStart: 10, marginEnd: 10 }}
                        />
                      }
                      title="Edit"
                      type="clear"
                      buttonStyle={{ width: 125 }}
                      titleStyle={{ color: "#C2C240" }}
                      onPress={() =>
                        this.props.navigation.navigate("EditItem", { item })
                      }
                    />
                    <Button
                      icon={
                        <Icon
                          name="delete"
                          color="#FF5089"
                          style={{ marginStart: 10, marginEnd: 10 }}
                        />
                      }
                      title="Delete"
                      type="clear"
                      buttonStyle={{ width: 125 }}
                      titleStyle={{ color: "#FF5089" }}
                      onPress={() => this.deleteHandler(item.id)}
                    />
                  </View>
                </Card>
              );
            }}
          />
        </View>
      );
    }
  }
}
