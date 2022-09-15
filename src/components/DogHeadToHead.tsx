import { useEffect, useState } from "react";
import { IDog } from "../utils/types";
import placeholderDog from "../utils/placeholderDog";
import serverUrl from "../utils/serverUrl";
import axios from "axios";
import getDogsFromServer from "../utils/getDogsFromServer";

//socket
import io, { Socket } from 'socket.io-client';


interface IProps {
  setTopTenDogs: React.Dispatch<React.SetStateAction<IDog[]>>;
}

// const newSocket = io('https://c5b3-dog-voting-app.herokuapp.com');
  const newSocket = io('http://localhost:4000/')
  console.log(newSocket);
  
  newSocket.on("hello", () => {
    console.log("we got a message")
  });

  newSocket.on("time", (arg1) => {
    console.log("do something, ANYTHING!", arg1)
  });

  newSocket.on("chatMessage", (arg1) => {
    console.log("chat messages has been received", arg1);
  })

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

  const handleSocketClick = () => {

    newSocket.emit("squirrel!", Math.random());
    console.log("I have been clicked!", new Date());
  }

  

  return (
    <div>
      <button onClick={handleSocketClick}>Send Socket io Message</button>
      <h1>Pick your favourite dog!</h1>
      <img
        className="dog-image"
        src={dogComparer[0].image}
        alt={`Dog of breed ${dogComparer[0].breed}`}
        onClick={async () => await changeImageForBreed(dogComparer[0].breed, 0)}
      />
      <button
        onClick={async () => {
          audio.play();
          setVoteCount((state) => state + 1);
          await getNumberOfVotes();
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
        onClick={async () => await changeImageForBreed(dogComparer[1].breed, 1)}
      />
      <button
        onClick={async () => {
          audio.play();
          setVoteCount((state) => state + 1);
          await getNumberOfVotes();
          await handleVoteForDog(dogComparer[1].breed);
          await getDogsFromServer(setTopTenDogs);
        }}
        className="vote"
      >
        vote for {dogComparer[1].breed}
      </button>
      <p>
        You have voted {voteCount} time{voteCount === 1 ? "" : "s"} out of{" "}
        {totalVotes} total votes
      </p>
    </div>
  );
}

// button should send off to db and increment votes by 1 or create a new breed with a vote of 1.
