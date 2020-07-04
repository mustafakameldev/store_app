import React from "react";
import { AsyncStorage, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Router from "../Router";
const slides = [
  {
    key: 1,
    title: " Scann List",
    text:
      " 1- Scan about a product over the internet \n 2- Scan for add items to your list of products \n 3- Scan for  make bills from your products  ",
    image: require("/home/mospro/Downloads/store_app/assets/scan_list.jpg"),
    backgroundColor: "#4284F3",
  },
  {
    key: 2,
    title: " Scanner ",
    text: " scan easy and fast ..",
    image: require("/home/mospro/Downloads/store_app/assets/scan.jpg"),
    backgroundColor: "#8DEC95",
  },

  {
    key: 3,
    title: "Products List",
    text: "All your products will be at home",
    image: require("/home/mospro/Downloads/store_app/assets/list.jpg"),
    backgroundColor: "#DC665C",
  },
  {
    key: 4,
    title: "make bill",
    text: "make bill\n determine quantity for every bill item and press Done  ",
    image: require("/home/mospro/Downloads/store_app/assets/bill.jpg"),
    backgroundColor: "#FFCD40",
  },
];
export default class App extends React.Component {
  state = {
    showRealApp: false,
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: item.backgroundColor,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, margin: 5 }}>
          {item.title}
        </Text>
        <Image
          source={item.image}
          style={{ height: 400, width: 220, borderRadius: 15 }}
        />
        <Text style={{ color: "white", marginTop: 12 }}>{item.text}</Text>
      </View>
    );
  };
  _onDone = async () => {
    this.setState({ showRealApp: true });
    await AsyncStorage.setItem("DoneIntro", true);
  };
  isDone = async () => {
    (await AsyncStorage.getItem("DoneIntro")) === true ? true : false;
  };
  render() {
    if (this.state.showRealApp || this.isDone()) {
      return <Router />;
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
        />
      );
    }
  }
}
