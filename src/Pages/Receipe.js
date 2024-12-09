
import '../App.css';
import { useState, useEffect } from 'react';
import logo from '../logo.jpg'
import { useParams } from 'react-router-dom';
function App() {
    const { id } = useParams();

    // state to store meal details
    const [MealDetails,setMealDetails]=useState({})
    useEffect(() => {
        // fetches meal details
        async function fetchMealDetails() {
            console.log("useEffect");
            try {
                // Fetch data
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                
                // Check if response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                // Parse the response as JSON
                const data = await response.json();
                console.log("fetched");

                let process =data.meals[0].strInstructions
                .replace(/\r\n|\n|\r/g, ".")  // Replace any \n, \r, or \r\n with a period.
                .split(".")  // Split by period to break the text into sentences.
                .map((step) => step.trim())  // Trim extra spaces.
                .filter((step) => step.length > 0);
                data.meals[0].strInstructions=process;
                console.log("data:",data.meals[0].strInstructions)

                let ingredients=[];
                for(let i=1;i<18;i++){
                    if(data.meals[0][`strIngredient${i}`] !== '' || data.meals[0][`strIngredient${i}`]!=null || data.meals[0][`strIngredient${i}`]!="."){
                        ingredients.push(data.meals[0][`strIngredient${i}`])
                    }
                }
                data.meals[0].ingredients=ingredients;
                // Set the meal details
                setMealDetails(data.meals[0]); // Assuming meals[0] contains the required meal data
        
                console.log("set");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
    
        fetchMealDetails();
    }, [id]);
    return (
        
        <div className="App">
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

            <main className="min-h-screen">
                {/* Hero Section */}
                <div
                className="text-center w-full h-[400px] sm:h-[500px]"
                id="hero-section"
                style={{
                    backgroundImage: `url(${MealDetails.strMealThumb})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >
                <div className="bg-gradient-to-t from-black/80 via-transparent to-black/80 h-full w-full flex justify-center items-center">
                    <div>
                    <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-snug">
                        {MealDetails.strMeal}
                    </h3>
                    </div>
                </div>
                </div>

                {/* Recipe Section */}
                <div className="bg-[#112637] p-6 sm:p-8">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg sm:text-xl text-center font-sans mb-6 text-[#f7f0d6]">
                    Recipe
                    </h3>
                    {MealDetails ? (
                    <div className="text-[#f7f0d6] space-y-6">
                        {/* Recipe Name */}
                        <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="w-full sm:w-1/3 font-semibold mb-2 sm:mb-0">
                            Recipe Name
                        </div>
                        <div className="w-full sm:w-2/3">{MealDetails.strMeal}</div>
                        </div>

                        {/* Ingredients */}
                        <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="w-full sm:w-1/3 font-semibold mb-2 sm:mb-0">
                            Ingredients
                        </div>
                        <div className="w-full sm:w-2/3">
                            {MealDetails.ingredients ? (
                            MealDetails.ingredients.map((step, index) => (
                                <span key={index}>
                                {step}
                                {index < MealDetails.ingredients.length - 1 ? ", " : ""}
                                </span>
                            ))
                            ) : (
                            <div>Loading...</div>
                            )}
                        </div>
                        </div>

                        {/* Process */}
                        <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 font-semibold mb-2 sm:mb-0">
                            Process
                        </div>
                        <div className="w-full sm:w-2/3">
                            <ol className="list-decimal space-y-2 pl-5">
                            {MealDetails.strInstructions ? (
                                MealDetails.strInstructions.map((step, index) => (
                                <li key={index} className="text-lg">
                                    {step}.
                                </li>
                                ))
                            ) : (
                                <div>Loading...</div>
                            )}
                            </ol>
                        </div>
                        </div>
                    </div>
                    ) : (
                    <div className="text-center text-[#f7f0d6]">Loading...</div>
                    )}
                </div>
                </div>
            </main>
        </div>

    );
}

export default App;
