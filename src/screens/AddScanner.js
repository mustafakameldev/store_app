import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

const AddScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  createDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists products (id integer primary key not null, name text,  price real , units integer , limit integer);"
      );
    });
  };
  addItem = ({ name, price, units, limit }) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into products (name, price, units, limit ) values (?, ?,? , ? )",
        [name, price, , units, limit]
      );
    }, null);
  };
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    Alert.alert(` your scan:  ${data}`, "what do you want to do ?", [
      {
        text: "cancel ",
        style: "cancel",
      },
      {
        text: "add item ",
        onPress: () => {
          props.navigation.navigate("AddItem", { data });
        },
      },
    ]);
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
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title={"rescan"}
          onPress={() => {
            setScanned(false);
          }}
        />
      )}
    </View>
  );
};
export { AddScanner };
