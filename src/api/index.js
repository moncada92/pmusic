import config from './config'

const { apiKey } = config
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtists (country) {
  // remplazamos la variable country por el valor obtenido
  const url = URL.replace(':country', country)
  return fetch(url)
  	.then(res => res.json())// nos devuelve los datos del array donde estan los artistas en la API
  	.then(json => json.topartists.artist)// accedemos a los dadots directos de los artistas en Json de la API
}
