import Hosts from "./components/hosts";
import HostsInput from "./components/input";
import { useHostsStore } from "./utils/stores";

function App() {
  return (
    <main className="flex flex-col items-center gap-8 p-4 min-h-screen w-screen">
      <h1 className="font-bold text-6xl m-4">Open Graph Helper</h1>
      <HostsInput />
      <Hosts />
      <Reset />
    </main>
  );
}

function Reset() {
  const resetHosts = useHostsStore((state) => state.resetHosts);
  return (
    <button className="btn btn-outline btn-error" onClick={() => resetHosts()}>
      Reset
    </button>
  );
}

export default App;
