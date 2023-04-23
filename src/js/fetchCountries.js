const BASE_URL = `https://restcountries.com/v3.1/name/`;
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

export {fetchCountries}