import DogLeaderboard from "./components/DogLeaderboard";
import { useEffect, useState } from "react";
import { IDog } from "./utils/types";
import TopThreeDogs from "./components/TopThreeDogs";
import DogHeadToHead from "./components/DogHeadToHead";
import getDogsFromServer from "./utils/getDogsFromServer";

function App(): JSX.Element {
  const [topTenDogs, setTopTenDogs] = useState<IDog[]>([]);

  useEffect(() => {
    getDogsFromServer(setTopTenDogs);
  }, []);

  return (
    <div>
      <DogHeadToHead />
      <DogLeaderboard topTenDogs={topTenDogs} setTopTenDogs={setTopTenDogs} />
      <TopThreeDogs topTenDogs={topTenDogs} />
    </div>
  );
}

export default App;
