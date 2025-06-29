const fs = require('fs').promises;
const path = require('path');

const CITATIONS_FILE = path.join(__dirname, '../../data/citations.json');
const AUTEURS_FILE = path.join(__dirname, '../../data/auteurs.json');

// Fonction utilitaire pour lire le fichier JSON
const readCitationsFile = async () => {
  try {
    const data = await fs.readFile(CITATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si le fichier n'existe pas, retourner un tableau vide
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Fonction utilitaire pour écrire dans le fichier JSON
const writeCitationsFile = async (citations) => {
  await fs.writeFile(CITATIONS_FILE, JSON.stringify(citations, null, 2), 'utf8');
};

// Fonction utilitaire pour lire les auteurs
const readAuteursFile = async () => {
  try {
    const data = await fs.readFile(AUTEURS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Fonction utilitaire pour écrire les auteurs
const writeAuteursFile = async (auteurs) => {
  await fs.writeFile(AUTEURS_FILE, JSON.stringify(auteurs, null, 2), 'utf8');
};

// Obtenir toutes les citations
const getAllQuotes = async () => {
  const citations = await readCitationsFile();
  return citations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Obtenir une citation aléatoire
const getRandomQuote = async () => {
  const citations = await readCitationsFile();
  if (citations.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * citations.length);
  return citations[randomIndex];
};

// Récupérer la liste des auteurs
const getAuteurs = async () => {
  return await readAuteursFile();
};

// Ajouter un auteur s'il n'existe pas déjà
const addAuteurSiNouveau = async (auteur) => {
  if (!auteur || typeof auteur !== 'string') return;
  const auteurs = await readAuteursFile();
  if (!auteurs.includes(auteur)) {
    auteurs.push(auteur);
    await writeAuteursFile(auteurs);
  }
};

// Ajouter une citation
const addQuote = async (text, author) => {
  await addAuteurSiNouveau(author);
  const citations = await readCitationsFile();
  
  // Générer un nouvel ID
  const newId = citations.length > 0 ? Math.max(...citations.map(c => c.id)) + 1 : 1;
  
  const newQuote = {
    id: newId,
    text,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };
  
  citations.push(newQuote);
  await writeCitationsFile(citations);
  
  return newQuote;
};

// Mettre à jour une citation
const updateQuote = async (id, { text, author }) => {
  const citations = await readCitationsFile();
  const quoteIndex = citations.findIndex(c => c.id === parseInt(id));
  
  if (quoteIndex === -1) return null;
  
  citations[quoteIndex] = {
    ...citations[quoteIndex],
    text,
    author,
    updatedAt: new Date().toISOString()
  };
  
  await writeCitationsFile(citations);
  return citations[quoteIndex];
};

// Supprimer une citation
const deleteQuote = async (id) => {
  const citations = await readCitationsFile();
  const initialLength = citations.length;
  
  const filteredCitations = citations.filter(c => c.id !== parseInt(id));
  
  if (filteredCitations.length === initialLength) {
    return false; // Citation non trouvée
  }
  
  await writeCitationsFile(filteredCitations);
  return true;
};

module.exports = {
  getAllQuotes,
  getRandomQuote,
  addQuote,
  updateQuote,
  deleteQuote,
  getAuteurs,
  addAuteurSiNouveau
};
