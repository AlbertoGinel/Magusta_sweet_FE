import { create } from "zustand";
import useCounter from "./themeStore";

const useGeneralStore = create((set) => ({
  currentStore: "theme", // 'theme' or 'user'
  setCurrentStore: (store) => set({ currentStore: store }),
  resetStores: () => {
    useCounter.getState().resetCounter();
  },
  // Optional: General state that affects both thematic stores
  sharedState: { globalMessage: "" },
  setSharedState: (message) =>
    set((state) => ({
      sharedState: { ...state.sharedState, globalMessage: message },
    })),
}));

export default useGeneralStore;
