import { create } from "zustand";

const initialState = {
  id: null,
  type: "",
  wordLength: 0,
  seeds: "",
  translation: "",
  estonianWords: [],
  initialSentence: "",
  openTime: "",
  closeTime: null,
  tokens: 0,
  totalPoints: 0,
  maxPoints: 0,
  correction: null,
  humanResponse: "",
  userID: "",
  step: 0,
};

const useGameStore = create((set) => ({
  ...initialState,

  reset: () => set(initialState),

  updateGameSettings: (updates) =>
    set((state) => ({
      ...state,
      ...updates,
    })),

  // New method to initialize game data
  setGameData: (gameData) =>
    set(() => ({
      ...initialState, // Reset to initial state if needed
      ...gameData, // Update state with the received game data
    })),

  setStep: (newStep) => set({ step: newStep }), // Function to set the step
  setHumanResponse: (response) => set({humanResponse: response})
}));

export { useGameStore };
