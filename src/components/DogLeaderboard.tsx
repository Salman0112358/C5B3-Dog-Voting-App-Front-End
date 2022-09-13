// import serverUrl from "../utils/serverUrl";
// import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import getDogsFromServer from "../utils/getDogsFromServer";

interface IProps {
  topTenDogs: IDog[];
  setTopTenDogs: React.Dispatch<React.SetStateAction<IDog[]>>;
}

//Display top 10 dogs with name and number of votes
export default function DogLeaderboard({
  topTenDogs,
  setTopTenDogs,
}: IProps): JSX.Element {
  return (
    <div>
      <h3>Dog Leaderboard</h3>
      {topTenDogs.map((dog, index) => (
        <p key={dog.dog_id ?? index}>
          {dog.breed} {dog.votes}
        </p>
      ))}
      <button onClick={() => getDogsFromServer(setTopTenDogs)}>
        Refresh Leaderboard
      </button>
    </div>
  );
}
