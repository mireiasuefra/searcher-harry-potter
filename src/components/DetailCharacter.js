import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGhost,
  faUser,
  faDog,
  faMale,
  faDizzy,
  faHeartbeat,
  faMars,
  faVenus,
  faHatWizard,
} from "@fortawesome/free-solid-svg-icons";

function DetailCharacter(props) {
  //para traducir el genero
  const renderGender = () => {
    const gender = props.oneCharacter.gender;
    if (gender === "male") {
      return (
        <>
          Masculino <FontAwesomeIcon icon={faMars} />
        </>
      );
    } else if (gender === "female") {
      return (
        <>
          Femenino <FontAwesomeIcon icon={faVenus} />
        </>
      );
    } else {
      return gender;
    }
  };
  //para traducir si está vivo o muerto
  const renderAlive = () => {
    const alive = props.oneCharacter.alive;
    if (alive === true) {
      return (
        <>
          Vivo <FontAwesomeIcon icon={faHeartbeat} />
        </>
      );
    } else if (alive === false) {
      return (
        <>
          Muerto <FontAwesomeIcon icon={faDizzy} />
        </>
      );
    }
  };
  //para traducir la especie
  const renderSpecies = () => {
    const species = props.oneCharacter.species;

    if (species === "human") {
      return (
        <>
          Humano <FontAwesomeIcon icon={faUser} />
        </>
      );
    } else if (species === "half-giant") {
      return (
        <>
          Semi - Gigante <FontAwesomeIcon icon={faMale} />
        </>
      );
    } else if (species === "werewolf") {
      return (
        <>
          Hombre - Lobo <FontAwesomeIcon icon={faDog} />
        </>
      );
    } else if (species === "ghost") {
      return (
        <>
          Fantasma <FontAwesomeIcon icon={faGhost} />
        </>
      );
    } else {
      return species;
    }
  };

  return (
    <section className="detail-character">
      <Link className="detail-character__link" to="/">VOLVER</Link>
      <h2 className="detail-character__title">Detalle del personaje</h2>
      <div
        className={`detail-character__card detail-character__card--${props.oneCharacter.house.toLowerCase()}`}
      >
        <img
          className="detail-character__image"
          src={
            props.oneCharacter.image ||
            `https://via.placeholder.com/210x295/ffffff/666666/?text=${props.oneCharacter.name}`
          }
          alt="imagen de la card"
        ></img>
        <div className="detail-character__info">
          <p className="detail-character__info-item">
            {props.oneCharacter.name}
          </p>
          <p className="detail-character__info-item">
            Personaje: {renderAlive()}{" "}
          </p>
          <p className="detail-character__info-item">
            Especie: {renderSpecies()}
          </p>
          <p className="detail-character__info-item">
            Genero: {renderGender()}
          </p>
          <p className="detail-character__info-item">
            Casa: {props.oneCharacter.house}{" "}
            <FontAwesomeIcon icon={faHatWizard} />
          </p>
        </div>
      </div>
    </section>
  );
}

export default DetailCharacter;
