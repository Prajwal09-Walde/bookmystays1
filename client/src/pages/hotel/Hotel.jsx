import './Hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'




const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {data, loading, error} = useFetch(`/hotels/find/${id}`);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const {date, options} = useContext(SearchContext);
  console.log(date);
  
  const ms_per_day = 1000 * 60 * 60 * 24;
  function dayDiff (date1, date2) {
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff/ms_per_day);
    return diffDays;
  }
  const days = dayDiff(date[0].endDate, date[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1; 
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    }else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? (
        "loading..."
        ) : (
          <div className='hotelContainer'>
            {open && (
              <div className='slider'>
                <FontAwesomeIcon 
                  icon={faCircleXmark}
                  className='close'
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className='arrow'
                  onClick={() => handleMove("l")}
                />
                <div className='sliderWrapper'>
                  <img src={data?.sliders[slideNumber]} alt='' className='sliderImage'/>
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className='arrow'
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className='hotelWrapper'>
              <button className='bookNow'>Reserve or Book Now!</button>
              <h1 className='hotelTitle'>{data?.name}</h1> 
              <div className='hotelAddress'>
                <FontAwesomeIcon icon={faLocationDot}/>
                <span>{data.address}</span>
              </div>
              <span className='hotelDist'>
                {data.distance}
              </span>
              <span className='hotelPriceHighlight'>
                Book a stay over ₹ {data.cheapestPrice}
              </span>
              <div className='hotelImages'>
                {data.sliders?.map((photo, i) => (
                <div className='hotelImageWrapper' key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=''
                    className='hotelImage'
                  />
                </div>
                ))}
              </div>
              <div className='hotelDetails'>
                <div className='hotelDetailsText'>
                  <h1 className='hotelTitle'>{data.title}</h1>
                  <p className='hotelDesc'>
                    {data.desc}
                  </p>
                </div>
                <div className='hotelDetailsPrice'>
                  <h1>Perfect for a {days}-night stay</h1>
                  <span>
                    Located in the suburbs of Mumbai, this property has good location score of {data.ratings}!
                  </span>
                  <h2>
                    <b>Rs {days * data.cheapestPrice * options.room}</b> ({days}{" "} nights)
                  </h2>
                    <button>Reserve or Book now!</button>
                </div>
              </div>
            </div>
            <MailList/>
            <Footer/>
          </div>
          )}
    </div>
  )
}

export default Hotel