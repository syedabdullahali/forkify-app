import icons from 'url:../../img/icons.svg';

export default class View{
    
    _parentElement= document.querySelector('.search')


    _data;
    _Message = '' 
/**
 * Render the received Object to DOM
 * @param {Object | Object[]} data The data to be renderd (e,g recipe)
 * @returns 
 * @this {Object}  View instance 
 * @authour Syed Abdullha Ali 
 * @todo finish implementation 
 */

    render(data){
      if(!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
      this._data = data
      this._clear();
     // here it will add markup in parent element  
     const Markup = this._generateMarkup();


     this._parentElement.insertAdjacentHTML("afterbegin" ,Markup)
     
    }

    update(data){


    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
    }

    _clear(){
        this._parentElement.innerHTML='';
    }
   renderSpinner(){
 
    const Markup = `
    <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> -->
      `
     this._clear() 
     this._parentElement.insertAdjacentHTML("afterbegin",Markup)
      
      }
renderError(message = this._errorMessage){

  const Markup = `
  <div class="error">
  <div>
   <svg>
     <use href="${icons}#icon-alert-triangle"></use>
   </svg>
  </div>
  <p>${message}<p> 
  </div>    
  
  `
  this._clear() 
  this._parentElement.insertAdjacentHTML("afterbegin",Markup)
}

renderSuccess(message = this._Message){

  const Markup = `
  <div class="message">
  <div>
   <svg>
     <use href="${icons}#icon-smile"></use>
   </svg>
  </div>
  <p>${message}<p> 
  </div>    
  
  `
  this._clear() 
  this._parentElement.insertAdjacentHTML("afterbegin",Markup)
}
}