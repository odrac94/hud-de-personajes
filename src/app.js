// Importa los módulos necesarios
require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const { Client } = require("@notionhq/client");
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const DATABASE_ID = process.env.NOTION_PAGE_ID;
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

// Configura la carpeta que contiene los archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, '../public')));

// Maneja las solicitudes a la raíz y sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Ruta para server data.json
app.get('/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data.json'));
});

// Ruta para obtener los datos de Notion y guardarlos en un archivo JSON
app.get('/notion-data', async (req, res) => {
  try {
    const query = { database_id: DATABASE_ID };
    const { results } = await notion.databases.query(query);

    // Filtra y estructura los datos que deseas
    const filteredData = results.map((item) => {
    // console.log('raza', item.properties.raza);

      const properties = item.properties || {}; // Comprueba si properties existe
      return {
        equipo: properties.equipo?.number || null,
        nivel: properties.nivel?.number || null,
        foto: properties.foto?.url || null,
        nombre: properties.nombre?.title[0]?.plain_text || null,
        salud: properties.salud?.number || null,
        raza: properties.raza?.rich_text[0]?.plain_text || null,
        clase: properties.clase?.rich_text[0]?.plain_text || null,
        fuerza: properties.fuerza?.number || null,
        destreza: properties.destreza?.number || null,
        constitucion: properties.constitucion?.number || null,
        inteligencia: properties.inteligencia?.number || null,
        carisma: properties.carisma?.number || null,
      };
    });
    // Verifica si filteredData es un array antes de enviarlo
    if (Array.isArray(filteredData)) {
      // Guarda los datos filtrados en un archivo JSON
      fs.writeFileSync('data.json', JSON.stringify(filteredData, null, 2));
      res.json({ message: 'Datos de Notion filtrados y guardados en data.json' });
      } else {
        console.error('Los datos filtrados no son un array válido:', filteredData);
        res.status(500).json({ error: 'Los datos filtrados no son un array válido' });
      }
    } catch (error) {
      console.error('Error al obtener datos de Notion:', error);
      res.status(500).json({ error: 'Error al obtener datos de Notion' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});