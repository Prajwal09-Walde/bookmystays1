import { Link } from 'react-router-dom';
import './SearchItems.css';

const SearchItems = ({item}) => {
  return (
    <div className='searchItem'>
      <img
       src={item.photos[0]}
       alt=''
       className='searchItemImage'/>
      <div className='searchItemDesc'>
        <h1 className='searchItemName'>{item.name}</h1>
        <span className='searchItemDistance'>{item.distance}</span>
        <span className='searchItemTitle'>{item.title}</span>
        <span className='searchItemSubtitle'>
          Studio Apartment with Air Conditioning
        </span>
        <span className='searchItemCancelOp'>Free Cancellation</span>
        <span className='searchItemCancelOpSubtitle'>
          You can cancel at any time
        </span>
      </div>
      <div className='searchDetails'>
        {item.ratings && <div className='searchRatings'>
          <span>{item.reviews}</span>
          <button>{item.ratings}</button>
        </div>}
        <div className='searchDetailTexts'>
          <span className='searchItemsPrice'>Rs {item.cheapestPrice}</span>
          <span className='searchItemsTaxi'>Included taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className='searchItemsCheck'>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItems;