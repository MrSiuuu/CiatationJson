<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const emit = defineEmits(['quote-added'])

const newQuote = ref({
  text: '',
  author: ''
})
const isSubmitting = ref(false)
const error = ref(null)
const successMessage = ref(null)

const auteurs = ref([])
const selectedAuteur = ref('')
const nouvelAuteur = ref('')
const auteursError = ref(null)

const fetchAuteurs = async () => {
  try {
    const response = await fetch(`${API_URL}/quotes/auteurs`)
    if (!response.ok) throw new Error('Erreur lors de la récupération des auteurs')
    auteurs.value = await response.json()
    auteursError.value = null
  } catch (err) {
    auteurs.value = []
    auteursError.value = "Impossible de charger la liste des auteurs."
  }
}

onMounted(() => {
  fetchAuteurs()
})

const addQuote = async () => {
  // Validation basique
  if (!newQuote.value.text || (!selectedAuteur.value && !nouvelAuteur.value)) {
    error.value = "Le texte et l'auteur sont requis"
    return
  }

  isSubmitting.value = true
  error.value = null
  successMessage.value = null

  // Déterminer l'auteur à utiliser
  newQuote.value.author = nouvelAuteur.value ? nouvelAuteur.value : selectedAuteur.value

  try {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote.value)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la citation")
    }

    const data = await response.json()
    // Réinitialiser le formulaire
    newQuote.value.text = ''
    newQuote.value.author = ''
    selectedAuteur.value = ''
    nouvelAuteur.value = ''
    fetchAuteurs() // Mettre à jour la liste des auteurs
    // Afficher un message de succès
    successMessage.value = 'Citation ajoutée avec succès !'
    // Émettre un événement pour informer le parent
    emit('quote-added', data)
    // Effacer le message de succès après 3 secondes
    setTimeout(() => {
      successMessage.value = null
    }, 3000)
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 mb-4">
      {{ error }}
    </div>
    <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700 mb-4">
      {{ successMessage }}
    </div>
    <form @submit.prevent="addQuote" class="space-y-4">
      <div>
        <label for="quote-text" class="block text-sm font-medium text-gray-700 mb-1">Texte de la citation</label>
        <textarea
          id="quote-text"
          v-model="newQuote.text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          rows="3"
          placeholder="Entrez le texte de la citation"
        ></textarea>
      </div>
      <div>
        <label for="auteur-select" class="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
        <div v-if="auteursError" class="text-red-500 text-sm mb-2">{{ auteursError }}</div>
        <select
          id="auteur-select"
          v-model="selectedAuteur"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2 text-sm"
        >
          <option value="">-- Choisir un auteur existant --</option>
          <option v-for="auteur in auteurs" :key="auteur" :value="auteur">{{ auteur }}</option>
        </select>
        <div class="text-center text-gray-500 my-2 text-xs">ou</div>
        <input
          id="nouvel-auteur"
          v-model="nouvelAuteur"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Écrire un nouvel auteur"
        />
      </div>
      <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
        <button
          type="submit"
          class="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 text-sm"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Ajout en cours...</span>
          <span v-else>Ajouter la citation</span>
        </button>
      </div>
    </form>
  </div>
</template>
