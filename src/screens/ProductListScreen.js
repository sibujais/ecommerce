import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export default function ProductListScreen({ navigation }) {
  const {
    fetchProducts,
    loading,
    refreshing,
    search,
    setSearch,
    filteredProducts,
    hasMore,
    refresh,
  } = useProductStore();
  const { logout } = useAuthStore();
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const handleSearch = text => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setSearch(text);
    }, 300);

    setDebounceTimer(timer);
  };

  const isInCart = productId => cart.some(c => c.productId === productId);

  const renderItem = ({ item }) => {
    const inCart = isInCart(item.productId);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetails', { product: item })
          }
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          {item.discountPercent > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.discountPercent}% OFF</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.mrp}>₹{item.mrp}</Text>
        </View>

        <TouchableOpacity
          style={[styles.cartBtn, inCart && styles.removeBtn]}
          onPress={() =>
            inCart ? removeFromCart(item.productId) : addToCart(item)
          }
        >
          <Text style={styles.cartBtnText}>{inCart ? 'Remove' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={18} color="#555" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search products..."
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item, index) => (item.productId + index).toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        onEndReached={() => {
          fetchProducts();
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator color="#007bff" style={{ marginVertical: 10 }} />
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}
            >
              <Text style={{ fontSize: 16, color: '#999' }}>
                No products found
              </Text>
            </View>
          ) : null
        }
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartFloating}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Icon name="cart" size={22} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.scannerFloating}
        onPress={() => navigation.navigate('ScannerScreen')}
      >
        <Icon name="barcode-outline" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logout();
          navigation.replace('Login');
        }}
      >
        <Icon name="log-out-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchInput: { marginLeft: 10, flex: 1 },

  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: { width: '100%', height: 130, borderRadius: 8 },

  badge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#ff4444',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },

  name: { marginTop: 6, fontWeight: '600', color: '#222' },

  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: {
    color: '#007bff',
    fontWeight: '700',
    marginTop: 4,
    fontSize: 15,
  },
  mrp: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginTop: 4,
    fontSize: 13,
  },

  cartBtn: {
    marginTop: 8,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeBtn: { backgroundColor: '#d9534f' },
  cartBtnText: { color: '#fff', fontSize: 14 },

  cartFloating: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  cartBadgeText: { color: '#fff', fontSize: 12 },
  scannerFloating: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  logoutBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 25,
    zIndex: 20,
  },
});
