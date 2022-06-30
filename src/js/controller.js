import 'core-js/stable'
import 'regenerator-runtime/runtime'

import * as model from './model.js';
import { MODEL_CLOSE_SEC , MediaQ } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js';
import bookmarksView from './views/BookMarksView';
import paginationView from './views/PaginationView.js'
import addrecipeView from './views/addrecipeView.js';
import Mobile from'./views/MobileViewPort.js'

// const recipeContainer = document.querySelector('.recipe');

// if(module.hot){
//  module.hot.accept()
// }


const controlResipe =  async function(){
  //Loadding resipe
try{  
const id = window.location.hash.slice(1);
if(!id)return
recipeView.renderSpinner()

//0) Update results view to mark selected search results 
resultsView.update(model.getSearchResultsPage())
//0) Update bookMarks
bookmarksView.update(model.state.bookMarkes)

//load recipe 
await model.loadRecipe(id)
// redering recipe View 
recipeView.render(model.state.recipe)
// const resipeView = new recipeView(model.state.recipe)




//redar recipe 
}
catch{
  recipeView.renderError()
}
}

const controlSearchResult = async function(){
try{
  
  // console.log(recipeView)
  //1)Get Search query 
  const query = searchView.getQuery()
  if(!query) resultsView.renderError();
  if(query){
    resultsView.renderSpinner();
  }
  // 2) Load Search Results  
  // If the value is not a Promise, it(await) 
  //converts the value to a resolved Promise, and waits for it.
 
   await model.loadSearchResult(query)

  // console.log(model.state.search.results)
  resultsView.render(model.getSearchResultsPage())
  //4)Pagination Button 
  // console.log(model.state.search)
  paginationView.render(model.state.search)

//  await controlServing()

}
catch(err){
     console.log(err)
 }
}

const controlPagination = function(goToPage){
  console.log('Pag Controller')
  // 1)Render new result 
  resultsView.render(model.getSearchResultsPage(goToPage))
  //2)Render NEW pagination buttons 
  paginationView.render(model.state.search)

}

const controlServing = function(newServing){
  //Update the recipe servings (in state) 
  model.upDateServings(newServing)
  //UPdate the recipe view 
  // recipeView.render(model.state.recipe)
  recipeView.render(model.state.recipe)


}

const controllerBookmark = function(){
 // 1)Add/remove bookmarks 
   if(!model.state.recipe.bookMarked) model.addBookMarks(model.state.recipe)
   else  model.deleteBookMarks(model.state.recipe.id);
// 2) Update recipe view 
   recipeView.update(model.state.recipe)
//3) Render bookMarks
bookmarksView.render(model.state.bookMarkes)
}

const controleBookmarks = function(){
bookmarksView.render(model.state.bookMarkes)
}

const controlAddResipe = async function(newResipe){
try{
console.log(newResipe)
// Show Loding Spinar 
addrecipeView.renderSpinner()

//Upload The new recipe data
await model.uploadRecipe(newResipe)
//Render recipe 

recipeView.render(model.state.recipe)
//success Message
addrecipeView.renderSuccess();

//Render BookMark View 
bookmarksView.render(model.state.bookMarkes)
bookmarksView.render(model.state.bookMarkes)


//Change id 

window.history.pushState(null,'',`#${model.state.recipe.id}`)
// window.history.back()

//Close form Window
setTimeout(function(){
  addrecipeView.toggleWindow()
},MODEL_CLOSE_SEC * 1000)
}catch( err){
  console.log('💥',err)
  addrecipeView.renderError(err.message)
}
}

const init = function(){  
bookmarksView.addHandlerRender(controleBookmarks)
recipeView.addHandlerRender(controlResipe);
recipeView.addHandlerUpdateServing(controlServing)
recipeView.addHandlerAddBookMark(controllerBookmark)
searchView.addHandlerSearch(controlSearchResult)
paginationView._addHandlerClick(controlPagination)
addrecipeView._addHandlerUpload(controlAddResipe)
}
init()

// View Port Setting For smaller ViewPort
const SmallerViewPort =function(){
const Viewport = window.matchMedia(`(max-width: ${MediaQ })`)
const Viewport2 = window.matchMedia(`(min-width:${MediaQ })`)

//smallerViewPort
Mobile._smallerViewPortView(Viewport)
Viewport.addEventListener('change',Mobile._smallerViewPortView)

//LargerViewport
Mobile.defaultStyle(Viewport2)
Viewport2.addEventListener('change',Mobile.defaultStyle)

} 

SmallerViewPort()




