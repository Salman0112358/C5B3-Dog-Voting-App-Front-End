import { greet } from "./utils/greet";

function App(): JSX.Element {
  return <h1>{greet("Test")}</h1>;
}

export default App;
