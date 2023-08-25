import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { faHotel } from "@fortawesome/free-solid-svg-icons"
import { faPlane } from "@fortawesome/free-solid-svg-icons"
import { faTrain } from "@fortawesome/free-solid-svg-icons"
import { faCar } from "@fortawesome/free-solid-svg-icons"
import { faBinoculars } from "@fortawesome/free-solid-svg-icons"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { DateRange } from "react-date-range"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(
    {
      adult: 1,
      children: 0, 
      room: 1,
    }
  )

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
    });
  };

  const {dispatch} = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({type: "NewSearch", payload: {destination, date, options}});
    navigate("/hotels", {state: {destination, date, options}});
  }
  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="HeaderList">
          <div className="HeaderListItem active">
            <FontAwesomeIcon icon={faHotel} flip style={{color: "#ffffff"}}/>
            <span>Hotels</span>
          </div>
          <div className="HeaderListItem active">
            <FontAwesomeIcon icon={faPlane} flip style={{"--fa-primary-color": "#854b86", "--fa-secondary-color": "#854b86",}} />
            <span>Flights</span>
          </div>
          <div className="HeaderListItem active">
            <FontAwesomeIcon icon={faTrain} flip style={{color: "#ffffff",}}/>
            <span>Trains</span>
          </div>
          <div className="HeaderListItem active">
            <FontAwesomeIcon icon={faCar} flip style={{color: "#ffffff",}} />
            <span>Cars Rental</span>
          </div>
          <div className="HeaderListItem active">
            <FontAwesomeIcon icon={faBinoculars} flip style={{color: "#ffffff",}}/>
            <span>Attractions</span>
          </div>
        </div>
        {type !== "list" && (
          <>
           <h1 className="HeaderTitle">You won't get better discounts anywhere like we give.</h1>
           <p className="HeaderDesc">
              Get upto 15% off on every bookings and enjoy your trips. Hurry offer to end soon.
           </p>
           <button className="HeaderBtn">Register/Login</button>
           <div className="HeaderSearch">
           <div className="HeaderSearchItem">
              <FontAwesomeIcon icon={faBed} className="HeaderIcon"/>
              <input
               type="text"
               placeholder="Destination"
               className="HeaderSearchInput"
               onChange={(e) => setDestination(e.target.value)}/>
           </div>
           <div className="HeaderSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="HeaderIcon"/>
              <span onClick={() => setOpenDate(!openDate)} className="HeaderSearchText">
                {`${format(date[0].startDate, "dd/MM/yyyy")} 
                to ${format(date[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && 
                (<DateRange 
                   editableDateInputs={true}
                   onChange={(item) => setDate([item.selection])}
                   moveRangeOnFirstSelection={false}
                   ranges={date}
                   className="date"
                   minDate={new Date()}
                 />
              )}
           </div>
           <div className="HeaderSearchItem">
             <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
             <span onClick={() => setOpenOptions(!openOptions)}
               className="HeaderSearchText"
             >
               {`${options.adult} adult . ${options.children} children . ${options.room} room/s`}
             </span>
             {openOptions && (
              <div className="options">
                <div className="OptionsItem">
                  <span className="OptionsText">Adult</span>
                  <div className="OptionCounter">
                    <button 
                      className="OptionCounterButton"
                      disabled={options.adult <= 1}
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="OptionCounterNumber">
                      {options.adult}
                    </span>
                    <button
                      className="OptionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                     +
                    </button>
                  </div>
                </div>
                <div className="OptionsItem">
                  <span className="OptionsText">Children</span>
                  <div className="OptionCounter">
                    <button 
                      className="OptionCounterButton"
                      disabled={options.children <= 0}
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="OptionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="OptionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                     +
                    </button>
                  </div>
                </div>
                <div className="OptionsItem">
                  <span className="OptionsText">Room/s</span>
                  <div className="OptionCounter">
                    <button 
                      className="OptionCounterButton"
                      disabled={options.room <= 1}
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="OptionCounterNumber">
                      {options.room}
                    </span>
                    <button
                      className="OptionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                     +
                    </button>
                  </div>
                </div>
              </div>
             )}
           </div>
           <div className="headerSearchItem">
             <button className="HeaderBtn" onClick={handleSearch}>
               Search
             </button>
           </div>
        </div>
        </>
        )
      }
      </div>
    </div>
  );
};

export default Header;

