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
      <div className="card border-secondary border-2 w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">Loading...</h2>
          <p>{host}</p>
          <div className="card-actions justify-end">
            <Delete index={index} />
          </div>
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="card border-error border-2 w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">{host}</h2>
          <p className="text-error">{query.error.message}</p>
          <div className="card-actions justify-end">
            <Delete index={index} />
          </div>
        </div>
      </div>
    );
  }

  if (query.data?.error) {
    return (
      <div className="card border-warning border-2 w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-mono">{host}</h2>
          <p className="text-error">Can not retrieve metadata!</p>
          <div className="card-actions justify-end">
            <Delete index={index} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 border-base-content border-2 bg-base-100 shadow-xl">
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
        <div className="card-actions justify-end">
          <Delete index={index} />
        </div>
      </div>
    </div>
  );
};

function Delete({ index }: { index: number }) {
  const deleteByIndex = useHostsStore((state) => state.deleteByIndex);
  return (
    <button
      className="btn btn-outline btn-error"
      onClick={() => deleteByIndex(index)}
    >
      Delete
    </button>
  );
}

export default Card;
