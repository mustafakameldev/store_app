import * as React from "react";
import { StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import About from "./screens/About";
import History from "./screens/History";
import Settings from "./screens/Settings";
import Scan from "./screens/Scan";
import { Icon } from "react-native-elements";
import Scanner from "./screens/Scanner";
import {
  AddScanner,
  AddItem,
  EditScreen,
  CreateBill,
  BillScanner,
} from "../src/screens";
const Tab = createBottomTabNavigator();
function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator initialRouteName={Home}>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          color: "#297dd6",
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStack}
        options={{
          color: "#297dd6",
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function HomeContainer({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeList"
        component={Home}
        options={{
          title: "Products",
          headerStatusBarHeight: 0,
          headerStyle: {
            backgroundColor: "#ededed",
          },
        }}
      />
      <Stack.Screen
        name="EditItem"
        component={EditScreen}
        options={{
          headerShown: false,
          navigationOptions: { tabBarVisible: false },
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
function ScanStack({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScanHome"
        component={Scan}
        options={{
          title: "Scan Options",
          headerStatusBarHeight: 0,
          headerStyle: {
            backgroundColor: "#ededed",
          },
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerShown: false,
          navigationOptions: { tabBarVisible: false },
        }}
      />
      <Stack.Screen
        name="AddScanner"
        component={AddScanner}
        options={{
          headerShown: false,
          navigationOptions: { tabBarVisible: false },
        }}
      />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen
        name="CreateBill"
        component={CreateBill}
        options={{
          headerShown: false,
          navigationOptions: { tabBarVisible: false },
        }}
      />
      <Stack.Screen
        name="BillScanner"
        component={BillScanner}
        options={{
          headerShown: false,
          navigationOptions: { tabBarVisible: false },
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#969696" />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
