import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo1Word.png";

const Navbar = () => {
  const { logOutUser, getToken } = useContext(AuthContext);

  
  // useEffect(() => {
  //   if (user) {
  //     get(`${user._id}`)
  //       .then((response) => {
  //         console.log("Found user ===>", response.data);
  //         setThisUser(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [user]);

  return (
    <header className="header">
       {/* <div className="content"> */}
       <div className="button-nav">
        <button className="button-img">
          <a href="./">
            <img src={logo} alt="Logo" className="img-logo" />
          </a>
        </button>
      </div>
      <div className="full-nav">
      <nav className="Navbar">
      {/* <h1 id="title" class="hf_text">Games.Social.Play</h1> */}
      <div className="items-box-nav">
      <div className="items-nav">
        <span className="text-xl">
      <Link className="link" to="/">Home</Link>
      {!getToken() && (
        <>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/signup">Signup</Link>
        </>
      )}
      {getToken() && (
        <>
        <Link className="link" to="/newfeed">Newsfeed</Link>
          <Link className="link" to='/games'>Games</Link>
          <Link className="link" to="/profile">Profile</Link>
          <button className="link" onClick={logOutUser}>Logout</button>
          {/* <div><img src={thisUser.photo}></img></div> */}

        </>
      )}
          {/* <i class="material-icons menu" onclick="menu()">menu</i>  
          <div class="dropdown" id="dropdown">
          <Link className="link" to="/">Home</Link>
      <Link className="link" to='/games'>Games</Link>
      {!getToken() && (
        <>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/signup">Signup</Link>
        </>
      )}
      {getToken() && (
        <>
          <Link className="link" to="/profile">Profile</Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}  
            </div> */}
      </span>
      </div>
      </div>
    </nav>
    </div>
    {/* </div> */}
  </header>
  );
};

export default Navbar;
