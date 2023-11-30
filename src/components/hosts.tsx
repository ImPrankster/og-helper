import { useHostsStore } from "../utils/stores";
import Card from "./card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Hosts() {
  const hosts = useHostsStore((state) => state.hosts);
  const [parent] = useAutoAnimate();

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl"
      ref={parent}
    >
      {hosts.map((host, i) => (
        <Card host={host} index={i} key={i} />
      ))}
    </section>
  );
}
