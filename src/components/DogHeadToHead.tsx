import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import placeholderDog from "../utils/placeholderDog";
import serverUrl from "../utils/serverUrl";
import axios from "axios";
import getDogsFromServer from "../utils/getDogsFromServer";

interface IProps {
  setTopTenDogs: React.Dispatch<React.SetStateAction<IDog[]>>;
}

export default function DogHeadToHead({ setTopTenDogs }: IProps): JSX.Element {
  const [dogComparer, setDogComparer] = useState<[IDog, IDog]>([
    placeholderDog,
    placeholderDog,
  ]);
  async function setStateToTwoRandomDogs(): Promise<void> {
    try {
      const dogOne = await fetch(`${serverUrl}/random`);
      const dogOneJson: IDog = await dogOne.json();
      const dogTwo = await fetch(`${serverUrl}/random`);
      const dogTwoJson: IDog = await dogTwo.json();
      setDogComparer([dogOneJson, dogTwoJson]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setStateToTwoRandomDogs();
  }, []);

  const handleVoteForDog = async (breedOfDog: string) => {
    try {
      console.log({ breedOfDog });
      await axios.post(`${serverUrl}/dog`, { breed: breedOfDog });
      setStateToTwoRandomDogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Pick your favourite dog!</h1>
      <img
        className="dog-image"
        src={dogComparer[0].image}
        alt={`Dog of breed ${dogComparer[0].breed}`}
      />
      <button
        onClick={async () => {
          await handleVoteForDog(dogComparer[0].breed);
          await getDogsFromServer(setTopTenDogs);
        }}
        className="vote"
      >
        vote for {dogComparer[0].breed}
      </button>
      <img
        className="dog-image"
        src={dogComparer[1].image}
        alt={`Dog of breed ${dogComparer[1].breed}`}
      />
      <button
        onClick={async () => {
          await handleVoteForDog(dogComparer[1].breed);
          await getDogsFromServer(setTopTenDogs);
        }}
        className="vote"
      >
        vote for {dogComparer[1].breed}
      </button>
    </div>
  );
}

// button should send off to db and increment votes by 1 or create a new breed with a vote of 1.
