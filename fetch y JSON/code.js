//API para coordenadas del ISS
const API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
let lat = document.createElement('h3');
let long = document.createElement('h3');

//Creando mapa y las tiles (imagenes)
const mymap = L.map('map').setView([0, 0], 2.5);
const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributers';
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);

//Luego se crea el marcador y un icono personalizado
const myIcon = L.icon({
    iconUrl: 'yep.png',
    iconSize: [50, 50],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0],{icon: myIcon}).addTo(mymap);

//Luego esta la funcion para recibir las coordenadas actuales de la ISS.
async function getISS(){
    //Llama a la api y hace fetch
    const response = await fetch(API_URL);
    //Recibo la respuesta como JSON
    const data = await response.json();
    //Destructurando...
    const { longitude, latitude } = data;
    //Seteo las coordenadas de la ISS.
    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude], 2.5);

    lat.innerText = 'Latitud: '+ latitude.toFixed(2) + ' °';
    long.innerText = 'Longitud: '+ longitude.toFixed(2)+ ' °';

    document.body.appendChild(lat);
    document.body.appendChild(long);

    //setTimeout(getISS(),6000) ;
}
getISS();

