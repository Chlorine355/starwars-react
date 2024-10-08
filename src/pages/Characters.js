import { useState } from 'react'
import male_icon from '../icon-male.png'
import female_icon from '../icon-female.png'
import Loader from '../Loader'
import Select from "react-dropdown-select";


const Characters = () => {
  const [characters, setCharacters] = useState([]);
  // const [wookieCharacters, setWookieCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [modalCharacter, setModalCharacter] = useState(null);
  const [modalShown, setModalShown] = useState(false);

  const [options, setOptions] = useState([{
  id: 1,
  name: 'all'
}]);
  const [filterVal, setFilterVal] = useState("all");

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
        setOptions(makeOptionsList( [...characters, ...data["results"]] ));
      })
    }
  }

  const showModal = (character) => {
    console.log(character.name);
    setModalCharacter(character);
    setModalShown(true);
  }

  const toggleModal = () => {
    setModalShown(!modalShown);
  }

  const makeOptionsList = (characters) => {
    let eye_colors = ["all"];
    for (let char of characters) {
      console.log(char);
      if (!eye_colors.includes(char.eye_color)) {
        eye_colors.push(char.eye_color);
      }
    }
    let result = [];
    for (let i = 0; i < eye_colors.length; i++) {
      result.push( {"id": i, "name": eye_colors[i]} )
    }
    return result;
  }

  if (next == 1 && !loading) {
    loadNextPage();
  }

  const gender_to_color = {
    "male": "#4baeff",
    "female": "pink",
    "hermaphrodite": "lime",
    "n/a": "#d0d0d0"
  }



  return (
    <>
    <div className="modal" style={{display: modalShown ? "flex" : "none"}}>
      <div className="modal-inner">
        <div className="modal-close" onClick={toggleModal}>Close</div>
        {modalCharacter ?
          <>
          <span style={{fontWeight: "bold"}}>{modalCharacter.name}</span>
          <span>Born: {modalCharacter.birth_year}</span>
          <span>Eye color: {modalCharacter.eye_color}</span>
          <span>Hair color: {modalCharacter.hair_color}</span>
          <span>Skin color: {modalCharacter.skin_color}</span>
          <span>Height: {modalCharacter.height}</span>
          <span>Mass: {modalCharacter.mass}</span>
          <span>{modalCharacter.gender == "male" && <img style={{width: "40px"}} src={male_icon}/>}
                {modalCharacter.gender == "female" && <img style={{width: "40px"}} src={female_icon}/>}</span>
        </>
          : ""}
      </div>
    </div>
    <div className="characters-wrapper">
      <h1 style={{color: "white", textAlign: "center", paddingLeft: "20px", paddingRight: "20px"}}>Pick anyone from {totalCount} characters!</h1>
<div style={{display: "flex", alignItems: "center", gap: "10px", color: "white"}}>
      Filter by eye color: <Select style={{width: "200px", backgroundColor: "white", color: "black"}}
        options={options}
        labelField="name"
        valueField="id"
        values={[{id: 1,  name: 'all'}]}
        onChange={(values) => {setFilterVal(values[0]["name"]); console.log(values)}}
      />
      </div>

      <ul className="cards">
      { characters.filter( (character) => character.eye_color === filterVal || filterVal === "all" ).map(character => {
        return  <li className="card" key={character.name} onClick={ () => {showModal(character)} }>
            <span style={{fontWeight: "bold"}}>{character.name}</span>
            <span>Height: {character.height}</span>
            <span>Mass: {character.mass}</span>
            <span>Born: {character.birth_year}</span>
            <span style={{ backgroundColor: gender_to_color[character.gender], width: "fit-content", padding: "3px", borderRadius: "3px" }}>{character.gender}</span>
          </li>
      }) }
      </ul>
      {next > 0 ? <div className="button yellow" onClick={loadNextPage}>Load more{loading ? <Loader/> : ""}</div> : "" }
      </div>
      </>
    );
};

export default Characters;
