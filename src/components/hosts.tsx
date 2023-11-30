import { useQuery } from "@tanstack/react-query";
import ogs from "open-graph-scraper-lite";
import { type ArrElement } from "~/utils/tools";
import DisplayCard from "./displayCard";

async function fetchWithTimeout(
  resource: string,
  options?: RequestInit & { timeout: number }
) {
  const timeout = options?.timeout ?? 200;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

async function getLocalHost(hosts: string[]) {
  const htmlArr = hosts.map(async (host) => {
    return fetchWithTimeout(host).then(
      async (res) => {
        return { origin: host, error: false as const, html: await res.text() };
      },
      (err) => {
        return { origin: host, error: true as const, err };
      }
    );
  });

  const resolvedHtmlArr = await Promise.all(htmlArr);

  const res = resolvedHtmlArr.map(async (item) => {
    if (item.error) {
      return {
        ...item,
      };
    }
    const result = await ogs({ html: item.html });
    return result.error
      ? { ...item, ogError: true as const }
      : { ...item, ogError: false as const, og: result.result };
  });

  return await Promise.all(res);
}

export type HostData = ArrElement<Awaited<ReturnType<typeof getLocalHost>>>;

export default function Hosts({ hosts }: { hosts: string[] }) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["lh"],
    queryFn: () => getLocalHost(hosts),
  });

  return (
    <section className="flex gap-4 max-w-screen-md">
      {!(isLoading && isSuccess) &&
        data?.map((item, i) => {
          return <DisplayCard host={item} key={i} />;
        })}
    </section>
  );
}
