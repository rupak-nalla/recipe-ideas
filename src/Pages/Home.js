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
      <header className="App-header">
        <nav class="bg-[#112637] border-gray-200 flex items-center">
          <img src={logo} class="h-10" alt='Logo'/>
          <div class="max-w-screen-xl flex flex-wrap items-center  p-4">
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#f7f0d6]">Kitchen Genie</span>
            </div>
          </div>
        </nav>
      </header>
      <main className=' h-[500px] '>
        {/* hero section */}

        <div className='text-center bg-[url(Image.png)] w-[100%] h-[100%]'id='hero-section ' >
          <div className='bg-gradient-to-t from-black/80 via-transparent to-black/80 h-[100%] w-[100%] flex justify-center items-center'>
            <div>
              <h3 className='font-bold text-5xl text-white leading-snug'>Discover Your Next Meal</h3>
              <p className='text-white leading-snug'>Effortlessly discover new and delicious meals.</p>
                <div className='m-10 h-9 flex'>
                  <input type='text' id='search' className='w-[500px] h-[100%] px-5 rounded-s-xl focus:outline-none' placeholder='Search recipes by main ingredient or name...'></input>
                  <button className='bg-white text-black h-[100%] px-5 rounded-e-xl focus:outline-none' onClick={()=>{Search();}}>
                    <svg class="w-6 h-[100%] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>

                  </button>
                </div>
              </div>
          </div>
          
        </div>

        {/* featured section */}
        <div className='p-8 bg-[#112637]'>
          <div className='row flex justify-center m-3'>
            <h3 className='text-xl font-sans text-[#f7f0d6]'>Featured Receipes</h3>
          </div>
          <div className='flex justify-around'>
            {
              featuredMeals.length > 0 ? (
              featuredMeals.map((meal, index) => (
                <div onClick={()=>{goToReceipe(meal.idMeal)}} key={index} class="hover:scale-105 hover:duration-100 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] max-w-sm bg-[#214861] border border-[#142f40] rounded-lg shadow m-2">
                  
                  <div href="#">
                      <img class="rounded-t-lg" src={meal.strMealThumb} alt="" />
                  </div>
                  <div class="p-5">
                      <div href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f7f0d6] ">{meal.strMeal}</h5>
                      </div>
                      
                  </div>
                </div>
              ))
              ) : (
                <p>Loading meals...</p>
              )
            }
          
            
          </div>
          <div className='row'></div>
        </div>
      </main>
    </div>
  );
}

export default App;
