# 📘 E-Commerce App — React Native Assignment (SDE I)

A complete e-commerce mobile application built using **React Native**, **Zustand**, **MMKV**, **Google Sign-In**, and **React Navigation**.  
The project includes login, product listing, product details, shopping cart, and barcode scanning functionality.

---

# 🚀 Features Implemented

## **1. Login Screen**
- Google OAuth login using `@react-native-google-signin/google-signin`
- Handles loading, success, and error states
- Saves user data securely using **MMKV**
- Logout functionality included

---

## **2. Product Listing Screen**
- Displays products in **2-column grid layout**
- Shows product image, name, price, discount badge
- Quick Add/Remove to cart directly in listing
- Pagination (load more)
- Pull-to-refresh
- Search bar with **debounced API calls**
- Floating cart button with item count badge
- Skeleton loader UI while fetching

---

## **3. Product Details Screen**
- Image carousel with zoom feature
- Product name, price, description, specifications
- Quantity selector
- Add/Update cart quantity
- Share product option

---

## **4. Cart Screen**
- Shows all cart items with images
- Quantity increase/decrease
- Remove item with confirmation
- Apply coupon (mock)
- Price summary: subtotal, discount, tax, total
- Checkout button
- Empty cart view with “Continue Shopping”
- Cart state persisted with MMKV

---

## **5. Barcode Scanner Screen**
- Uses **react-native-vision-camera v4** for scanning
- Detects barcodes/QR codes
- Camera permission handling
- Auto-navigate to product details after scanning
- Flashlight toggle
- Stores scan history (last 5 items)

---

# 🏗 Architecture Overview

The app uses clean, modular, scalable architecture.

src/
│
├── assets/
│ └── ecommerce-Logo.png
│
├── navigation/
│ └── AppNavigator.js
│ └── MainStack.js
│
├── screens/
│ ├── LoginScreen.js
│ ├── ProductListScreen.js
│ ├── ProductDetailsScreen.js
│ ├── CartScreen.js
│ └── ScannerScreen.js
│ └── SplashScreen.js
│
├── store/
│ ├── useAuthStore.js
│ ├── useProductStore.js
│ └── useCartStore.js
│ └── useScanStore.js
│
├── utils/
│ ├── storage.js


---

# 🧠 State Management (Zustand)

### **useAuthStore**
Handles:
- Google Sign-In
- Secure storage
- Error/loading states

### **useProductStore**
Handles:
- API fetching
- Pagination
- Search functionality
- Product list state
- Skeleton loading state

### **useCartStore**
Handles:
- Add/Remove/Update cart items
- Price calculations
- Coupon logic
- MMKV persistence

### **useScanStore**
Handles:
- Add/Remove scans

---

# 🗄 MMKV Local Storage Keys

| Key | Description |
|------|-------------|
| `user` | Logged-in user data |
| `cart` | Cart content |
| `coupon` | Discount coupon 
| `scans` | Last 5 scanned codes |

---

# 🌐 API Info

### Endpoint
POST https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/product/v2/filter/product


### Barcode Matching Rule
Match scanned code with:
variants[].barcodes[]


---

# 📦 NPM Packages Used

| Package | Purpose |
|--------|----------|
| `@react-native-google-signin/google-signin` | Google OAuth |
| `zustand` | Global state management |
| `react-native-mmkv` | Fast persistent storage |
| `axios` | API calls |
| `react-native-vision-camera` | Barcode scanning |
| `react-native-reanimated` | Required for camera |
| `@react-navigation/native` | Navigation |
| `@react-navigation/stack` | Stack navigation |
| `react-native-share` | Share feature |

---

# ▶️ How to Run the App

### Install dependencies
npm install
### iOS only: install pods
cd ios
pod install
cd ..

### Run on Android
npx react-native run-android

### Run on iOS
npm run ios


---

# 📸 Screenshots / GIFs
<h3 align="center">📸 App Screenshots</h3>

<table>
  <tr>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/Splash.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/loginPage.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/productscreen.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/productdetails.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/zoom.jpg" width="180"/></td>
  </tr>

  <tr>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/cartscreen.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/coupons.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/empltyCart.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/cameraPermission.jpg" width="180"/></td>
    <td><img src="https://github.com/sibujais/ecommerce/blob/bfef89b4ff4cf0e7299479040603b250d827290d/Scannin.jpg" width="180"/></td>
  </tr>
</table>

---

# ✔ Completed as per assignment requirements

All five required screens & features have been implemented with clean architecture and best practices.

---



