// Require de Express
const express = require('express');

// Require de FS
const fs = require('fs');

// Ejecución de Express
const app = express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync('./data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', (req, res) => {
res.send('Ni superman, Iron Mam o La Mujer Maravilla son tan importantes como las y los Heroes de carne y hueso que encontraras en este sitio. Esperamos que ellas y ellos te sirvan como inspiracion para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!')
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req, res) => {
	res.send(heroes);
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/bio/:id/:ok?', (req, res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let id = req.params.id;
	let ok = req.params.ok;
	let heroe = heroes.filter((heroe) => {
		if(heroe.id == id){
			return heroe;
		};
	});
	heroe = heroe[0];

	if(heroe == undefined) {
		// Si NO se encuentra al héroe se envía un mensaje
		return res.send('No encontramos un héroe para mostrarte en su biografía')
	}
	
	if(ok != 'ok'){
		res.send(`${heroe.nombre}. Lamento que no desees saber más de mi :(`);
	}else{
		if(heroe != undefined){
			// Si nó vino el parámetro se envía el mensaje de error
			res.send(`${heroe.nombre}: ${heroe.resenia}`)
		}
	}
}

	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		
);


// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:idHeroe', (req, res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let id = req.params.idHeroe

	let heroe = heroes.filter((heroe) => {
		return heroe.id == id
	});
	let heroeSeleccionado = heroe[0];

	if(heroeSeleccionado == undefined) {
		res.send('Este héroe no fue encontrado :(  pruebe con otro numero de id.');
	} else {
		res.send(`Hola, mi nombre es ${heroeSeleccionado.nombre} y soy ${heroeSeleccionado.profesion}`)
	}
	// Si se encuentra al héroe se envía el nombre y su profesión
	// Si NO se encuentra se envía el mensaje de no encontrado
});


// Ruta Créditos
// ¿?
app.get('/creditos', (req, res)=>{
	res.send('Página creada por lucas ayala.')
})


// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});   