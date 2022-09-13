import serverUrl from "./serverUrl";
import { IDog } from "./types";

export default async function getDogsFromServer(
  setTopTenDogs: React.Dispatch<React.SetStateAction<IDog[]>>
): Promise<void> {
  try {
    const getTenDogs = await fetch(`${serverUrl}/top10`);
    const dogsJson: IDog[] = await getTenDogs.json();
    setTopTenDogs(dogsJson);
  } catch (error) {
    console.log(error);
  }
}
