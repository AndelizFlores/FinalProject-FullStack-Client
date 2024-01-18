import logo from '../assets/logo1.png';
import { Link } from "react-router-dom";



const HomePage = () => {
  return (

    <div class="containerHP">
        <div class="contentHP">
            <div class="squareHP twitchHP">
                <span class="oneHP" ></span>
                <span class="twoHP"></span>
                <span class="threeHP"></span>
                <div class="circleHP">
                    <h2 class="wordHP"> Control
               
                    </h2>
                    <p>vid·e·o game</p>
                </div>
            </div>

            <a href="/login" class="buttonHP" target="_parent">
                    <span class="actual-text">&nbsp;START&nbsp;</span>
                    <span class="hover-text" aria-hidden="true">&nbsp;START&nbsp;</span>
            </a>
        </div>
    </div>

  )
}

export default HomePage

// <div className="top-homepage">
// <div className="HomePage">
// <h1>Control  <img src={logo} alt="Logo" className="img-homepage" /></h1>
// <h2><span>vid·e·o game</span></h2>
// <h3>Control Social Page</h3>
// <p></p> 
// <br />
// {/* <Link to='/games'><button className="button-homepage" ></button></Link> DONT WORK */}
//   {/* {GameCard} */}
// </div>
// <div className="HomePage">
// </div>
// </div>


{/* <div className="container">
<div className="content">
    <div className="square twitch" style="margin-bottom: 50px;">
        <span className="one" ></span>
        <span className="two"></span>
        <span className="three"></span>
        <div className="circle">
        <h2> <img src={logo} alt="Logo" classNameName="img-homepage" /></h2>
       
            <p>vid·e·o game</p>
        </div>
    </div>

    <Link to="/login" classNameName="button" target="_parent">
            <span className="actual-text">&nbsp;Dashboard&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Dashboard&nbsp;</span>
    </Link>
</div>
</div> */}