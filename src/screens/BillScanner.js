import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SQLite from "expo-sqlite";
import { CreateBill } from "./CreateBill";
const db = SQLite.openDatabase("db.db");
const BillScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsNo, setItemsNo] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const createBill = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM products2", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          items.forEach((element) => {
            if (element === results.rows.item(i).code) {
              products.push({
                product: results.rows.item(i),
                quantity: 0,
                units: results.rows.item(i).units,
              });
              console.log("product from billScanner", results.rows.item(i));
            }
          });
        }

        console.log("products ", products);
      });
    });

    setTimeout(() => {
      props.navigation.navigate("CreateBill", { products });
    }, 1000);
  };
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log(data);

    if (items.indexOf(data) != -1) {
      Alert.alert(` item:  ${data}`, " add to bill ?", [
        {
          text: "ok",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert(` item:  ${data}`, " add to bill ?", [
        {
          text: "cancel",
          onPress: () => {},
        },
        {
          text: "ok",
          onPress: () => {
            items.push(data);
            setItemsNo(itemsNo + 1);
            console.log(items);
          },
          style: "cancel",
        },
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        height: 50,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View
          style={{ flexDirection: "row", width: Dimensions.width, height: 40 }}
        >
          <Button
            title={" Another Item "}
            type="clear"
            onPress={() => {
              setScanned(false);
            }}
            buttonStyle={{ width: 188, height: 40 }}
          />
          <View
            style={{
              backgroundColor: "#1B73B4",
              width: 40,
              alignItems: "center",
              borderRadius: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>{itemsNo}</Text>
          </View>
          <Button
            title={" create a bill "}
            type="clear"
            onPress={() => {
              createBill();
            }}
          />
        </View>
      )}
    </View>
  );
};
export { BillScanner };
