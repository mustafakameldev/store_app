import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Button, Icon } from "react-native-elements";
export default class Scan extends Component {
  state = {
    backgroundColor: "#fe3fbff",
    color: "#111111",
  };
  scan = () => {
    this.props.navigation.navigate("Scanner");
  };

  addProduct = () => {
    this.props.navigation.navigate("AddScanner");
  };
  createBill = () => {
    this.props.navigation.navigate("BillScanner");
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 25,
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <View
          style={{
            height: 0.7,
            width: Dimensions.width,
            backgroundColor: "#2089dc",
            marginStart: 10,
            marginEnd: 10,
            marginTop: 50,
          }}
        />
        <Button
          icon={
            <Icon
              name="search"
              color="#2089dc"
              style={{ marginStart: 7, marginEnd: 7 }}
            />
          }
          title="scan"
          type="clear"
          onPress={() => this.scan()}
          buttonStyle={{
            marginBottom: 5,
            height: 55,
          }}
        />
        <View
          style={{
            height: 0.7,
            width: Dimensions.width,
            backgroundColor: "#2089dc",
            marginStart: 10,
            marginEnd: 10,
          }}
        />
        <Button
          icon={
            <Icon
              name="storage"
              color="#2089dc"
              style={{ marginStart: 7, marginEnd: 7 }}
            />
          }
          title="add item to database "
          type="clear"
          onPress={() => this.addProduct()}
          buttonStyle={{
            marginBottom: 5,
            height: 55,
          }}
        />
        <View
          style={{
            height: 0.55,
            width: Dimensions.width,
            backgroundColor: "#2089dc",
            marginStart: 10,
            marginEnd: 10,
          }}
        />

        <Button
          icon={
            <Icon
              name="receipt"
              color="#2089dc"
              style={{ marginStart: 7, marginEnd: 7 }}
            />
          }
          title="make bill"
          type="clear"
          onPress={() => this.createBill()}
          buttonStyle={{
            marginBottom: 5,
            height: 55,
          }}
        />
        <View
          style={{
            height: 0.7,
            width: Dimensions.width,
            backgroundColor: "#2089dc",
            marginStart: 10,
            marginEnd: 10,
          }}
        />
      </View>
    );
  }
}
