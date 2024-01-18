import { post } from "../services/authService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    platforms: [],
    location: "",
  });

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //added
  const handleSelectChange = (e) => {
    let selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    // ({ ...prev, [e.target.name]: e.target.value }));

    console.log("Options ===>", selectedOptions);

    setNewUser((newUser) => ({ ...newUser, platforms: selectedOptions }));
  };


  const handleCheck = (e) => {
    let selectedOption = e.target.value;

    console.log("Options ===>", selectedOption);
    setNewUser((newUser) => ({
      ...newUser,
      platforms: [...newUser.platforms, selectedOption],
    }));
  };

  return (
    <div className="signup">
    <div class="login-box">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div class="user-box1">
          <label>
            Username
            <input
              name="username"
              type="text"
              value={newUser.username}
              onChange={handleTextInput}
            />
          </label>
        </div>
        <div class="user-box2">
          <label>
            Email
            <input
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleTextInput}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleTextInput}
            />
          </label>
          <div className="reviewBOX">
          <h3>Platforms</h3>
            <div className="checkbox-Signup ">
              {/* <select
                name="platforms"
                onChange={handleSelectChange}
                multiple={true}
                >
                <option value="PC">PC</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Playstation 4">Playstation 4</option>
                <option value="Switch">Switch</option>
                <option value="Xbox serie X|S">Xbox serie X|S</option>
                <option value="Playstation 5">Playstation 5</option>
                <option value="3ds">3ds</option>
              </select> */}
              <label className="label-checkbox">
                PC
                <input
                className="checkbox-signup"
                  type="checkbox"
                  name="platforms"
                  value="PC"
                  onChange={handleCheck}
                />
              </label>
              <label>
                Xbox One
                <input
                  type="checkbox"
                  name="platforms"
                  value="Xbox One"
                  onChange={handleCheck}
                />
              </label>
              <label>
                Switch
                <input
                  type="checkbox"
                  name="platforms"
                  value="Switch"
                  onChange={handleCheck}
                />
              </label>
              <label>
                Xbox serie X|S
                <input
                  type="checkbox"
                  name="platforms"
                  value="Xbox serie X|S"
                  onChange={handleCheck}
                />
              </label>
              <label>
                Playstation 4
                <input
                  type="checkbox"
                  name="platforms"
                  value="Playstation 4"
                  onChange={handleCheck}
                />
              </label>
              <label>
                Playstation 5
                <input
                  type="checkbox"
                  name="platforms"
                  value="Playstation 5"
                  onChange={handleCheck}
                />
              </label>
              <label>
                3ds
                <input
                  type="checkbox"
                  name="platforms"
                  value="3ds"
                  onChange={handleCheck}
                />
              </label>
              </div>
              <div className="location-signup">
                <label>
                <h3>Location</h3>
                     <select
                onChange={(e) => setNewUser(prev =>( {...prev, location: e.target.value})) }>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Central America">Central America</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="North America">North America</option>
                <option value="Pacific">Pacific</option>
                <option value="South America">South America</option>
              </select></label>
             </div>
          </div>
        </div>
        <button type="submit">
          <span class="span1"></span>
          <span class="span2"></span>
          <span class="span3"></span>
          <span class="span4"></span>Signup
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
