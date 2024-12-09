
import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../logo.jpg'
function App() {
    const navigate = useNavigate();
    const { search } = useParams();

    const [MealsDetails, setMealsDetails] = useState([]);
    const [searchFound, setSearchFound] = useState(false);

    // navigation to search 
    const Search = () => {
        const searchInput = document.getElementById('search').value;
        if (searchInput) {
            navigate(`/Search/${searchInput}`);
        } else {
            alert('Enter Ingredients or Recipe Name.');
        }
    };

    // navigate to recipe details
    const goToReceipe = (id) => {
        navigate(`/Receipe/${id}`);
    };

    useEffect(() => {
        async function fetchMeals() {
            const uniqueMeals = new Map(); // Map to ensure no duplicates
            try {
                // Fetch by ingredients
                const ingredientResponse = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`
                );
                const ingredientData = await ingredientResponse.json();
    
                if (ingredientData.meals) {
                    ingredientData.meals.forEach((meal) => {
                        uniqueMeals.set(meal.idMeal, meal);
                    });
                }
    
                // Fetch by name
                const nameResponse = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
                );
                const nameData = await nameResponse.json();
    
                if (nameData.meals) {
                    nameData.meals.forEach((meal) => {
                        uniqueMeals.set(meal.idMeal, meal);
                    });
                }
    
                // Convert Map values back to an array and set state
                const finalMeals = Array.from(uniqueMeals.values());
                setMealsDetails(finalMeals);
                setSearchFound(finalMeals.length > 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchMeals();
    }, [search]);
    

    return (
        // <div className="App">
        //     <header className="App-header">
        //     <nav class="bg-[#112637] border-gray-200 flex items-center">
        //         <img src={logo} class="h-10" alt='Logo'/>
        //         <div class="max-w-screen-xl flex flex-wrap items-center  p-4">
        //             <div class="flex items-center space-x-3 rtl:space-x-reverse">
        //                 <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#f7f0d6]">Kitchen Genie</span>
        //             </div>
        //         </div>
        //     </nav>
        //     </header>
        //     <main className="bg-[#18344a] min-h-screen p-6">
        //         {/* input section */}
        //         <div className="w-[100%]">
        //             <div className="m-10 h-9 flex justify-center">
        //                 <input
        //                     type="text"
        //                     id="search"
        //                     className="w-[500px] h-[100%] px-5 rounded-s-xl focus:outline-none"
        //                     placeholder="Search recipes by main ingredient or name..."
        //                 />
        //                 <button
        //                     className="bg-white text-black h-[100%] px-5 rounded-e-xl focus:outline-none"
        //                     onClick={Search}
        //                 >
        //                     <svg
        //                         className="w-6 h-[100%] text-gray-800"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                     >
        //                         <path
        //                             stroke="currentColor"
        //                             strokeLinecap="round"
        //                             strokeWidth="2"
        //                             d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        //                         />
        //                     </svg>
        //                 </button>
        //             </div>
        //         </div>

        //         {/* search results */}
        //         <div className="flex justify-center">
        //             <div>
        //                 {searchFound ? (
        //                     MealsDetails.length > 0 ? (
        //                         MealsDetails.map((meal, index) => (
        //                             <div
        //                                 onClick={() => goToReceipe(meal.idMeal)}
        //                                 key={index}
        //                                 className="hover:scale-105 hover:duration-100 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] w-[550px]  rounded-lg shadow m-2 flex bg-[#214861] border border-[#142f40] text-[#f7f0d6] p-3"
        //                             >
        //                                 <div>
        //                                     <img
        //                                         className="rounded-t-lg w-[100px] h-[100px]"
        //                                         src={meal.strMealThumb}
        //                                         alt={meal.strMeal}
        //                                     />
        //                                 </div>
        //                                 <div className="p-5">
        //                                     <h5 className="mb-2 text-2xl font-bold tracking-tight ">
        //                                         {meal.strMeal}
        //                                     </h5>
        //                                 </div>
        //                             </div>
        //                         ))
        //                     ) : (
        //                         <p>Loading meals...</p>
        //                     )
        //                 ) : (
        //                     <p>No results found. Try searching with a different term.</p>
        //                 )}
        //             </div>
        //         </div>
        //     </main>
        // </div>
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
            <main className="bg-[#18344a] min-h-screen p-6">
                {/* Input Section */}
                <div className="w-full">
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

                {/* Search Results */}
                <div className="flex justify-center">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {searchFound ? (
                            MealsDetails.length > 0 ? (
                                MealsDetails.map((meal, index) => (
                                    <div
                                        onClick={() => goToReceipe(meal.idMeal)}
                                        key={index}
                                        className="hover:scale-105 hover:duration-100 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] max-w-full sm:w-[350px] md:w-[400px] rounded-lg shadow m-2 flex bg-[#214861] border border-[#142f40] text-[#f7f0d6] p-3"
                                    >
                                        <div>
                                            <img
                                                className="rounded-t-lg w-[100px] h-[100px] object-cover"
                                                src={meal.strMealThumb}
                                                alt={meal.strMeal}
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight">
                                                {meal.strMeal}
                                            </h5>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Loading meals...</p>
                            )
                        ) : (
                            <p>No results found. Try searching with a different term.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>

    );
}

export default App;
