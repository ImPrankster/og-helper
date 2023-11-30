import { HostData } from "./hosts";

const DisplayCard = ({ host }: { host: HostData }) => {
  return host.error || host.ogError ? (
    <div className="card border-error border-2 w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title font-mono">{host.origin}</h2>
        {host.error ? (
          <p className="text-error">Can not establish connection!</p>
        ) : (
          <p className="text-error">Can not retrieve metadata!</p>
        )}
      </div>
    </div>
  ) : (
    <div className="card w-96 border-base-content border-2 bg-base-100 shadow-xl">
      {host.og.ogImage &&
        host.og.ogImage.map((image, index) => {
          return <img src={image.url} alt={host.og.ogTitle} key={index} />;
        })}
      <figure></figure>
      <div className="card-body">
        <h2 className="card-title">{host.og.ogTitle}</h2>
        <p className="font-mono">{host.origin}</p>
        <p>{host.og.ogDescription}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default DisplayCard;
