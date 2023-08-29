/* eslint-disable no-unused-vars */
import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'

const FeaturedProperties = () => {

  const {loading, data, error} = useFetch("/hotels?featured=true");
  return (
    <div className='featuredProperties'>
      {loading ? (
        "loading..."
        ) : (
          <>
           {data.map((item) => (<div className='featuredPropertiesItems' key={item._id}>
              <img 
              src={item.photos[0]}
              alt=''
              className='featuredPropertiesImage'
              />
              <span className='featuredPropertiesName'>{item.name}</span>
              <span className='featuredPropertiesCity'>{item.city}</span>
              <span className='featuredPropertiesPrice'>Starting from Rs {item.cheapestPrice}</span>
              <div className='featuredPropertiesratings'>
                <button>{item.ratings}</button>
                <span>{item.reviews}</span>
              </div>
           </div>
           ))}
          </>
          )
        }
    </div>
  )
}

export default FeaturedProperties