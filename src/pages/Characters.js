import { useState } from 'react'
import male_icon from '../icon-male.png'
import female_icon from '../icon-female.png'

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  // const [wookieCharacters, setWookieCharacters] = useState([]);
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
        setTotalCount(data["count"]);
        setLoading(false);
      })
    }
  }

  if (next == 1 && !loading) {
    loadNextPage();
  }


  return (
    <div className="characters-wrapper">
      <h1 style={{color: "white"}}>Pick anyone from {totalCount} characters!</h1>
      <ul className="cards">
      { characters.map(character => {
        return  <li className="card" key={character.name}>
            <span>{character.name}</span>
            <span>Height: {character.height}</span>
            <span>Mass: {character.mass}</span>
            <span>Born: {character.birth_year}</span>
            <span>Gender: {character.gender}</span>
          </li>
      }) }
      </ul>
      {next > 0 ? <div className="button yellow" onClick={loadNextPage}>Load more{loading ? "..." : ""}</div> : "" }
      </div>
    );
};

export default Characters;
