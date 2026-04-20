// store/useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist(
    (set) => ({
      // Store brands
      storeBrand: null,
      setStoreBrand: (storeBrand) => set({ storeBrand }),

      // User profile
      profile: null,
      setProfile: (profile) => set({ profile }),

      // Countries
      // FIX 1: was set({ countries }) — wrong key, state key is 'country'
      // every consumer reading state.country got null
      country: null,
      setCountry: (country) => set({ country }),

      // KYC documents
      // FIX 2: was (kycInfo) => [...kycInfo] — never called set(),
      // just spread the array and discarded it, KycInfo stayed null forever
      KycInfo: null,
      setKycInfo: (kycInfo) => set({ KycInfo: kycInfo }),

      // FIX 3: resetStore was missing country and KycInfo
      resetStore: () =>
        set({
          storeBrand: null,
          profile: null,
          country: null,
          KycInfo: null,
        }),
    }),
    { name: "bringo-store" },
  ),
);

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  resetStore: () =>
    set({
      profile: null,
    }),
}));
