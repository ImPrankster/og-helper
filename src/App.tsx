import Hosts from "./components/hosts";
import HostsInput from "./components/input";
import { useHostsStore } from "./utils/stores";

function App() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <h1 className="mt-2 text-6xl font-bold">Open Graph Helper</h1>
      <p>
        Made by <a href="https://leow.io/">Leo Wang</a> | Contribute on
        <a href="https://github.com/ImPrankster/og-helper/" className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github inline-block"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </p>
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
