import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Clipboard,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  saveToClipboard = (data) => {
    console.log("save", data);
    Clipboard.setString(data.data);
  };
  search = (data) => {
    console.log("search", data);
    Linking.openURL(
      `https://www.google.com/search?q=${data.data}&oq=google+search+limk+for+app&aqs=chrome..69i57j69i64.9136j0j7&sourceid=chrome&ie=UTF-8`
    );
  };
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log("qr data : ", data);
    Alert.alert(` your scan:  ${data}`, "what do you want to do ?", [
      {
        text: "copy code",
        onPress: () => saveToClipboard({ data }),
      },

      {
        text: "cancel ",
        onPress: () => setScanned(false),
        style: "cancel",
      },
      {
        text: "search ",
        onPress: () => search({ data }),
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
    </View>
  );
};
