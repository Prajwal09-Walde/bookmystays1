import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./Home.css"


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
         <Featured/>
         <h1 className="HomeTitle">Browse by type of Property</h1>
         <PropertyList/>
         <h1 className="HomeTitle">No.1 Choice of Guests</h1>
         <FeaturedProperties/>
         <MailList/>
         <Footer/>
      </div>
    </div>
  )
}

export default Home