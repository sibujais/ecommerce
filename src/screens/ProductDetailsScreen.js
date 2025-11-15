import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Modal,
} from 'react-native';
import { useCartStore } from '../store/useCartStore';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore();

  const cartItem = cart.find(c => c.productId === product.productId);
  const initialQty = cartItem?.quantity || 1;

  const [showViewer, setShowViewer] = useState(false);
  const [quantity, setQuantity] = useState(initialQty);

  const images = [{ url: product.image }];

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleCartAction = () => {
    if (cartItem) {
      updateQuantity(product.productId, quantity);
    } else {
      addToCart({ ...product, quantity });
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${product.name}\nPrice: ₹${product.price}\n\n${product.description}`,
      });
    } catch (err) {
      console.log('Share error', err);
    }
  };

  const isInCart = Boolean(cartItem);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
            <TouchableOpacity onPress={() => setShowViewer(true)}>
              <Image source={{ uri: product.image }} style={styles.mainImage} />
            </TouchableOpacity>
        </ScrollView>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.mrp}>₹{product.mrp}</Text>
            <Text style={styles.discount}>{product.discountPercent}% OFF</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={decreaseQty} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <TouchableOpacity onPress={increaseQty} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addCartBtn}
            onPress={handleCartAction}
          >
            <Text style={styles.addCartText}>
              {isInCart ? 'Update Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Icon name="share-social-outline" size={20} color="#007bff" />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartFloating}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Icon name="cart" size={24} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      )}

      <Modal visible={showViewer} transparent={true}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setShowViewer(false)}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={() => setShowFullscreen(false)}
          backgroundColor="#000"
          renderIndicator={() => null}  
          saveToLocalByLongPress={false}
        />
      </Modal>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  carousel: {
    width: '100%',
    height: 320,
    backgroundColor: '#f8f8f8',
  },

  mainImage: {
    width: 400,
    height: 320,
    resizeMode: 'cover',
  },
 closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  price: { fontSize: 22, fontWeight: '700', color: '#007bff' },
  mrp: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discount: { fontSize: 14, color: 'green', fontWeight: '600' },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 16,
  },

  description: { color: '#444', lineHeight: 18 },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  qtyBtn: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    width: 35,
    alignItems: 'center',
  },

  qtyText: { fontSize: 18, fontWeight: '600' },

  qtyValue: { marginHorizontal: 12, fontSize: 18, fontWeight: '600' },

  addCartBtn: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  addCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  shareBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  shareText: { color: '#007bff', fontSize: 14, fontWeight: '600' },

  cartFloating: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 35,
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
});
