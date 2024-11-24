
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
            <nav class="bg-[#112637] border-gray-200 flex items-center">
                <img src={logo} class="h-10" alt='Logo'/>
                <div class="max-w-screen-xl flex flex-wrap items-center  p-4">
                    <div class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#f7f0d6]">Kitchen Genie</span>
                    </div>
                </div>
            </nav>
            </header>
            <main className=' min-h-screen'>
                <div
                    className="text-center w-[100%] h-[500px] "
                    id="hero-section"
                    style={{
                        backgroundImage: `url(${MealDetails.strMealThumb})`,
                        backgroundRepeat: 'no-repeat', // Ensures the background does not repeat
                        backgroundSize: 'cover', // Ensures the image covers the entire area
                        backgroundPosition: 'center', // Centers the image
                    }}
                    >
                    <div className="bg-gradient-to-t from-black/80 via-transparent to-black/80 h-[100%] w-[100%] flex justify-center items-center">
                        <div>
                        <h3 className="font-bold text-5xl text-white leading-snug">{MealDetails.strMeal}</h3>
                        
                        </div>
                    </div>
                </div>

                <div className='bg-[#112637] p-8 h-auto'>
                    <div className='row m-10 '>
                        <h3 className='text-xl font-sans text-center h-5 text-[#f7f0d6]'>Receipe</h3>
                        {
                            MealDetails ? (
                                <div className='w-[100%] m-10 text-[#f7f0d6]'>
                                    <div className='flex h-auto m-3' id='Recipe-Name'>
                                        <div className='w-[30%] font-semibold'>Recipe Name</div>
                                        <div className='w-[70%]'>{MealDetails.strMeal}</div>
                                    </div>
                                    <div className='flex h-auto m-3 ' id='Ingridents'>
                                        <div className='w-[30%] font-semibold'>Ingridents</div>
                                            <div className='w-[70%]'>
                                                <div className=''>
                                                    {
                                                        MealDetails.ingredients ? (
                                                            MealDetails.ingredients.map((step, index) => (
                                                                <>
                                                                {step}{index < MealDetails.ingredients.length - 1 ? ", " : ""}
                                                                </>
                                                            ))
                                                        ):(
                                                            <div>Loading..</div>
                                                        )
                                                    }
                                                </div>
                                            
                                        </div>
                                    </div>
                                    <div className='flex h-auto m-3' id='Process'>
                                        <div className='w-[30%] font-semibold'>Process</div>
                                        <div className='w-[70%] h-auto'>
                                            <ol className='list-decimal'>
                                                {
                                                    MealDetails.strInstructions ? (
                                                        MealDetails.strInstructions.map((step, index) => (
                                                            <li key={index} className="mb-2 text-lg">
                                                            {step}.
                                                            </li>
                                                        ))
                                                    ):(
                                                        <div>Loading</div>
                                                    )
                                                    
                                                }
                                            </ol>
                                            
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
