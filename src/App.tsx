import Hosts from "./components/hosts";
import { useHostsStore } from "./utils/stores";

function App() {
  const hosts = useHostsStore((state) => state.hosts);

  return (
    <main className="flex flex-col items-center gap-8 m-4 min-h-screen w-screen">
      <h1 className="font-bold text-6xl p-4">Open Graph Metadata</h1>
      <Hosts hosts={hosts} />
    </main>
  );
}

export default App;
