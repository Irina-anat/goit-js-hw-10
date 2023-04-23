import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';


const searchCountry = document.querySelector(`#search-box`);
//console.log(searchCountry)
const countryList = document.querySelector(`.country-list`);
//console.log(countryList)
const countryInfo = document.querySelector(`.country-info`);
//console.log(countryInfo)
const DEBOUNCE_DELAY = 300;

searchCountry.addEventListener(`input`, debounce(onInput, DEBOUNCE_DELAY))

function onInput(e) {
  let countryName = e.target.value;
  if (countryName.trim() === ``) {
    clear(countryInfo)
    return;
  }
  
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
      } 

      if(data.length > 1  && data.length <= 10) {
        countryList.innerHTML = createMarcupCountryList(data);
        clear(countryInfo)
      }
      
      if (data.length === 1) {
        countryInfo.innerHTML = createMarcupCountryInfo(data)
        clear(countryList)
      }
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'),
     clear(countryList),
     clear(countryInfo) 
    )    
}

function clear(elem) {
  elem.innerHTML = '';
}


function createMarcupCountryList(arr) {
  return arr
    .map(
      ({ name: { official },
        flags: { svg } }) =>
        `<li class="country-name"><img src="${svg}" width = 40px height = 20 px> <h2>${official}</h2></li>`)
    .join(``) 
}

function createMarcupCountryInfo(arr) {
  return arr
    .map(
      ({name: { official },
        flags: { svg }, capital,
        population,
        languages }) =>
        `<div class="country-name"><img src="${svg}" width = 40px height = 20 px> <h2>${official}</h2></div>
        <p class="country-data">Capital: ${capital}</p> 
         <p class="country-data">Population: ${population}</p> 
         <p class="country-data">Languages: ${Object.values(languages)}</p>`)
    .join(``)
}





