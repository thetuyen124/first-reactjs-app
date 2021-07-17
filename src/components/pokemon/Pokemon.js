import axios from "axios";
import { useEffect, useState } from "react";

import "./pokemon.css";

const Pokemon = () => {
  const [currentPokemonId, setCurrentPokemonId] = useState(1);
  const [imgId, setImgId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [pokemon, setPokemon] = useState({
    name: null,
    height: null,
    weight: null,
    img: [],
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`)
      .then(function (response) {
        setIsLoading(false);
        console.log(response);
        setPokemon({
          name: response.data.name,
          height: response.data.height,
          weight: response.data.weight,
          img: [
            response.data.sprites.front_default,
            response.data.sprites.back_default,
            response.data.sprites.front_shiny,
            response.data.sprites.back_shiny,
          ],
        });
        setImgId(0);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [currentPokemonId]);

  const handleNextImg = () => {
    imgId === 3 ? setImgId(0) : setImgId(imgId + 1);
  };
  const handlePreviousImg = () => {
    imgId === 0 ? setImgId(3) : setImgId(imgId - 1);
  };

  if (isLoading) {
    return (
      <div className="mainContent">
        <div>Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="mainContent">
        <div className="pokemon">
          <h2>Pokemon: {pokemon.name}</h2>
          <h2>Height: {pokemon.height}</h2>
          <h2>weight: {pokemon.weight}</h2>
          <button onClick={handlePreviousImg} className="img-btn left">
            «
          </button>
          <img src={pokemon.img[imgId]} alt="pokemon-img"></img>
          <button onClick={handleNextImg} className="img-btn">
            »
          </button>
          <div>
            <button
              className="pokemon-btn"
              onClick={() => {
                setCurrentPokemonId(currentPokemonId - 1);
              }}
            >
              Previous
            </button>
            <button
              className="pokemon-btn"
              onClick={() => {
                setCurrentPokemonId(currentPokemonId + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Pokemon;
