// import serverUrl from "../utils/serverUrl";
// import { useEffect, useState } from "react";
import { IDog } from "../utils/types";

interface IProps {
  topTenDogs: IDog[]
}

//Display top 10 dogs with name and number of votes
export default function DogLeaderboard({topTenDogs}: IProps): JSX.Element {
  return (
    <div>
      <h3>Dog Leaderboard</h3>
      {topTenDogs.map((dog) => (
        <p key={dog.dog_id}>
          {dog.breed} {dog.votes}
        </p>
      ))}
    </div>
  );
}
