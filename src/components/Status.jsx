import axios from "axios";
import { useState } from "react";


const Status = ({ gameId, setStatus }) => {
  const [statusData, setStatusData] = useState({
    review: "",
    gameId: gameId._Id,   //see if is correct
    date: new Date(Date.now()).toLocaleString(),
    isEditing: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/status", { ...statusData, gameId });

      if (response.status === 200 || response.status === 201) {
        setStatus((prev) => [...prev, response.data]);
        // Clear the form after submission
        setStatusData({
          review: "",
          gameId: gameId._Id,   //see if is correct
          date: new Date(Date.now()).toLocaleString(),
          isEditing: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formBOX">
      <div className="form-container">
        <h2>Mood</h2>

        <form name="statusForm" onSubmit={handleSubmit}>
          <label>
            ASK|ENJOY|MAKE FRIENDS
            <textarea
              onChange={(e) =>
                setStatusData((prev) => ({ ...prev, review: e.target.value }))
              }
              value={statusData.review}
              className="Game-status"
              name="status"
              rows="4"
              cols="50"
            ></textarea>
          </label>

          <div className="statusBOX">
            <label>
              Game selected
              <select
                name="program"
                onChange={(e) =>
                  setStatusData((prev) => ({ ...prev, gameId: e.target.value }))
                }
                value={statusData.gameId}
              >
                <option value={thisGame.gameId}>{thisGame.gameId}</option>
              </select>
            </label>
          </div>

          <button type="submit" value="Submit">
            level UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Status;