import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import placeholderDog from "../utils/placeholderDog";
import serverUrl from "../utils/serverUrl";
import axios from "axios";

export default function DogHeadToHead(): JSX.Element {
  const [dogComparer, setDogComparer] = useState<[IDog, IDog]>([
    placeholderDog,
    placeholderDog,
  ]);
  async function setStateToTwoRandomDogs(): Promise<void> {
    try {
      const dogOne = await fetch(`${serverUrl}/random`);
      const dogOneJson: IDog = await dogOne.json();
      let dogTwo = await fetch(`${serverUrl}/random`);
      let dogTwoJson: IDog = await dogTwo.json();
      setDogComparer([dogOneJson, dogTwoJson]);
      while (dogOneJson.breed === dogTwoJson.breed) {
        dogTwo = await fetch(`${serverUrl}/random`);
        dogTwoJson = await dogTwo.json();
        setDogComparer([dogOneJson, dogTwoJson]);
      }
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
        onClick={() => handleVoteForDog(dogComparer[0].breed)}
        className="voteDog"
      >
        vote for {dogComparer[0].breed}
      </button>
      <img
        className="dog-image"
        src={dogComparer[1].image}
        alt={`Dog of breed ${dogComparer[1].breed}`}
      />
      <button
        onClick={() => handleVoteForDog(dogComparer[1].breed)}
        className="voteDog"
      >
        vote for {dogComparer[1].breed}
      </button>
    </div>
  );
}

// button should send off to db and increment votes by 1 or create a new breed with a vote of 1.
