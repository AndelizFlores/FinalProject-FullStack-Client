import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../context/games.context";
import { AuthContext } from "../context/auth.context";
// import GameCardList from "../components/GameCardList";
import { post, put, axiosDelete } from "../services/authService";
// import search from "../assets/searchIMG.png";
import axios from "axios";
import search from "../assets/searchguy.png"

const AllGames = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [allGames, setAllGames] = useState([])

  
  const { games, getGames } = useContext(GameContext);

  const { user, storeToken, authenticateUser } = useContext(AuthContext)
 
  const navigate = useNavigate()

  
  let filtered = searchTerm
    ? allGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allGames;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm && filtered.length < 1) {
      console.log("No matching games!!!!")
      axios.get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&search=${searchTerm}&search_exact=true`)
        .then(async (response) => {
          console.log("Search results ===>", response.data.results)
          let gameIds = games.map((game) => game._id)
          let newGames = response.data.results

          let filteredGames = newGames.filter((game) => gameIds.indexOf(game._id) < 0)
              
          console.log("New games ===>", filteredGames.length, newGames.length, filteredGames.map((game) => game._id), gameIds)

          let gamePromises = filteredGames.map((game) => post('/games', game))

          let gameResults = await Promise.allSettled(gamePromises).then(() => getGames())
          // console.log("Game Results", gameResults.length ? gameResults.length : 'no results')
          // getGames()
        })
        .catch((err) => {
          console.log(err)
        })
      
    }
    console.log("Searching...");
  };
  // const [selectedButton, setSelectedButton] = useState(1); 

  // const handleButtonClick = (index) => {
  //   if (selectedButton !== index) {
  //     setSelectedButton(index);
  //   }
  // };
  const addToLibrary = (id) => {
    put(`/users/add-game/${id}`)
        .then((response) => {
            console.log(response.data)
            storeToken(response.data.authToken)
            navigate('/profile')
            authenticateUser()
        })
        .catch((err) => {
            console.log(err)
        })
  }

  //Delete
  
  const deleteFromLibrary = (id) => {
    axiosDelete(`/users/delete-game/${id}`)
        .then((response) => {
            console.log("Deletion response ===>", response.data)
            storeToken(response.data.authToken)
            navigate('/profile')
            authenticateUser()
        })
        .catch((err) => {
            console.log(err)
        })
  }

  const inLibrary = (id) => {
    console.log("This is the user ===>", user)
    if (user) {
      return user.gamesLibrary.includes(id) ? "activeAddGame": "addGame" 
    } else {
      return "addGame" 
    }
  }
  // let filtered = searchTerm
  // ? allGames.filter((game) =>
  //     game.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // : allGames;

  useEffect(() => {
    console.log(filtered)
    setAllGames(games)
  }, [games, user])

  // const addBtn = document.getElementById("addGame") 
  // if (addToLibrary) {
  //   addBtn.style.backgroundImage = 'url(./assets/happyBTN.png)';
  //   play = false
  // } else {
  //   audioElement.volume = 0.1
  //   musicBtn.style.backgroundImage = 'url(./Images/soundON.png)';
  //   audioElement.play()
  //   play = true
  // }

  return (
    
<div className="AllGames">
<div className="search-div">
  <form className="searchContainer" onSubmit={handleSubmit}>
    <input
      value={searchTerm}
      placeholder="Find Game"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button type="submit">
      <img 
      src={search}
      ></img>
    </button>
  </form>
</div>
{/* <scroll-container className='scroll-listGames'>
<scroll-page> */}
{user && filtered && filtered.length > 0 && (
  <div className="listGames">
    {filtered.map((game) => {
      return (
        <div className="AllOverCardList">
          <div className="CardList">
            <div className="face front">
              <img
                className="IMG-gameList"
                src={game.background_image}
                alt="game-image"
              />
              <h3>{game.name}</h3>
            </div>
            <div className="face back">
              <h3>{game.name}</h3>
              <p>release date: {game.released}</p>
              <p>metacritic: {game.metacritic}</p>
              <div className="CardLinkDetails">
                <Link to={`/games/details/${game._id}`}>Details</Link>
                {/* <a href="/games/details/:gameId">Details</a> map in the product.id */}
              </div>
            </div>
          </div>
          <div>

          {/*DONT WORK ---> {`addGame ${isActive? 'active': ''}`} */}
          <button className={inLibrary(game._id)} onClick={()=>addToLibrary(game._id)}></button>
          <button className="deleteGame"onClick={()=>deleteFromLibrary(game._id)}></button>
          {/* <button onClick={()=>deleteFromLibrary(game._id)}>delete to Library</button>  */}
          </div>
        </div>
      
        //  <h2>{game.name}</h2>
        //Why cant use GameCardList?
      );
    })}
  </div>
)}
{/* </scroll-page>
</scroll-container> */}
</div>
);
};

export default AllGames;

// <div className="AllGames">
// <div className="search-div">
//   <form className="searchContainer" onSubmit={handleSubmit}>
//     <input
//       value={searchTerm}
//       placeholder="Find Game"
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//     <button type="submit">Search
//       {/* <img 
//       src={search}
//       ></img> */}
//     </button>
//   </form>
// </div>
// {/* <scroll-container className='scroll-listGames'>
// <scroll-page> */}
// {filtered && filtered.length > 0 && (
//   <div className="listGames">
//     {filtered.map((game) => {
//       return (
//         <div className="AllOverCardList">
//           <div className="CardList">
//             <div className="face front">
//               <img
//                 className="IMG-gameList"
//                 src={game.background_image}
//                 alt="game-image"
//               />
//               <h3>{game.name}</h3>
//             </div>
//             <div className="face back">
//               <h3>{game.name}</h3>
//               <p>release date: {game.released}</p>
//               <p>metacritic: {game.metacritic}</p>
//               <div className="CardLinkDetails">
//                 <Link to={`/games/details/${game._id}`}>Details</Link>
//                 {/* <a href="/games/details/:gameId">Details</a> map in the product.id */}
//               </div>
//             </div>
//           </div>
//           <button onClick={()=>addToLibrary(game._id)}>Add to Library</button>
//           {/* <button onClick={()=>deleteFromLibrary(game._id)}>delete to Library</button>  */}
//         </div>
      
//         //  <h2>{game.name}</h2>
//         //Why cant use GameCardList?
//       );
//     })}
//   </div>
// )}
// {/* </scroll-page>
// </scroll-container> */}
// </div>
// );
// };