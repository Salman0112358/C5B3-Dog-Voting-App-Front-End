import serverUrl from "../utils/serverUrl";
import { useEffect, useState } from "react";
import { IDog } from "../utils/types";

//Display top 10 dogs with name and number of votes
export default function DogLeaderboard(): JSX.Element {
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
  return (
    <div>
      {topTenDogs.map((dog) => (
        <p key={dog.dog_id}>
          {dog.breed} {dog.votes}
        </p>
      ))}
    </div>
  );
}
