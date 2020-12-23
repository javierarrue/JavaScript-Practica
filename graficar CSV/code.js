graficar();

async function graficar(){
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.x,
            datasets: [{
                label: 'Caballos de fuerza',
                data: data.y,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value + ' HP';
                        }
                    }
                }]
            }
        }
    });
}

//Funcion asincrona que permitira jalar los datos de un archivo .CSV
async function getData(){
    const x = [];
    const y = [];
    //Jalos los datos usando fetch.
    const response = await fetch('carsChanged.csv');
    //Lo paso a string.
    const data = await response.text();
    //Aqui separo cada fila usando el metodo split usando como delimitador 
    //el salto de linea.
    //Tambien se usa el metodo slice para "cortar" la primera fila, la cual
    //no es importante debido a que no representa un numero. O sea simplemente
    //se corta la cabecera de cada columna. Solo se mostrara los datos a partir
    //del index 1.
    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const column = row.split(';');
        const car = column[0];
        const horsePower = column[4];
        x.push(car);
        y.push(horsePower);
        console.log('Carro: '+car + ', Caballos de fuerza: '+horsePower);
    })
    return {
        x,y
    };
}

