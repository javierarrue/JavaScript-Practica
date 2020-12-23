console.log('Vamo a hacerle fetch a un arcoiris :)');

catchRainbow()
.then(response =>{
    console.log("Terminado");
})
.catch(error => {
    console.log("Error !");
    console.error(error);   
});

async function catchRainbow(){
    const response = await fetch('1.jpg');
    const blob = await response.blob();
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
}
