import { IDog } from "../utils/types";

interface IProps {
  topTenDogs: IDog[];
}

export default function TopThreeDogs({ topTenDogs }: IProps): JSX.Element {
  return (

    <>
    {topTenDogs.slice(0,3).map((dog,index) => (

            <div key={dog.dog_id} className="top_three_container"> 
              <div className="wrapper" >
              <div className="card">
              <img 
              src={dog.image}
              alt={`Dog of breed`}/>
                <div className="info">
                <h1 style={{textTransform:"capitalize"}} >{dog.breed}</h1>
              <p>{dog.votes}</p>
                </div>
              </div>
              </div>   
            </div>
    ))}
    </>
    // <div className="top_three_container">
    //   <h3>Top Three Dogs</h3>
    //   {topTenDogs.slice(0, 3).map((dog, index) => (
    //     <div key={dog.dog_id ?? index} className="top_three_labels">
    //       <p>
    //         {dog.breed} {dog.votes}
    //       </p>
    //       <img
    //         className="dog-image_top_three"
    //         src={dog.image}
    //         alt={`A ${dog.breed}`}
    //       />
    //     </div>
    //   ))}
    // </div>
  )
}
