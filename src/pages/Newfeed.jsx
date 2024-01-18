// import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { GameContext } from "../context/games.context";
import Status from "../components/Status";
import { returnRelativeTime } from "../services/time";

// import { returnRelativeTime } from "../services/time";

const Newfeed = () => {
  const [posts, setPosts] = useState([]);
  const [gamesLibrary, setGamesLibrary] = useState([]);
  const [thisUser, setThisUser] = useState(null);

  const { user } = useContext(AuthContext);

  const { games } = useContext(GameContext);

  const navigate = useNavigate();
  //User
  // const [thisUser, setThisUser] = useState(null);
  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   get(`/users/${user._id}`)
  //     .then((response) => {
  //       console.log("User", response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const addGames = () => {
    navigate("/games");
  };

  const getPosts = () => {
    get("/post")
      .then((response) => {
        console.log("Posts", response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLibrary = () => {
    let theseGames = [];

    console.log("Games library", games[0], user.gamesLibrary);

    user.gamesLibrary.slice(0, 6).forEach((game) => {
      let foundGame = games.find((el) => el._id == game);
      console.log("Found game", foundGame);
      theseGames.push(foundGame);
    });

    console.log("These Games ===>", theseGames);

    setGamesLibrary(theseGames);
  };

  // //Post
  useEffect(() => {
    getPosts();
    if (games.length > 0 && user) {
      getLibrary();
      setThisUser(user);
    }
  }, [games, user]);

  // //Games

  // useEffect(() => {
  //   get("/games")
  //     .then((response) => {
  //       console.log("games", response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="Newfeed">
      {" "}
      {/*1*/}
      <div className="user-Newfeed">
        {/* <h1>1</h1> */}
        <button className="addGamesNF" onClick={addGames}></button>
        
        {games.length > 0 && user && (
          <>
            {gamesLibrary.length > 0 && (
              <>
                {gamesLibrary.map((game) => {
                  return (
                    <div className="Gamelibrary">
                      <div className="CardList-Gamelibrary">
                        <div className="cara delante">
                          <img
                            className="IMG-gameLibrary"
                            src={game.background_image}
                            alt="game-image"
                          />
                          <h3>{game.name}</h3>
                        </div>
                        <div className="cara atrás">
                          <div className="CardLinkDetails1">
                            <Link to={`/games/details/${game._id}`}>
                              Details
                            </Link>
                            {/* <a href="/games/details/:gameId">Details</a> map in the product.id */}
                          </div>
                        </div>
                      </div>
                      <div>
                        {/*DONT WORK ---> {`addGame ${isActive? 'active': ''}`} */}
                        {/* <button className={inLibrary(game._id)} onClick={()=>addToLibrary(game._id)}></button>
                    <button className="deleteGame"onClick={()=>deleteFromLibrary(game._id)}></button> */}
                        {/* <button onClick={()=>deleteFromLibrary(game._id)}>delete to Library</button>  */}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
      <div className="post-random">
        {" "}
        {/*2*/}
        {/* <h1>2</h1> */}
        <div className="post-Newfeed">
          {" "}
          {/*2.1*/}
          {posts.length && (
            <>
              {posts.map((thisPost) => {
                return (
                  <div className="divFather">
                  <div class="csr">
                    <div class="svg-background"></div>
                    <div class="svg-background2"></div>
                    <div class="circle">
                    <img class="circle prodfile-img" src={thisPost.userId.photo}></img>
                    </div>
                    <div class="text-container">
                      <img className="photoNF" src={thisPost.photo}></img>
                      <div>
                      <p class="title-text">{thisPost.game}</p>
                      </div>
                      <div>
                       <p class="desc-text">
                      {thisPost.text}{" "}
                      </p>
                      </div>
                    </div>
                    <p class="cornerNF-post">{thisPost.username}</p>
                  </div>
                  </div>




                  // <div className="NF1">
                  //   <div className="NF2">
                  //     <h4>{returnRelativeTime(thisPost.createdAt)}</h4>
                  //   </div>
                  //   <div className="NF3">
                  //     <h4 className="NF4">{thisPost.username}</h4>
                  //   </div>
                  //   <div className="NF5">
                  //     <div className="NF-IMG">
                  //       <img
                  //         src={thisPost.userId.photo}
                  //         className="NFIMG2"
                  //       ></img>
                  //     </div>
                  //     <div className="NFIMG3">
                  //       <img src={thisPost.photo} className="NFIMG4"></img>
                  //     </div>
                  //     <div className="NF6 NF7">
                  //       <h4>{thisPost.text}</h4>
                  //     </div>
                  //   </div>
                  // </div>*/}
                );
              })}
            </>
          )}
          {/* 
<div class="container">
  <div class="svg-background"></div>
  <div class="svg-background2"></div>
  <div class="circle"></div>
  <img class="profile-img" src="">
  <div class="text-container">
    <p class="title-text">Austin May</p>
    <p class="info-text">Software Developer</p>
    <p class="desc-text">Hello, I am Austin May and I enjoy front-end web development. I fell in love with software development at Marshall University, where I graduated with a Bachelor's in Computer Science. </p>
  </div>
</div>
 */}
          {/* <div className="FormDIV">
  <Status gameId={game._id} setStatus={setStatus} />
  {status && status.length > 0 ? (
    status.map((status) => (
      <div className="status-space" key={status._id}>
        <p>{status.status}</p>
        <p>rating: {status.rating}</p>
        <p>{status.date}</p>
        <p>
          <span>
            <CiEdit onClick={() => setIsEditing(status._id)} />
          </span>{" "}
          <span>
            <MdDeleteForever onClick={() => deleteStatus(status._id)} />
          </span>
        </p>
        <br />
        {status.isEditing && (
          <form onSubmit={(e) => handleStatusUpdate(e, status._id)}>
            <label>
              Edit status{" "}
              <input
                className="inputEDIT"
                name="status"
                onChange={handleStatusChange}
                value={statusToUpdate.status}
                type="text"
                style={{ width: "400px" }}
              />
            </label>
            <label>
              <p>Rating</p>
              <select
                name="program"
                onChange={(e) =>
                  setStatusToUpdate((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }))
                }
              >
                <option value="rating"></option>
                <option value="⭐">⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    ))
  ) : (
    <p>No status yet</p>
  )}
</div> */}
        </div>
      </div>
      <div className="right-Newfeed">
        {/*4*/}

        {thisUser && (
          <div className="user-random">
            {" "}
            {/*inside3.1*/}
            <figure className="userSpace-Newfeed">
              <img
                // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg"
                src={thisUser.photo}
                alt="sample17"
                className="img-Newfeed"
              />
              <figcaption>
                
                <h2 className="h2-Newfeed">{thisUser.username}</h2> {/*Name*/}
               
                <div className="p-Newfeed">
                  <p>{thisUser.description}</p> {/*Decription*/}
                </div>
                <div className="icons">
                <button className=" primary ghost"><a href="/profile">Profile</a></button>
                  {/* <button>
                    <a href="/profile">
                      <i className="ion-social-twitter-outline"></i>
                    </a>
                  </button> */}
                </div>
              </figcaption>
            </figure>
          </div>
        )}
        <div className="games-random">
          {" "}
          {/*inside3.2*/}
          {/* <h1>inside3.2</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Newfeed;


// <div className="fullPost">
//                 <div className="datepost">
//                   <h4>{returnRelativeTime(thisPost.createdAt)}</h4>
//                 </div>
//                 <div className="status-main color-story">
//                   <div className="imgpost">
//                     <img
//                       src={thisPost.userId.photo}
//                       className="status-img"
//                     ></img>
//                   </div>
//                   <div className="imgpost">
//                     <img
//                       src={thisPost.photo}
//                       className="status-img"
//                     ></img>
//                   </div>
//                   <div className="status-menu titulopost">
//                     <h4>{thisPost.text}</h4>
//                   </div>
//                 </div>
//               </div>