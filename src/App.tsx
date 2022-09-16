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
import io from 'socket.io-client';
import serverUrl from "./utils/serverUrl";


// newSocket.on("hello", () => {
//   console.log("we got a message")
// });

// newSocket.on("time", (arg1) => {
//   console.log("do something, ANYTHING!", arg1)
// });


function App(): JSX.Element {
  const [topTenDogs, setTopTenDogs] = useState<IDog[]>([]);

  useEffect(() => {
    // neill
    /* Making and save a socket io connection to our server
      Register listeners to process certain socket io events from the server  */
    const newSocket = io(`${serverUrl}/`);
    console.log(newSocket);

    const handleNewLeaderboard = (args : any[] ) => {
      console.log("new leaderboard recieved" , args);
      setTopTenDogs(args)
    }

    newSocket.on("chatMessage", handleNewLeaderboard);
    // return a clean up function to be called in the event the component is unmounted
    // The clean up function should disconnect from the socket io server and unregister any listeners

    return () => {
      console.log("unmounting app")
      newSocket.disconnect()
      newSocket.off("chatMessage",handleNewLeaderboard)
    }
  }, []);

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
