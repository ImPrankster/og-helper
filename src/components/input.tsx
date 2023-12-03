import { useState } from "react";

import { useHostsStore } from "../utils/stores";

const HostsInput = () => {
  const [host, setHosts] = useState("http://localhost:3000/");
  const addHost = useHostsStore((state) => state.addHost);

  return (
    <div className="join">
      <input
        className="input join-item input-primary"
        type="url"
        value={host}
        onChange={(e) => {
          e.preventDefault;
          setHosts(e.target.value);
        }}
      />
      <button
        className="btn btn-square btn-primary join-item"
        onClick={() => {
          addHost(host);
        }}
      >
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
          className="lucide lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </div>
  );
};

export default HostsInput;
