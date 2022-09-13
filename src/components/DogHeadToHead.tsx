import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import placeholderDog from "../utils/placeholderDog";
import serverUrl from "../utils/serverUrl";

export default function DogHeadToHead(): JSX.Element {
  const [dogComparer, setDogComparer] = useState<[IDog, IDog]>([placeholderDog, placeholderDog])
  async function setStateToTwoRandomDogs(): Promise<void> {
    const dogOne = await fetch(`${serverUrl}/random`);
    const dogOneJson: IDog = await dogOne.json();
    const dogTwo = await fetch(`${serverUrl}/random`);
    const dogTwoJson: IDog = await dogTwo.json();
    setDogComparer([dogOneJson, dogTwoJson]);
  }
  useEffect(() => {
    setStateToTwoRandomDogs();
  }, []);
  return (
    <div>
      <h1>Pick your favourite dog!</h1>
      <img className="dog-image" src={dogComparer[0].image} alt={`Dog of breed ${dogComparer[0].breed}`} />
      <img className="dog-image" src={dogComparer[1].image} alt={`Dog of breed ${dogComparer[1].breed}`} />
    </div>
  )
}

