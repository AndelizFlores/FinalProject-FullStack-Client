import { post } from "../services/authService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", user)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <div className="FULL-login-box">
    //     <div className="card">
    //         <div className="left-login">
    //             <h1>CONTROL</h1>
    //             <P>BLABLABLABLABLABLABLA
    //                 BLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLA
    //                 BLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLA</P>
    //                 <span>Don't you have an account?</span>
    //                 <button>Signup</button>
    //             </div>
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="user-box1">
          <label>
            Email
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleTextInput}
            />
          </label>
        </div>
        <div class="user-box2">
          <label>
            Password
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleTextInput}
            />
          </label>
        </div>
        <button type="submit">
          <span class="span1"></span>
          <span class="span2"></span>
          <span class="span3"></span>
          <span class="span4"></span>
          Login
        </button>
        <h6>You still don't have an account?</h6>
        
          <div>
            <button className="buttonSignup-register">
            {/*change*/}
            <a href="/signup"><h5>SignUp</h5>
            </a>
            </button>
          </div>
        
        {/*change*/}
      </form>
    </div>
    // </div>
    // </div>
  );
};

export default Login;

{
  /* <button to="/signup"> 
<span class="span1"></span>
<span class="span2"></span>
<span class="span3"></span>
<span class="span4"></span>
    SignUp</button> */
}
