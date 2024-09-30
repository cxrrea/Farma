const axios = require('axios');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Inicializando o banco de dados SQLite
const db = new sqlite3.Database('./farmaeasy.db');

// Middleware
app.use(cors());
app.use(express.json()); // Para interpretar o JSON nas requisições

db.run(`CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER,
  symptom TEXT
)`);

// Rota para buscar clientes do banco de dados
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) {
      console.error('Error fetching clients:', err);
      return res.status(500).json({ error: 'Failed to fetch clients' });
    }
    res.json(rows);
  });
});

// Criação da tabela de medicamentos (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS medicines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  formula TEXT,
  ingredients TEXT,
  symptoms TEXT
)`);

// Rota para cadastrar medicamentos no banco de dados
app.post('/medicines', (req, res) => {
  const { name, formula, ingredients, symptoms } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const query = `INSERT INTO medicines (name, formula, ingredients, symptoms) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, formula, ingredients, symptoms], function (err) {
    if (err) {
      console.error('Error inserting medicine:', err);
      return res.status(500).json({ error: 'Failed to add medicine' });
    }
    res.json({ message: 'Medicine added successfully', medicineId: this.lastID });
  });
});

// Rota para buscar medicamentos
app.get('/medicines/search', async (req, res) => {
  const query = req.query.query;

  try {
    // Buscar medicamentos da API RxNorm
    const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
    const apiDrugs = response.data.drugGroup.conceptGroup
      .filter(group => group.conceptProperties)
      .flatMap(group => group.conceptProperties)
      .map(concept => ({
        rxcui: concept.rxcui,
        name: concept.name,
        synonym: concept.synonym,
        tty: concept.tty
      }));

    // Buscar medicamentos do banco de dados
    db.all('SELECT * FROM medicines WHERE name LIKE ?', [`%${query}%`], (err, dbDrugs) => {
      if (err) {
        console.error('Error fetching data from database:', err);
        return res.status(500).json({ error: 'Failed to fetch data from database' });
      }

      // Mesclar resultados da API com resultados do banco de dados
      const allDrugs = [...apiDrugs, ...dbDrugs];
      res.json(allDrugs);
    });
  } catch (error) {
    console.error('Error fetching data from RxNorm:', error);
    res.status(500).json({ error: 'Error fetching data from RxNorm' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
