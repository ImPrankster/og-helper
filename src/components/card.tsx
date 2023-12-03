import { useQuery } from "@tanstack/react-query";
import ogs from "open-graph-scraper-lite";

import { useHostsStore } from "../utils/stores";

async function getOgData(host: string) {
  const html = await fetch(host).then((res) => res.text());
  const result = await ogs({ html });
  return result;
}

const Card = ({ host, index }: { host: string; index: number }) => {
  const query = useQuery({
    queryKey: ["og", host],
    queryFn: () => getOgData(host),
  });

  if (query.isLoading) {
    return (
      <div className="card w-96 border-2 border-secondary bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">Loading...</h2>
          <p>{host}</p>
          <div className="card-actions justify-end">
            <Links host={host} index={index} />
          </div>
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="card w-96 border-2 border-error bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">{host}</h2>
          <p className="text-error">{query.error.message}</p>
          <div className="card-actions justify-end">
            <Links host={host} index={index} />
          </div>
        </div>
      </div>
    );
  }

  if (query.data?.error) {
    return (
      <div className="card w-96 border-2 border-warning bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">{host}</h2>
          <p className="text-error">Can not retrieve metadata!</p>
          <div className="card-actions justify-end">
            <Links host={host} index={index} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card z-0 w-96 bg-base-100 shadow-xl">
        <figure>
          {query.data?.result.ogImage &&
            query.data?.result.ogImage.map((image, index) => {
              return (
                <img
                  src={image.url}
                  alt={query.data?.result.ogTitle}
                  key={index}
                />
              );
            })}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{query.data?.result.ogTitle}</h2>
          <p className="font-mono">{host}</p>
          <p>{query.data?.result.ogDescription}</p>
          <div className="card-actions mt-2 w-full justify-end">
            <label
              htmlFor={`my-drawer-${index}`}
              className="btn btn-square btn-primary drawer-button"
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
                className="lucide lucide-info"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </label>
            <div className="flex-1" />
            <Links host={host} index={index} />
          </div>
        </div>
      </div>
      <div className="drawer drawer-end z-10 order-last">
        <input
          id={`my-drawer-${index}`}
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-side">
          <label
            htmlFor={`my-drawer-${index}`}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu flex min-h-full w-96 flex-col bg-base-200 p-4 text-base-content">
            <pre className="w-full overflow-auto">
              {JSON.stringify(query.data?.result, undefined, 2)}
            </pre>
            <div className="flex-1" />
            <label
              htmlFor={`my-drawer-${index}`}
              className="btn drawer-button w-full"
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
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </label>
          </ul>
        </div>
      </div>
    </>
  );
};

function Links({ host, index }: { host: string; index: number }) {
  const deleteByIndex = useHostsStore((state) => state.deleteByIndex);
  return (
    <>
      <a href={host} className="btn btn-square btn-neutral">
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
          className="lucide lucide-arrow-up-left-from-circle"
        >
          <path d="M2 8V2h6" />
          <path d="m2 2 10 10" />
          <path d="M12 2A10 10 0 1 1 2 12" />
        </svg>
      </a>
      <button
        className="btn btn-square btn-error"
        onClick={() => deleteByIndex(index)}
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
          className="lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </>
  );
}

export default Card;
