// 1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. 
//    El formato de los documentos debe estar en correspondencia con el que venimos utilizando
//    en el entregable con base de datos MariaDB.
// 2) Definir las claves de los documentos en relación a los campos de las tablas de esa base.
//    En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo
//    valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

use baseDatos

db.productos.insertMany([
{nombre:"Campera", precio:3586},
{nombre:"Jean", precio:4956},
{nombre:"Medias", precio:300},
{nombre:"Reloj", precio:2469},
{nombre:"Gorra", precio:1569},
{nombre:"Camisa", precio:3300},
{nombre:"Zapatos", precio:5000},
{nombre:"Anteojos", precio:963},
{nombre:"Buzo", precio:3490},
{nombre:"Remera", precio:300},
])


db.mensajes.insertMany([
{nombre:"Lucas", email:"info@gmail.com", mensaje: "Mi nombre es Lucas"},
{nombre:"Marcela", email:"info3@gmail.com", mensaje: "Mi nombre es Marcela"},
{nombre:"Micaela", email:"info5@gmail.com", mensaje: "Mi nombre es Micaela"},
{nombre:"Marta", email:"info7@gmail.com", mensaje: "Mi nombre es Marta"},
{nombre:"Sebastian", email:"info9@gmail.com", mensaje: "mi nombre es Sebastian"},
{nombre:"Sofia", email:"info6@gmail.com", mensaje: "mi nombre es Sofia"},
{nombre:"Mirta", email:"info8@gmail.com", mensaje: "Mi nombre es Mirta"},
{nombre:"Roberto", email:"info4@gmail.com", mensaje: "Mi nombre es Roberto"},
{nombre:"Liliana", email:"info0@gmail.com", mensaje: "Mi nombre es Liliana"},
{nombre:"Diego", email:"info2@gmail.com", mensaje: "Mi nombre es Diego"},
])

// 3) Listar todos los documentos en cada colección.

show collections;

db.productos.find();
db.mensajes.find();

// 4) Mostrar la cantidad de documentos almacenados en cada una de ellas.

db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();

// 5)Realizar un CRUD sobre la colección de productos:
//     a) Agregar un producto más en la colección de productos 

db.productos.insertOne({nombre:"Cordones", precio:450})

//     b) Realizar una consulta por nombre de producto específico:
//        I) Listar los productos con precio menor a 1000 pesos

db.productos.find({precio:{$lt:1000}},{nombre:1})

//        II) Listar los productos con precio entre los 1000 a 3000 pesos.

//db.productos.find({precio:{$gt:1000}, {$lt:3000}},{nombre:1})

db.productos.find({precio:{$gt:1000, $lt:3000}},{nombre:1})

//        III) Listar los productos con precio mayor a 3000 pesos.

db.productos.find({precio:{$gt:3000}},{nombre:1})

//        IV) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

db.productos.find().sort({precio:1})

db.productos.find().sort({precio:1}).skip(2).limit(1)

//     c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

db.productos.updateMany({},{$set:{stock:100}})

//     d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

db.productos.find().sort({precio:-1})

db.productos.updateMany({precio:{$gt:4000}}, {$set:{stock:0}})

//     f) Borrar los productos con precio menor a 1000 pesos 

db.productos.deleteMany({precio:{$lt:1000}})

// 6)Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

db.createUser({
    user:"pepe",
    pwd: "asd456",
    roles:[
        {role:"read",
         db: "baseDatos"
        }]
})
