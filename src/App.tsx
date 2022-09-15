import DogLeaderboard from "./components/DogLeaderboard";
import { useEffect, useState } from "react";
import { IDog } from "./utils/types";
import TopThreeDogs from "./components/TopThreeDogs";
import DogHeadToHead from "./components/DogHeadToHead";
import getDogsFromServer from "./utils/getDogsFromServer";

/// boot strap grid
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//socket
import io, { Socket } from 'socket.io-client';

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
  // setTopTenDogs(arg1)
})

function App(): JSX.Element {
  const [topTenDogs, setTopTenDogs] = useState<IDog[]>([]);

  useEffect(() => {
    getDogsFromServer(setTopTenDogs);
  }, []);

  return (
    // <div>
    //   <DogLeaderboard topTenDogs={topTenDogs} setTopTenDogs={setTopTenDogs} />
    // </div>
    <Container>
      <Row className="top-row">
        <Col className="top-row-item">
          <DogHeadToHead setTopTenDogs={setTopTenDogs} />
        </Col>
        <Col className="top-row-item">
          {" "}
          <DogLeaderboard
            topTenDogs={topTenDogs}
            setTopTenDogs={setTopTenDogs}
          />
        </Col>
      </Row>
      <Row>
        <TopThreeDogs topTenDogs={topTenDogs} />
      </Row>
    </Container>
  );
}

export default App;
