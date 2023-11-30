import { create } from "zustand";
import { persist } from "zustand/middleware";

type HostsStore = {
  hosts: string[];
  addHost: (host: string) => void;
};

export const useHostsStore = create<HostsStore>()(
  persist(
    (set, get) => ({
      hosts: [],
      addHost: (host: string) => set({ hosts: [...get().hosts, host] }),
    }),
    {
      name: "hosts",
    }
  )
);
