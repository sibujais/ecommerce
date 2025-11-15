import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Camera, useCameraDevice,useCodeScanner } from "react-native-vision-camera";

import Icon from "react-native-vector-icons/Ionicons";

import { useProductStore } from "../store/useProductStore";
import { useScanStore } from "../store/useScanStore";

const ScannerScreen = ({ navigation }) => {
  const device = useCameraDevice("back");
  const [hasPermission, setHasPermission] = useState(false);
  const [flash, setFlash] = useState(false);

  const { products } = useProductStore();
  const { addScan, scans } = useScanStore();

  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();

      if (status === "granted") {
        setHasPermission("granted");
      } else if (status === "denied") {
        const newStatus = await Camera.requestCameraPermission();
        if (newStatus === "granted") {
          setHasPermission("granted");
        } else if (newStatus === "denied") {
          setHasPermission("denied");
        } else {
          setHasPermission("blocked");
        }
      } else {
        setHasPermission("blocked");
      }
    })();
  }, [])

  const codeScanner = useCodeScanner({
    codeTypes: [
      "code-128",
      "qr",
    ],
    onCodeScanned: (codes) => {
      console.log("codess", codes);
      if (!codes?.[0]?.value) return;

      const scannedCode = String(codes[0].value);

      addScan(scannedCode);

      findProductAndNavigate(scannedCode);
    }
  });

  const findProductAndNavigate = (barcode) => {
    const product = products.find((p) =>
      p.raw?.variants?.some((v) =>
        v?.barcodes?.includes(barcode)
      )
    );

    if (product) {
      navigation.navigate("ProductDetails", { product });
    } else {
      Alert.alert("Not Found", "No product found for this barcode.");
    }
  };

  if (!device)
    return (
      <View style={styles.center}>
        <Text>No Camera Found</Text>
      </View>
    );

  if (!hasPermission)
    return (
      <View style={styles.center}>
        <Text>No Camera Permission</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={flash ? "on" : "off"}
      />

      <TouchableOpacity
        style={styles.flashBtn}
        onPress={() => setFlash(!flash)}
      >
        <Icon
          name={flash ? "flash" : "flash-off"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>Last 5 Scans:</Text>

        {scans.length === 0 ? (
          <Text style={{ color: "#aaa" }}>No scans yet</Text>
        ) : (
          scans.map((code, index) => (
            <Text key={index} style={styles.historyItem}>
              • {code}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  flashBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 30
  },

  historyBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    borderRadius: 10
  },

  historyTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 5
  },

  historyItem: {
    color: "#fff",
    fontSize: 14
  }
});
