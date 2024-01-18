import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { get, post, axiosDelete, put } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { returnRelativeTime } from "../services/time";
import { GameContext } from "../context/games.context";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Profile = () => {
  const [thisUser, setThisUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { games, getGames } = useContext(GameContext);

  const [newPost, setNewPost] = useState({
    photo: "",

    text: "",
    game: "",
    gameId: "",
  });

  const [postToUpdate, setPostToUpdate] = useState(null)

  const { user } = useContext(AuthContext);

  const { posts } = useContext(AuthContext);

  // useEffect(() => {
  //   get(`/games/${games._id}`)
  //   .then((response) => {
  //     console.log("games", response.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "white" : "blue",
      padding: 20,
      display: "flex",
      position: "center",
    }),
    control: (provided) => ({
      ...provided,
      width: "300px", // Corrected 'size' to 'width'
      fontSize: "15px", // Corrected 'fontsize' to 'fontSize'
      fontWeight: "bold",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  //edit

  //delete
  const deletePost = (id) => {
    console.log("deleting ===>", id);
    axiosDelete(`/post/${id}`)
      .then((response) => {
        console.log("Deleted post ===>", response.data);
        getUser();
        // fetchGame();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GAMES

  //   const [allGames, setAllGames] = useState([])
  //   const { games, getGames } = useContext(GameContext);

  //   useEffect(() => {
  //       setAllGames(games)
  //   }, [games])

  // **** */
  // const [newPost, setNewPost] = useState({
  //   photo: "",

  //   text: "",
  //   game: "",
  //   gameId: "",
  // });

  // userId: {
  //   type: Schema.Types.ObjectId, ref: "User",
  //   required: true,
  // },
  // username: {
  //   type: String,
  //   required: true,
  // },
  // photo: {
  //   type: String,
  //   // required: true,
  // },
  // location: {
  //   type: String,
  //   // required: true,
  //   default: "None",
  // },
  // text: {
  //   type: String,
  //   default: "No story",
  // },
  // game: String,
  // gameId: {type: Schema.Types.ObjectId, ref: "Game"},

  const navigate = useNavigate();

  const selectInputRef = useRef();

  const onClear = () => {
    selectInputRef.current.setValue("");
  };

  const sort = (array) => {
    return array.sort((a, b) => a.name.localeCompare(b.name));
  };

  const library = thisUser
    ? [...sort(thisUser.gamesLibrary), { _id: "", name: "Add new game" }].map(
        (game) => {
          return {
            key: game._id,
            label: game.name,
            value: game.name,
          };
        }
      )
    : [];

  const theseOptions = thisUser ? library : [];

  const handleSelectChange = (e) => {
    console.log("Select change");

    // if (e) {

    //   let thisGame = games.find((game) => game._id == e.key)

    //   let gamePhoto = thisGame.background_image

    //   console.log("Selected photo ===>", gamePhoto)
    // }

    if (!e) {
      setNewPost(() => ({
        photo: "",

        text: "",
        game: "",
        gameId: "",
      }));
    } else {
      if (e.value === "Add new game") {
        navigate("/games");
      } else {
        let thisGame = games.find((game) => game._id == e.key);

        let gamePhoto = thisGame.background_image;

        console.log("Selected photo ===>", gamePhoto);
        setNewPost({
          photo: gamePhoto,

          text: "",
          game: e.label,
          gameId: e.key,
        });
      }
    }
  };

  const handleTextChange = (e) => {
    setNewPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTextUpdateChange = (e) => {
    setPostToUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getUser = () => {
    if (user) {
      get(`/users/${user._id}`)
        .then((response) => {
          console.log("Found user ===>", response.data);
          setThisUser(response.data.user);
          let thesePosts = response.data.posts.sort((a, b) =>
            a.game.localeCompare(b.game)
          );
          let sortedPosts = [];
          thesePosts.forEach((element) => {
            if (!sortedPosts.includes(element.gameId)) {
              sortedPosts.push(element.gameId);
            }
          });
          let combinedPosts = sortedPosts.map((id) => {
            return {
              gameId: id,
              name: response.data.posts.find((post) => post.gameId == id).game,
              posts: response.data.posts
                .filter((post) => post.gameId == id)
                .map((post2) => {
                  return {
                    ...post2,
                    isEditing: false,
                  };
                })
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            };
          });
          console.log("These are sorted posts", combinedPosts);
          setUserPosts(combinedPosts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setIsEditing = (postsIndex, id) => {
    console.log("POst index", postsIndex, "POstId", id);
    let thesePosts = [...userPosts];
    console.log("These are the posts", thesePosts)
    let thisIndex;
    let thisPost = thesePosts[postsIndex].posts.find((post, index) => {
      thisIndex = index;
      return post._id == id;
    });
    console.log("This post ********", thisPost)
    thisPost = { ...thisPost, isEditing: true };
    console.log("POst to change", thisIndex, thisPost)
    thesePosts[postsIndex].posts[thisIndex] = thisPost;
    console.log("these posts", thesePosts)
    setUserPosts(thesePosts)

    setPostToUpdate(thisPost);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("NEW POST ===>", newPost);

    post("/post/new-post", newPost)
      .then((results) => {
        console.log("post create result", results.data);
        setNewPost({
          photo: "",

          text: "",
          game: "",
          gameId: "",
        });
        getUser();
        onClear();
        // if (posts.length) {
        //     setPosts([results.data, ...posts])
        // } else {
        //     getPosts()
        // }
        // if (userPosts) {
        //     setUserPosts([results.data, ...userPosts])
        // } else {
        //     setUserPosts([results.data])
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //     navigate('/posts')
    // })
  };

  const handleChangeSubmit = (e, postId) => {
    e.preventDefault()
    put(`/post/udpate/${postId}`, postToUpdate)
      .then((response) => {
        console.log("Updated Post", response.data)
        getUser()
      })
      .catch((err) => {
        console.log(err)
      })

  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <div className="Profile">
      {/* <div className="DivMiddle"></div> */}
      <div className="DivRIGHT">
        {thisUser && thisUser.gamesLibrary.length ? (
          <>
            <Select
              styles={customStyles}
              className="selectpost"
              id="selector"
              isClearable
              ref={selectInputRef}
              options={theseOptions}
              onChange={handleSelectChange}
            />

            {/* <select
  className="selectpost"
  id="selector"
  onChange={handleSelectChange}
  ref={selectInputRef}
>
  <option value="" disabled selected>Select an option</option>
  {theseOptions.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select> */}

            {newPost.game ? (
              <form className="boxpost" onSubmit={handleSubmit}>
                {/* <label>Image</label>
                                <input type="file" name='image' onChange={handleFileChange} /> */}
                <div className="status box">
                  <div className="usernamepost"></div>
                  <div className="status-menu">
                    {/* {thisGame && <h3>{thisGame._id.name}</h3>} */}
                  </div>
                  <div className="status-main">
                    <img src={thisUser.photo} className="status-img"></img>
                    <label className="label-post">Story</label>
                    <textarea
                      className="texterea-post"
                      name="text"
                      value={newPost.text}
                      onChange={handleTextChange}
                    />

                    <div>
                      <button className="submitBTN1" type="submit">
                        {/* <span className="span1"></span>
                        <span className="span2"></span>
                        <span className="span3"></span>
                        <span className="span4"></span> */}
                        Submit
                      </button>
                    </div>
                    {/* <label>Story</label> */}
                    {/* <textarea name='story' value={newPost.story} onChange={handleTextChange} /> */}
                  </div>
                  {/* <button povertarget="info"></button>
                  <div id="info" className="poperTEST" popover>ADD SOMETHING REALLY COOL!</div> */}
                </div>
              </form>
            ) : (
              <p className="warning"></p>
            )}
          </>
        ) : (
          <div>
            <p>No games added</p>
            <Link className="avisoPost" to="/games">
              Add a games to create a post.
            </Link>
          </div>
        )}

        {userPosts.length > 0 && (
          <div className="allThePostData">
            {userPosts.map((post) => {
              // const game = games.find((game) => game._id === post.gameId);
              return (
                <div>
                  <div className="postName">
                    {/* <img className="IMG-Review" src={game.background_image} alt="game image" /> */}
                    <h2>{post.name}</h2>
                  </div>
                  {post.posts?.length > 0 && (
                    <>
                      {post.posts.map((thisPost, index) => {
                        return (
                          <div className="fullPost">
                            <div className="datepost">
                              <h4>{returnRelativeTime(thisPost.createdAt)}</h4>
                            </div>
                            <div className="status-main color-story">
                              <div className="imgpost">
                                <img
                                  src={thisUser.photo}
                                  className="status-img"
                                ></img>
                              </div>
                              <div className="imgpost">
                                <img
                                  src={thisPost.photo}
                                  className="status-img"
                                ></img>
                              </div>
                              <div className="status-menu titulopost">
                                <h4>{thisPost.text}</h4>
                              </div>
                              <p>
                                
                                <button className="editGame" 
                                    onClick={() => setIsEditing(index, thisPost._id)}
                                  > </button>
                               
                                {thisPost.isEditing && <p className="pEdit-post">editing in process...</p>}
                                   <button className="deleteGame" 
                                    onClick={() => deletePost(thisPost._id)}>
                                    </button>
                              </p>
                                {thisPost.isEditing && 
                                              <form className="boxpost" onSubmit={(e) => handleChangeSubmit(e, thisPost._id)}>
                                              {/* <label>Image</label>
                                                              <input type="file" name='image' onChange={handleFileChange} /> */}
                                              <div className="status box">
                                                <div className="usernamepost"></div>
                                                <div className="status-menu">
                                                  {/* {thisGame && <h3>{thisGame._id.name}</h3>} */}
                                                </div>
                                                <div className="status-main">
                                                  <label className="label-post">Story</label>
                                                  <textarea
                                                    className="texterea-post"
                                                    name="text"
                                                    value={postToUpdate.text}
                                                    onChange={handleTextUpdateChange}
                                                  />
                              
                                                  <div className="btnpost">
                                                    <button className="submitBTN2" type="submit">
                                                      <span className="span1"></span>
                                                      <span className="span2"></span>
                                                      <span className="span3"></span>
                                                      <span className="span4"></span>
                                                      Submit
                                                    </button>
                                                  </div>
                                                  {/* <label>Story</label> */}
                                                  {/* <textarea name='story' value={newPost.story} onChange={handleTextChange} /> */}
                                                </div>
                                                {/* <button povertarget="info"></button>
                                                <div id="info" className="poperTEST" popover>ADD SOMETHING REALLY COOL!</div> */}
                                              </div>
                                            </form>}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* <div class="container">
        <div class="navbar">
           
        </div>
        <div class="content-container">
            <div class="user-info">
               
            </div>
            <div class="friend-list">
            
            </div>
            <div class="new-post-widget">
              
            </div>
            <div class="posts">
              
            </div>
        </div>
    </div> */}
      </div>
      <div className="DivLEFT">
        {thisUser && <h1>{thisUser.username}'s Profile</h1>}
        <div className="card-container">
          {thisUser && (
            <img
              className="round"
              // src="https://randomuser.me/api/portraits/women/79.jpg"  //{thisUser.photo} error
              src={thisUser.photo}
              alt="user"
            />
          )}
          {thisUser && <h3 className="h3profile">{thisUser.username}</h3>}
          {thisUser && <h6 className="h6profile">{thisUser.location}</h6>}
          {thisUser && <p className="p-profile">{thisUser.description}</p>}
          <div className="buttons">
            {/* <button className="primary">Game Library</button> */}
            {/* <button className="primary ghost">Following</button> */}
            <button className="primary ghost"><a href="/games">PRESS START</a></button>
          </div>
          {/* gamesLibrary.map((game) => {
                  return ( */}{" "}
          {/* //duda*/}
          <div className="platformsprofile">
      {thisUser && (
        <>
          <h6>I play on the following platforms:</h6>
          {thisUser.platforms.length > 0 && (
            <div className="platforms-used">
              <ul>
                {thisUser.platforms.map((platform, index) => (
                  <li key={index}>{platform}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  </div>
</div>
</div>
)}

export default Profile;

{
  /*               <div class="username">Patrick Watsons</div>
        <div class="timeline-right">
          <div class="status box">
            <div class="status-menu">
              
            </div>
            <div class="status-main">
              <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg" class="status-img">
              <textarea class="status-textarea" placeholder="Write something to Quan Ha.."></textarea>
            </div>
            <div class="status-actions">
             
              <button class="status-share">Share</button>
            </div>
          </div>
*/
}

{
  /* <div className="DivLEFT">
  <div className="shell">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="wsk-cp-product">
            <div className="wsk-cp-img">
              <img
                src="https://3.bp.blogspot.com/-eDeTttUjHxI/WVSvmI-552I/AAAAAAAAAKw/0T3LN6jABKMyEkTRUUQMFxpe6PLvtcMMwCPcBGAYYCw/s1600/001-culture-clash-matthew-gianoulis.jpg"
                alt="Product"
                className="img-responsive"
              />
            </div>
            <div className="wsk-cp-text">
              <div className="category">
                <span>Ethnic</span>
              </div>
              <div className="title-product">
                <h3>My face not my heart</h3>
              </div>
              <div className="description-prod">
                <p>
                  Description Product tell me how to change playlist height
                  size like 600px in html5 player. player good work now check
                  this link
                </p>
              </div>
              <div className="card-footer">
                <div className="wcf-left">
                  <span className="price">Rp500.000</span>
                </div>
                <div className="wcf-right">
                  <a href="#" className="buy-btn">
                    <i className="zmdi zmdi-shopping-basket"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 */
}
