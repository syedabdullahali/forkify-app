import{async} from 'regenerator-runtime'
import { API_URL, RES_PER_PAGE ,KEY} from './config.js'
import { getJSON,sendJSON } from './helper.js'
export const state ={
    recipe:{},
    search:{
        query:'',
        results:[],
        resultPerPage:RES_PER_PAGE,
        page:1 //Default page No 
    },
    bookMarkes:[]
}
const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
    
  };

export const loadRecipe = async function(id){

 try{

   const data = await getJSON(`${API_URL}${id}?key=${KEY}`)   

   state.recipe = createRecipeObject(data);

   if(state.bookMarkes.some(bookMark=>bookMark.id === id)) 
     state.recipe.bookMarked = true
   else    state.recipe.bookMarked = false
   console.log(state.recipe)

}
catch (err){
    throw ` faild to fetch ${id} ${err.status}`

}   
}

export const loadSearchResult = async function(query){

try{
   state.search.query = query

  const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`)
  console.log(data.data.recipes)
 state.search.results = data.data.recipes.map(rec=>{
    return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
    };
})
state.search.page = 1;

} catch(err){
    throw err
}

}


export const getSearchResultsPage = function(page = state.search.page  ){
   
   state.search.page = page

  const start = (page - 1) * state.search.resultPerPage;
  const end = page *  state.search.resultPerPage; 
 return state.search.results.slice(start,end);

}

export const upDateServings = function(newServing){
state.recipe.ingredients.forEach(function(ing){
ing.quantity =  ing.quantity * newServing /state.recipe.servings;

 // newOt = oldOt * newServings / oldServing// 2 *8/4=4   
  
 });
 state.recipe.servings = newServing

}

const presistBoorkmarks = function(){
    localStorage.setItem('bookMarks',JSON.stringify(state.bookMarkes))
}


export const addBookMarks = function(recipe){
//Add bokmarks     
state.bookMarkes.push(recipe)
// Mark current recipe as bookMark
if(recipe.id === state.recipe.id )state.recipe.bookMarked = true
presistBoorkmarks()
}


export const deleteBookMarks = function (id){
  //Delete BookMark  
  const index = state.bookMarkes.findIndex(el=> el.id ===id)
  console.log(index)
  state.bookMarkes.splice(index,1)
  // Mark current recipe as not bookMark

  if(id === state.recipe.id )state.recipe.bookMarked = false
  presistBoorkmarks()

}

const init = function(){
const storage = localStorage.getItem('bookMarks')
if(storage) state.bookMarkes = JSON.parse(storage)
}

init()

// const clearBookMarks = function(){
//     localStorage.clear('bookMarks')
// }
// clearBookMarks()

export const uploadRecipe =  async function(newRecipe){
    try {
        const ingredients = Object.entries(newRecipe)
          .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
          .map(ing => {
            const ingArr = ing[1].split(',').map(el => el.trim());
            // const ingArr = ing[1].replaceAll(' ', '').split(',');
            if (ingArr.length !== 3)
              throw new Error(
                'Wrong ingredient fromat! Please use the correct format :)'
              );

  const[quantity,unit,description] = ingArr
  return{quantity:quantity?+quantity:null,unit,description}
  })  
  console.log(ingredients)
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  };
const data = await sendJSON(`${API_URL}?key=${KEY}`,recipe)
state.recipe = createRecipeObject(data);
addBookMarks(state.recipe)

}catch(err){
   throw err
}


}