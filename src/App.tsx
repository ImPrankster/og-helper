import { useQuery } from "@tanstack/react-query";
import ogs from "open-graph-scraper-lite";

async function getLocalHost() {
  const html = await fetch("http://localhost:5173/").then((res) => res.text());
  const res = await ogs({ html: html });
  return res;
}

function App() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["lh"],
    queryFn: getLocalHost,
  });

  return (
    <main className="flex flex-col min-h-screen w-screen">
      {!(isLoading && isSuccess) && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{data && JSON.stringify(data)}</h2>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
