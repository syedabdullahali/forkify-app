
class MobilViewport {
_BackButton = document.querySelector('.PreviousButton')
_HomeButton = document.querySelector('.HomeButton')
_ThemeButton = document.querySelector('.theme-bt')
_ThemeButton2 = document.querySelector('.ThemeButton')
_Container = document.querySelector('.container')
_closebtn = document.querySelector('.close')
_menu_btn = document.querySelector('.menu-bt')

constructor(){
    this._backButton()
    this._homelButton()
    this._CloseBtn()
    this._ThemeButton2.addEventListener("click",this._buttonUicolor)
    this._ThemeButton.addEventListener("click",this._buttonUicolor)
    this._menu_btn.addEventListener('click',function(){
      document.querySelector(".Buttons-container").style.display ='flex'
    })

}   
_buttonUicolor(){
const ThemeButton =  document.querySelector('.ThemeButton')
const ThemeButton2 = document.querySelector('.theme-bt')
const bodyc =document.querySelector('body')
const root = document.querySelector(':root')  

const UiColor = function(l1,l2,l3,d1,d2) {
  root.style.setProperty('--color-grey-light-1', l1)
  root.style.setProperty('--color-grey-light-2',l2)
  root.style.setProperty('--color-grey-light-3',l3)
  root.style.setProperty('--color-grey-dark-1',d1)
  root.style.setProperty('--color-grey-dark-2',d2)  
}
const UiColorGrad = function(...color){
  root.style.setProperty('--color-grad',color[0])
  root.style.setProperty('--color-grad-1', color[1])
  root.style.setProperty('--color-grad-2', color[2])
  root.style.setProperty('--color-grad-3', color[3])
  root.style.setProperty('--color-grad-4', color[4])
  root.style.setProperty('--color-grad-5', color[5])
}
const inputcolor = function(inputC,inputB){
  root.style.setProperty('--input-color',inputC)
  root.style.setProperty('--input-background', inputB)
}

 if(ThemeButton.textContent =="Dark"){
  ThemeButton.innerHTML=`Light<i class="bi bi-sun"></i>`
  ThemeButton2.innerHTML=`<i class="bi bi-sun"></i>`
  bodyc.style.background=" linear-gradient(to right bottom,rgb(132, 2, 95),#6e0189)"

  UiColor('#620760','#000000','#9da0a4','#f1e8e8','#918581')
  UiColorGrad('rgb(22, 22, 22)','#ba0bba','#de0c83','#fbf7fc','#6e0189','rgb(132, 2, 95)')
  inputcolor('white','black')
 }else if(ThemeButton.textContent =="Light"){
  ThemeButton.innerHTML=`Dark<i class="bi bi-moon"></i></button>`
  ThemeButton2.innerHTML=`<i class="bi bi-moon"></i></i>`
  bodyc.style.background=" linear-gradient(to right bottom,#5292fa, #f488e9)"

  UiColor('#fef1e8','#faf0d8','#9da0a4','#615551','#918581')
  UiColorGrad('rgb(253, 250, 250)','#5292fa','#f488e9','#ff61b0','#f488e9','#5292fa')
  inputcolor('rgb(0, 0, 0)','white')
}
}

_homelButton(){
this._HomeButton.addEventListener('click',function(){
   const recipe = document.querySelector('.recipe')
   const header =document.querySelector('.header')
   const searchresult =document.querySelector('.search-results')

   history.pushState(null, "", " ") 

   recipe.style.left= "0%"; 
   header.style.right="0%";
   searchresult.style.left="0%"
}) 
 }

_backButton(){
this._BackButton.addEventListener('click',function(){
if(window.location.hash){
window.history.back()

}
 }) 
   }

//Smaller View Port Function 
_smallerViewPortView(View){
const recipe = document.querySelector('.recipe')
const header =document.querySelector('.header')
const searchresult =document.querySelector('.search-results')


const StyelFunction = function(left,rigth,search){
  recipe.style.left= left; 
  header.style.right= rigth
  searchresult.style.left = search
}

if(View.matches) {


if(Boolean(location.hash) && View.matches){
  StyelFunction("-100%","50%","-100%")
}
window.addEventListener('hashchange',function(){
  if(View.matches){
    StyelFunction("-100%","50%","-100%")
  }

})} 
}
// Larger View Port function
defaultStyle(View){
const recipe = document.querySelector('.recipe')
const header =document.querySelector('.header')
const searchresult =document.querySelector('.search-results')
 
if(View.matches){
   console.log('fjnjkn',View.matches)
   recipe.style.left= "0%"; 
   header.style.right="0%"
   searchresult.style.left="0%"
window.addEventListener('hashchange',function(){
    recipe.style.left= "0%"; 
    header.style.right="0%"
    searchresult.style.left="0%"

 })
  }
 }  

 _CloseBtn(){
  this._closebtn.addEventListener("click",function(e){
  e.target.closest(".Buttons-container").style.display ='none'

  
  })  
 }

}
export default new MobilViewport()
 



 





