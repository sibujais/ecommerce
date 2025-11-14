import { create } from "zustand";
import axios from "axios";

// Normalize API product → UI-friendly product format
const normalizeProduct = (item, index) => {
  const variant = item?.variants?.[0] || {};
  const inv = variant?.inventorySync || {};

  const image =
    item?.imageUrls?.[0] ||
    variant?.images?.[0]?.url ||
    `https://picsum.photos/id/${400 + index}/400/500`;

  const sellingPrice =
    inv?.sellingPrice ||
    inv?.mrp ||
    Math.floor(Math.random() * 300 + 99);

  const mrp =
    inv?.mrp ||
    sellingPrice + Math.floor(Math.random() * 150 + 30);

  const discountPercent =
    mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : Math.floor(Math.random() * 40 + 5);

  const barcode =
    variant?.barcodes?.[0] ||
    String(Math.floor(Math.random() * 1000000000000));

  return {
    id: item.productId,
    productId: item.productId,
    name: item.name || item.title || "Unnamed Product",
    image,
    price: sellingPrice,
    mrp,
    discountPercent,
    description: item.description || "",
    barcode,
    raw: item,
  };
};

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  refreshing: false,
  page: 1,
  hasMore: true,
  search: "",

  fetchProducts: async (reset = false) => {
    try {
      if (reset) {
        set({ page: 1, loading: true });
      } else {
        set({ loading: true });
      }

      const page = reset ? 1 : get().page;

      const response = await axios.post(
        "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/product/v2/filter/product",
        {
          page,
          pageSize: 10,
          sort: { creationDateSortOption: "DESC" },
        },
        {
          headers: {
            "x-internal-call": "true",
          },
        }
      );

      const list = response.data?.data?.data || [];
      const normalized = list.map((item, index) =>
        normalizeProduct(item, (page - 1) * 10 + index)
      );

      const finalList = reset
        ? normalized
        : [...get().products, ...normalized];

      set({
        products: finalList,
        filteredProducts: finalList,
        page: page + 1,
        loading: false,
        refreshing: false,
        hasMore: list.length > 0,
      });
    } catch (err) {
      console.log("PRODUCT API ERROR:", err);
      set({ loading: false, refreshing: false });
    }
  },

  refresh: async () => {
    set({ refreshing: true });
    await get().fetchProducts(true);
  },

  setSearch: (text) => {
    set({ search: text });

    const all = get().products;
    const q = text.toLowerCase();

    const filtered = all.filter((item) => {
      const name = item.name.toLowerCase();
      
      return (
        name.includes(q) 
      );
    });

    set({ filteredProducts: filtered });
  },

  reset: () => set({ products: [], filteredProducts: [], page: 1 }),
}));
