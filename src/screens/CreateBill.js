import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");
class ListItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <View style={{ marginTop: 2, marginBottom: 2 }}>
        <View
          style={{
            marginStart: 30,
            marginEnd: 30,
            backgroundColor: "#1B73B4",
            height: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: Dimensions.width,
            height: 60,
            marginBottom: 4,
            marginTop: 4,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30 }}>{item.product.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>price :</Text>
              <Text style={{ fontSize: 24 }}>{item.product.price}$</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#1B73B4",
                width: 40,
                borderRadius: 20,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                icon={{
                  name: "remove",
                  size: 15,
                  color: "white",
                }}
                onPress={this.props.onSubtract}
                type="clear"
              />
            </View>
            <View
              style={{
                backgroundColor: "#1B73B4",
                width: 45,
                borderRadius: 20,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ padding: 7, color: "white" }}>
                {item.quantity}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#1B73B4",
                width: 40,
                borderRadius: 20,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                icon={{
                  name: "add",
                  size: 15,
                  color: "white",
                }}
                onPress={this.props.onAdd}
                type="clear"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginStart: 30,
            marginEnd: 30,
            backgroundColor: "#1B73B4",
            height: 0.5,
          }}
        />
      </View>
    );
  }
}

class CreateBill extends Component {
  state = { products: [] };

  onSubtract = (item, index) => {
    if (item.quantity > 0) {
      const products = [...this.state.products];
      products[index].quantity -= 1;
      this.setState({ products });
    } else {
      item.quantity = 0;
    }
  };

  onAdd = (item, index, units) => {
    if (item.quantity < units) {
      const products = [...this.state.products];
      products[index].quantity += 1;
      this.setState({ products });
    }
    console.log(item.quantity);
  };

  editItems = (totalPrice) => {
    Alert.alert(` your total price is: `, ` ${totalPrice} `, [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "ok",
        onPress: () => {
          this.state.products.forEach((element) => {
            element.product.units = element.product.units - element.quantity;
            try {
              db.transaction((tx) => {
                tx.executeSql("UPDATE products2 set units=? where id=?", [
                  element.product.units,
                  element.product.id,
                ]);
              }, null);
            } catch (e) {
              console.log(e);
            }
          });
          console.log(this.state.products);
          this.props.navigation.navigate("ScanHome");
        },
      },
    ]);
  };
  render() {
    this.state.products = this.props.route.params.products;
    const { products } = this.state;
    let totalPrice = 0;
    products.forEach((item) => {
      totalPrice += item.quantity * item.product.price;
    });

    return (
      <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
        <FlatList
          data={this.state.products}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              onSubtract={() => this.onSubtract(item, index)}
              onAdd={() => {
                const units = item.units;
                this.onAdd(item, index, units);
              }}
            />
          )}
          keyExtractor={(item) => item.product.id.toString()}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#FF9800", fontSize: 20 }}>
            Total Price: {totalPrice}
          </Text>
        </View>
        <Button
          title="Done"
          buttonStyle={{
            height: 40,
            marginBottom: 15,
            marginStart: 20,
            marginEnd: 20,
          }}
          onPress={() => this.editItems(totalPrice)}
        />
      </SafeAreaView>
    );
  }
}
export { CreateBill };
