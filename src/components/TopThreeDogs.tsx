import { IDog } from "../utils/types";

interface IProps {
  topTenDogs: IDog[];
}

export default function TopThreeDogs({ topTenDogs }: IProps): JSX.Element {
  return (
    <div className="top_three_container">
      <h3>Top Three Dogs</h3>
      {topTenDogs.slice(0, 3).map((dog, index) => (
        <div key={dog.dog_id ?? index} className="top_three_labels">
          <p>
            <b>{dog.breed} {dog.votes}</b>
          </p>
          <img
            className="dog-image_top_three"
            src={dog.image}
            alt={`A ${dog.breed}`}
          />
        </div>
      ))}
    </div>
  );
}
