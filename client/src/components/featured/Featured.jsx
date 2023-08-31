import useFetch from "../../hooks/useFetch"
import "./Featured.css"

const Featured = () => {

  const {data, loading, error} = useFetch(
    "https://bookmystays.onrender.com/api/hotels/countByCity?cities=Mumbai,Goa,Delhi,Hrishikesh,Lonavala,Bengaluru,Kolkata"
    );

  return (
    <div className="featured">
      {loading ? (
        "loading, please wait..."
        ) : (
          <>
           <div className="featuredItem">
              <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Mumbai</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img src="https://q-xx.bstatic.com/xdata/images/region/170x136/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Goa</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Delhi</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/684880.jpg?k=e39b50ba8be4c6c6c413c963af6e0d452dbe0decaf72e13f9f798e65de549107&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Hrishikesh</h1>
                <h2>{data[3]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/684682.jpg?k=30cf9de93f2a0f87eed7d2d0d9b3e6eccd5dcf3a4b68b4e0151c0800ddc84af7&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Lonavala</h1>
                <h2>{data[4]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Bengaluru</h1>
                <h2>{data[5]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140018328.jpg?k=07a99dda2ec36cb3ef59cf6c57aa595d82aa7d695676d1c05e1d70ba6ce58f83&o=" 
                alt ="" 
                className="featuredImage"/>
              <div className="featuredTitle">
                <h1>Kolkata</h1>
                <h2>{data[6]} properties</h2>
              </div>
            </div>
          </>
          )
        }
    </div>
    
  )
}

export default Featured