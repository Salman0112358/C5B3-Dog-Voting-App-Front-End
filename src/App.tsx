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

function App(): JSX.Element {
  const [topTenDogs, setTopTenDogs] = useState<IDog[]>([]);

  useEffect(() => {
    getDogsFromServer(setTopTenDogs);
  }, []);

  return (
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
