import "../styles/App.scss";
import { useEffect, useState } from "react";
import callToApi from "../services/api";
import ls from "../services/localStorage";
import Header from "./Header";
import FilterNameCharacter from "./FilterNameCharacter";
import FilterHouseCharacter from "./FilterHouseCharacter";
import ButtonReset from "./ButtonReset";
import DetailCharacter from "./DetailCharacter";
import { Route, Switch, Link } from "react-router-dom";
import ListCharacter from "./ListCharacter";

function App() {
  // Variables ESTADO:
  const [characters, setCharacters] = useState(ls.get("characters", []));
  const [filterCharacters, setFilterCharacters] = useState(
    ls.get("filterCharacters", "")
  );
  const [filterHouseCharacters, setfilterHouseCharacters] = useState(
    ls.get("filterHouseCharacters", "gryffindor")
  );

  // Llamada a la API:
  useEffect(() => {
    callToApi(filterHouseCharacters).then((response) => {
      setCharacters(response);
    });
    //cada vez que cambia la variable filterHouseCharacters se ejecuta lo que hay dentro del useEffect: la llamada a la api, utilizando el  filterHouseCharacters como parámetro
  }, [filterHouseCharacters]);

  // Guardar en el local storage
  useEffect(() => {
    ls.set("characters", characters);
    ls.set("filterCharacters", filterCharacters);
    ls.set("filterHouseCharacters", filterHouseCharacters);
  }, [characters, filterCharacters, filterHouseCharacters]);

  //Para buscar personaje:
  const handleSearchFilterCharacter = (ev) => {
    setFilterCharacters(ev.currentTarget.value);
  };

  //Para buscar por specie de personaje
  const handleSearchFilterHouseCharacter = (ev) => {
    setfilterHouseCharacters(ev.currentTarget.value);
  };

  // para pintar la card en detalle de cada personaje.
  const renderDetailCharacter = (props) => {
    const index = props.match.params.index;

    // aquí vuelvo a filtrar porque al filtrar por nombre, hay una lista mas pequeña que otra y no coinciden los tamaños.
    const charactersFiltered = characters.filter((oneCharacter) => {
      return oneCharacter.name
        .toLocaleLowerCase()
        .includes(filterCharacters.toLocaleLowerCase());
    });

    return <DetailCharacter oneCharacter={charactersFiltered[index]} />;
  };

  // -----------------//-------------//-------------//

  return (
    <div className="bg-page">
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <form onSubmit={(ev) => ev.preventDefault()}>
              <FilterNameCharacter
                filterCharacters={filterCharacters}
                handleSearchFilterCharacter={handleSearchFilterCharacter}
              />
              <FilterHouseCharacter
                filterHouseCharacters={filterHouseCharacters}
                handleSearchFilterHouseCharacter={
                  handleSearchFilterHouseCharacter
                }
              />
              <ButtonReset
                setFilterCharacters={setFilterCharacters}
                setfilterHouseCharacters={setfilterHouseCharacters}
              />
            </form>

            <ListCharacter
              characters={characters}
              filterCharacters={filterCharacters}
              //aqui no se mete el de hose porque viene de la API ya filtrado
            />
          </Route>

          <Route path="/character/:index" render={renderDetailCharacter} />

          <Route>
            <div className="error">
              <Link className="error__link" to="/">
                VOLVER
              </Link>
              <h2 className="error__404">Error 404</h2>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
