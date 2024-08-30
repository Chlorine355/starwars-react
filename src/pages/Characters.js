import { useState } from 'react'


const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadNextPage = () => {
    if (next > 0) {
    if (!loading) {setLoading(true)};
    fetch("https://swapi.dev/api/people?page=" + next)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCharacters( [...characters, ...data["results"]] );
        if (data["next"]) {setNext(next + 1)} else {setNext(-1)};
        setLoading(false);
      })
    }
  }


  return (
    <>
      <h1 onClick={loadNextPage}>Characters</h1>
      <ul>
      { characters.map(character => {
        return <li key={character.name}> {character.name} </li>
      }) }
      </ul>
    </>);
};

export default Characters;
