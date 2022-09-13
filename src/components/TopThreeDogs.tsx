import { IDog } from "../utils/types";

interface IProps {
  topTenDogs: IDog[];
}

export default function TopThreeDogs({ topTenDogs }: IProps): JSX.Element {
  return (
    <div>
      <h3>Top Three Dogs</h3>
      {topTenDogs.slice(0, 3).map((dog, index) => (
        <div key={dog.dog_id ?? index}>
          <p>
            {dog.breed} {dog.votes}
          </p>
          <img src={dog.image} alt={`A ${dog.breed}`} />
        </div>
      ))}
    </div>
  );
}
