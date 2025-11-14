import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCartStore } from "../store/useCartStore";

const CartScreen = ({ navigation }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCartStore();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const couponList = {
  save10: 10,
  save30: 30,
  save50: 50,
  save80: 80,
  save90: 90
};

  // → PRICE CALCULATION
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const discountPercent = appliedCoupon ? couponList[appliedCoupon] : 0;
const discount = subtotal * (discountPercent / 100);

  const tax = (subtotal - discount) * 0.05; // 5% tax
  const total = subtotal - discount + tax;

  // → APPLY COUPON
  const applyCoupon = () => {
    const key = coupon.trim().toLowerCase();
    if (couponList[key]) {
    setAppliedCoupon(key);
    Alert.alert("Success", `${couponList[key]}% discount applied!`);
  } else {
    Alert.alert("Invalid", "This coupon is not valid.");
  }
  };

  // → REMOVE ITEM WITH CONFIRMATION
  const confirmRemove = (productId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFromCart(productId)
        }
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cart-outline" size={80} color="#aaa" />
        <Text style={styles.emptyText}>Your cart is empty</Text>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>

              {/* QUANTITY SELECTOR */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  onPress={() =>
                    item.quantity > 1
                      ? updateQuantity(item.productId, item.quantity - 1)
                      : confirmRemove(item.productId)
                  }
                >
                  <Icon
                    name="remove-circle-outline"
                    size={28}
                    color="#007bff"
                  />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  <Icon name="add-circle-outline" size={28} color="#007bff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remove Item */}
            <TouchableOpacity onPress={() => confirmRemove(item.productId)}>
              <Icon name="trash-outline" size={26} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View>
            {/* COUPON SECTION */}
            <View style={styles.couponBox}>
              <TextInput
                placeholder="Enter coupon code"
                style={styles.couponInput}
                value={coupon}
                onChangeText={setCoupon}
              />
              <TouchableOpacity style={styles.applyBtn} onPress={applyCoupon}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* PRICE BREAKDOWN */}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryRow}>
                Subtotal: <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
              </Text>
              <Text style={styles.summaryRow}>
                Discount: <Text style={styles.summaryValue}>₹{discount.toFixed(2)}</Text>
              </Text>
              <Text style={styles.summaryRow}>
                Tax (5%): <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
              </Text>
              <Text style={[styles.summaryRow, styles.totalRow]}>
                Total: <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default CartScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  itemRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  image: { width: 80, height: 80, borderRadius: 8 },

  name: { fontSize: 16, fontWeight: "600", color: "#222" },
  price: { fontSize: 15, color: "#007bff", marginTop: 5 },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },
  qtyText: { marginHorizontal: 12, fontSize: 16, fontWeight: "600" },

  couponBox: {
    flexDirection: "row",
    margin: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10
  },

  couponInput: { flex: 1, fontSize: 15 },
  applyBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    borderRadius: 6,
    justifyContent: "center"
  },
  applyText: { color: "#fff", fontWeight: "600" },

  summaryBox: {
    backgroundColor: "#fafafa",
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 8
  },
  summaryRow: {
    fontSize: 16,
    marginVertical: 5,
    color: "#444"
  },
  summaryValue: { fontWeight: "700" },

  totalRow: { marginTop: 10, fontSize: 18 },
  totalValue: { color: "#007bff", fontWeight: "700" },

  checkoutBtn: {
    backgroundColor: "#28a745",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30
  },
  checkoutText: { color: "#fff", fontSize: 17, fontWeight: "700" },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  emptyText: { fontSize: 18, color: "#666", marginTop: 10 },

  continueBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    marginTop: 20,
    borderRadius: 8
  },
  continueText: { color: "#fff", fontWeight: "700" }
});
