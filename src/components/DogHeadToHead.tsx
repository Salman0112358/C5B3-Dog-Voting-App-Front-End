import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import placeholderDog from "../utils/placeholderDog";
import serverUrl from "../utils/serverUrl";
import axios from "axios";
import getDogsFromServer from "../utils/getDogsFromServer";
import '../components/FancyDogPictureFrame/FancyDogPictureFrame.scss'

interface IProps {
  setTopTenDogs: React.Dispatch<React.SetStateAction<IDog[]>>;
}

const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

export default function DogHeadToHead({ setTopTenDogs }: IProps): JSX.Element {
  const [dogComparer, setDogComparer] = useState<[IDog, IDog]>([
    placeholderDog,
    placeholderDog,
  ]);
  const [voteCount, setVoteCount] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
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
    getNumberOfVotes();
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

  const changeImageForBreed = async (breed: string, index: number) => {
    const response = await fetch(`${serverUrl}/random/${breed}`);

    const newDogImage = await response.json();

    const finalRandomImage = newDogImage.image;

    const updateImageAgain: [IDog, IDog] = [...dogComparer];

    updateImageAgain[index].image = finalRandomImage;

    setDogComparer(updateImageAgain);

    console.log(updateImageAgain);
  };

  async function getNumberOfVotes(): Promise<void> {
    const numberOfVotes: { totalVotes: number } = (
      await axios.get(`${serverUrl}/totalVotes`)
    ).data;
    console.log(numberOfVotes);
    setTotalVotes(numberOfVotes.totalVotes);
  }

  return (

    <>
    <h1>Pick your favourite dog!</h1>
    
    <div className="dog_pictures_container">
      <div className="wrapper">
        <div className="card"
           onClick={async () => await changeImageForBreed(dogComparer[0].breed, 0)}
        >
        <img className="dog_image" 
        src={dogComparer[0].image}
        alt={`Dog of breed ${dogComparer[0].breed}`}
        // onClick={async () => await changeImageForBreed(dogComparer[0].breed, 0)}
        />
          <div className="info">
            <h1 style={{textTransform:"capitalize"}}>{dogComparer[0].breed}</h1>
            <p>Has {dogComparer[0].votes===undefined ? 0 : dogComparer[0].votes } votes so far</p>
            <button
        onClick={async () => {
          audio.play();
          setVoteCount((state) => state + 1);
          await getNumberOfVotes();
          await handleVoteForDog(dogComparer[0].breed);
          await getDogsFromServer(setTopTenDogs);
        }}
      >
        vote for {dogComparer[0].breed}
      </button>
          </div>
        </div>
    </div>

    <div className="wrapper">
        <div className="card"
         onClick={async () => await changeImageForBreed(dogComparer[1].breed, 1)}
        >
        <img 
        src={dogComparer[1].image}
        alt={`Dog of breed ${dogComparer[1].breed}`}
        // onClick={async () => await changeImageForBreed(dogComparer[1].breed, 1)}
        />
          <div className="info">
            <h1 style={{textTransform:"capitalize"}} >{dogComparer[1].breed}</h1>
            <p>Has {dogComparer[1].votes===undefined ? 0 : dogComparer[1].votes } votes so far</p>
            <button
        onClick={async () => {
          audio.play();
          setVoteCount((state) => state + 1);
          await getNumberOfVotes();
          await handleVoteForDog(dogComparer[1].breed);
          await getDogsFromServer(setTopTenDogs);
        }}
      >
        vote for {dogComparer[1].breed}
      </button>
          </div>
        </div>
    </div>      
    </div>

    <div className="current_votes">
      <h3>
        You have voted {voteCount} time{voteCount === 1 ? "" : "s"} this session out of{" "}
        {totalVotes} total votes
      </h3>
    </div>
 

    </>
  );
}
