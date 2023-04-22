import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;
const searchCountry = document.querySelector(`#search-box`)
console.log(searchCountry)
const countryList = document.querySelector(`.country-list`);
console.log(countryList)
const countryInfo = document.querySelector(`.country-info`) 
console.log(countryInfo)
const BASE_URL = `https://restcountries.com/v3.1/name/`;

searchCountry.addEventListener(`input`, debounce(onInput, DEBOUNCE_DELAY))
//Необхідно застосувати прийом Debounce на обробнику події і робити HTTP-запит через 300мс після того, як користувач перестав вводити текст
function onInput(e) {
 // output.textContent = event.currentTarget.value;
  //searchCountry.trim();
  let countryName = e.target.value;
  countryName.trim()//очищення пробілів
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
      } else { countryList.innerHTML = createMarcupCountryList(data) }
      
      if (countryList.children.length === 1) {
        countryInfo.innerHTML = createMarcupCountryInfo(data)
      }
    })
    .catch(err => Notify.failure('Oops, there is no country with that name')) 
}


function fetchCountries(name){
  const URL = `${BASE_URL}${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    console.dir(resp)
    if (!resp.ok) {
      throw new Error(resp.statusText)// працює як return але з примусовим переход в catch
    }
   // console.log(resp.json())Promise {<pending>}
    return resp.json()
  })
};

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
      ({ capital,
        population,
        languages }) =>
        `<p class="country-data">Capital: ${capital}</p> 
         <p class="country-data">Population: ${population}</p> 
         <p class="country-data">Languages: ${Object.values(languages)}</p>`)
    .join(``)
}





