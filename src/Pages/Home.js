// import logo from './logo.svg';
import '../App.css';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../logo.jpg'
function App() {
  const navigate = useNavigate();

  // function to navigate to recipe details
  const goToReceipe = (id) => {
    navigate(`Receipe/${id}`); // Pass the meal ID as a URL parameter
  };

  // function to navigate to search results
  const Search=()=>{
    const search=document.getElementById('search').value;
    if(search){
        navigate(`Search/${search}`);
    }else{
        alert('Enter Ingredients..');
    }
  }

  // state to store meals for featured section
  const [featuredMeals,setFeaturedMeals]=useState([]);

  useEffect(() => {

    // function to fetch mealsfor featured section
    async function fetchFeaturedMeals() {
      let tempArr = [];
      try {

        // Use Promise.all to fetch data concurrently
        const promises = Array.from({ length: 3 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((res) => res.json())
            .then((data) => {
              console.log("fetched");
              return data.meals[0]; // Return the meal data
            })
        );
  
        tempArr = await Promise.all(promises);
        setFeaturedMeals(tempArr); // Update state after all data is fetched
        console.log("set");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchFeaturedMeals();
  }, []);
  
  return (

    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <nav className="bg-[#112637] border-gray-200 flex items-center px-8 py-4">
          <img src={logo} className="h-10" alt="Logo" />
          <div className="flex items-center space-x-3 ml-4">
            <span className="text-2xl font-semibold text-[#f7f0d6]">
              Kitchen Genie
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main >
        {/* Hero Section */}
        <div
          className="text-center w-full h-[400px] sm:h-[500px] bg-[url(Image.png)] bg-cover bg-center lg:h-[80vh] flex items-center justify-center"
          id="hero-section"
          
        >
          
          <div className="bg-gradient-to-t from-black/50  to-black/50 h-full w-full flex justify-center items-center">
            <div className="px-6 lg:px-12 sm:px-10 text-center">
              <h3 className="font-bold text-4xl lg:text-6xl text-white leading-snug">
                Discover Your Next Meal
              </h3>
              <p className="text-white leading-snug text-sm lg:text-lg mt-4">
                Effortlessly discover new and delicious meals.
              </p>
              <div className="mt-8 h-12 flex justify-center">
                <input
                  type="text"
                  id="search"
                  className="w-72 lg:w-[500px] h-full px-5 rounded-l-md focus:outline-none text-base"
                  placeholder="Search recipes by main ingredient or name..."
                />
                <button
                  className="bg-white text-black h-full px-6 rounded-r-md flex items-center justify-center"
                  onClick={() => Search()}
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      d="M21 21l-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Recipes Section */}
        <div className="p-8 bg-[#112637] sm:p-5">
          <div className="container mx-auto">
            <div className="flex justify-center mb-8">
              <h3 className="text-2xl font-sans text-[#f7f0d6]">
                Featured Recipes
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMeals.length > 0 ? (
                featuredMeals.map((meal, index) => (
                  
                  <div
                    onClick={() => goToReceipe(meal.idMeal)}
                    key={index}
                    className="hover:scale-105 transition-transform duration-200 w-72 h-96 bg-[#214861] border border-[#142f40] rounded-lg shadow-lg mx-auto flex flex-col"
                  >
                    <div>
                      <img
                        className="rounded-t-lg w-full h-48 object-cover"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <h5 className="mb-2 text-lg lg:text-xl font-bold tracking-tight text-[#f7f0d6]">
                        {meal.strMeal}
                      </h5>
                      <button
                        onClick={() => goToReceipe(meal.idMeal)}
                        className="mt-auto px-4 py-2 bg-[#f7f0d6] text-[#214861] font-semibold rounded-md hover:bg-[#e2d4ba] transition"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>

                ))
              ) : (
                <p className="text-center text-[#f7f0d6]">Loading meals...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default App;
