import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';

import './App.css';

const App = () =>{
  const APP_ID  = 'c71cab82';
  const APP_KEY = '50f22cfaab75923a23b76f6e18ced206';
  
  const [recipes, setRecipes]= useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('strawberry');
  //const[counter,setCounter] = useState(0);
  
  useEffect(() =>{
    getRecipe();
  },[query]);  //empty [] to run useeffect once 

  const getRecipe= async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    //console.log(data.hits);
    
  }
  
  const updateSearch = e =>{
    setSearch(e.target.value);
    //console.log(search);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
    <div className="heading"><h1 >Recipe Search Engine </h1></div>
      <form onSubmit={getSearch} className="search-form">
      
        <input className="search-bar" type ="text"  value={search} onChange={updateSearch}/> 
        <button className="serach-button" type = "submit"> 
        Search 
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title ={recipe.recipe.label} 
        calories= {recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
