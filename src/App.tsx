import DogLeaderboard from "./components/DogLeaderboard";
import {useEffect, useState} from "react";
import {IDog} from "./utils/types";
import serverUrl from "./utils/serverUrl";

function App(): JSX.Element {
  const [topTenDogs, setTopTenDogs] = useState<IDog[]>([]);
  async function getDogsFromServer(): Promise<void> {
    try {
      const getTenDogs = await fetch(`${serverUrl}/top10`);
      const dogsJson: IDog[] = await getTenDogs.json();
      setTopTenDogs(dogsJson);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDogsFromServer();
  }, []);
  
  return <DogLeaderboard topTenDogs={topTenDogs} />;
}

export default App;
