import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
   _parentElement = document.querySelector('.pagination');

   _addHandlerClick(handler){

   this._parentElement.addEventListener('click',function(e){
    const btn = e.target.closest('.btn--inline')
    if(!btn)return
    const BtnGotoPage = +btn.dataset.goto;
    console.log(BtnGotoPage)

     handler(BtnGotoPage)

   })
   }

   _generateMarkup(){

    const currentPage = this._data.page;

    const numPages = Math.ceil(this._data.results.length/ this._data.resultPerPage)
    //Page 1, and there are another pages
    


    if(currentPage ===1 && numPages>1){
       return `
       <button data-goto="${currentPage +1}" class="btn--inline pagination__btn--next">
            <span>${currentPage +1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> -->
       `;
    }
    //Last Page 
    if(currentPage === numPages &&  numPages>1){
    return      `<button data-goto="${currentPage -1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
                      <span>${currentPage -1}</span>
                </button>`
    }
        //Other Page 


     if(currentPage< numPages){
        return      `<button data-goto="${currentPage -1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
                      <span>${currentPage -1}</span>
                </button>
                
        <button data-goto="${currentPage +1}" class="btn--inline pagination__btn--next">
        <span>${currentPage +1}</span>
            <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
`
     }
     //Page 1, and there are no another pages
     return ''
 }
}
export default new PaginationView()