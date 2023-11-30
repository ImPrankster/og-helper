import { useState } from "react";
import { useHostsStore } from "../utils/stores";

const HostsInput = () => {
  const [host, setHosts] = useState("http://localhost:3000/");
  const addHost = useHostsStore((state) => state.addHost);

  return (
    <div className="join">
      <input
        className="input input-primary join-item"
        type="url"
        value={host}
        onChange={(e) => {
          e.preventDefault;
          setHosts(e.target.value);
        }}
      />
      <button
        className="join-item btn btn-primary"
        onClick={() => {
          addHost(host);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default HostsInput;
