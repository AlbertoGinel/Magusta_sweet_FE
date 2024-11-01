import { create } from "zustand";

const useTestCounter = create((set) => ({
  count: 0,
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

export { useTestCounter };
