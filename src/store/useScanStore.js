import { create } from "zustand";
import { storage } from "../utils/storage";

export const useScanStore = create((set) => ({
  scans: storage.getString("scans")
    ? JSON.parse(storage.getString("scans"))
    : [],

  addScan: (code) =>
    set((state) => {
      const updated = [code, ...state.scans].slice(0, 5); // Only last 5
      storage.set("scans", JSON.stringify(updated));
      return { scans: updated };
    }),

  clearScans: () => {
    storage.delete("scans");
    set({ scans: [] });
  }
}));
