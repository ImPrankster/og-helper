import { create } from "zustand";
import { persist } from "zustand/middleware";

type HostsStore = {
  hosts: string[];
  addHost: (host: string) => void;
  resetHosts: () => void;
  deleteByIndex: (index: number) => void;
};

export const useHostsStore = create<HostsStore>()(
  persist(
    (set, get) => ({
      hosts: [],
      addHost: (host: string) => {
        set({ hosts: [...get().hosts, host] });
      },
      resetHosts: () => {
        set({ hosts: [] });
      },
      deleteByIndex: (index: number) => {
        set({ hosts: [...get().hosts.filter((_, i) => i !== index)] });
      },
    }),
    {
      name: "hosts",
    },
  ),
);
