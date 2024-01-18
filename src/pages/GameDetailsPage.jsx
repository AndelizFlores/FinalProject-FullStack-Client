import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { GameContext } from "../context/games.context";
import coverTAGS from "../assets/coverTAGS.png";
// import FormGameReview from "../components/FormGameReview";
// import axios from "axios";
// import { BACKEND_URL } from "../services/external_urls";
// import { CiEdit } from "react-icons/ci";
// import { MdDeleteForever } from "react-icons/md";

function GameDetailsPage() {
  const [game, setGame] = useState(null);
  // useEffect(() => {
  //   fetchGame();
  // }, [gameId]);

  const { gameId } = useParams();
  const { games, getGames } = useContext(GameContext);

  useEffect(() => {
    if (!games.length) {
      getGames();
    } else {
      console.log("Games Id ===>", gameId);
      console.log("Games ===>", games);
      let thisGame = games.find((game) => game._id == gameId);
      setGame(thisGame);

      console.log("This product ===>", thisGame);
    }
  }, [games, gameId]);

  return (
    <div className="GameDetailsPage">
      {game && (
        <div className="DivDetails1">
        <div className="details">
          <h3>{game.name}</h3>
          <div className="platform-container">
            {" "}
            {/*need style */}
            {game.platforms.length > 0 && (
              <div className="platform2">
                {game.platforms.map((platform) => {
                  return (
                    <div className="plat-DIV"> {platform.platform.name} </div>
                  );
                })}
              </div>
            )}
          </div>
          <img
            className="bg-detailsGame"
            src={game.background_image}
            alt="game-image"
          />
          <div className="release-esrb-meta-DIV">
            <div>
              <h2>Release date: </h2>
              <p>{game.released}</p>
            </div>
            <div className="details-container">
              <div>
                <h2>ESRB Rating: </h2>
                <p>{game.esrb_rating && game.esrb_rating.name}</p>
              </div>
              <div>
                <h2>Metacritics: </h2>
              </div>
              <p>{game.metacritic}</p>
            </div>
            <div className="screenshot-container">
              {game.short_screenshots.length > 0 && (
                <div className="screenshots">
                  {game.short_screenshots.map((shot) => {
                    return (
                      <img
                        className="screenshot-IMG"
                        src={shot.image}
                        alt="screenshot"
                      />
                    );
                  })}
                </div>
              )}
              </div>
            </div> 
            <div className="DivDetails2">
             <div className="genre-container">
              {game.stores.length > 0 && (
                <div className="genre">
                  {game.stores.map((store) => {
                    return <p> {store.store.name} </p>;
                  })}
                </div>
              )}
            </div> 

            <div className="platform-container">
              {" "}
              {/*requirements*/}
              {game.platforms.length > 0 && (
                <div className="platform">
                  {game.platforms.map((platform) =>
                    platform.platform.name === "PC" &&
                    platform["requirements_en"] ? (
                      <>
                        <h3>Requirements</h3>
                        {/* <p> {platform.platform.name} </p>{" "} */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: platform["requirements_en"].minimum,
                          }}
                        ></div>
                      </>
                    ) : (
                      <p></p>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="requirement-container">
            {game.platforms.length > 0 && (
              <div className="platform">
                {game.platforms.map((platform) => {
                  return (
                  <p> {platform.platform.name} </p>)
                })}
              </div>
            )}
          </div>
            <h3>Stores</h3>
            <div className="stores-container">
              {game.stores.length > 0 && (
                <div className="stores">
                  {game.stores.map((store) => {
                    return <div className="store-DIV">{store.store.name}</div>;
                  })}
                </div>
              )}
            </div>
            <h3>Tags</h3>
            <div className="tags-container">
              {game.tags.length > 0 && (
                <div className="tags">
                  {game.tags.map((tag) => {
                    return (
                      <div className="AllTags">
                        <div className="tags1">
                          <div className="tagFace front">
                            <img
                              className="IMG-tag"
                              src={coverTAGS}
                              alt="game-image"
                            />
                            <p> {tag.name} </p>;
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetailsPage;
