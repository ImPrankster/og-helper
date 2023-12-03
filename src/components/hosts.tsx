import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useHostsStore } from "../utils/stores";
import Card from "./card";

export default function Hosts() {
  const hosts = useHostsStore((state) => state.hosts);
  const [parent] = useAutoAnimate();

  return (
    <section
      className="grid max-w-screen-xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      ref={parent}
    >
      {hosts.map((host, i) => (
        <Card host={host} index={i} key={i} />
      ))}
    </section>
  );
}
