<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- En-tête -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Citations Inspirantes</h1>
          <p class="text-gray-600">Partagez vos citations préférées avec le monde</p>
        </div>

        <!-- Citation aléatoire -->
        <div class="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div v-if="randomLoading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <div v-else-if="randomError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {{ randomError }}
          </div>
          <div v-else-if="randomQuote" class="text-center">
            <blockquote class="italic text-2xl mb-2 text-gray-700">"{{ randomQuote.text }}"</blockquote>
            <p class="text-right font-semibold text-gray-800">— {{ randomQuote.author }}</p>
          </div>
        </div>

        <!-- Bouton nouvelle citation aléatoire EN DEHORS du cadre -->
        <div class="flex justify-center mb-8">
          <button @click="fetchRandomQuote" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Nouvelle citation aléatoire
          </button>
        </div>

        <!-- Bouton pour ajouter une citation -->
        <div class="mb-8">
          <button
            @click="showForm = true"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Ajouter une citation
          </button>
        </div>

        <!-- Formulaire d'ajout/modification -->
        <div v-if="showForm" class="mb-8">
          <QuoteForm
            :quote="editingQuote"
            :is-editing="!!editingQuote"
            @submit="handleFormSubmit"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { quoteService } from '../services/quoteService';
import QuoteForm from '../components/QuoteForm.vue';

const loading = ref(true);
const error = ref(null);
const showForm = ref(false);
const editingQuote = ref(null);

const randomQuote = ref(null);
const randomLoading = ref(false);
const randomError = ref(null);

const fetchRandomQuote = async () => {
  try {
    randomLoading.value = true;
    randomError.value = null;
    const response = await quoteService.getRandomQuote();
    randomQuote.value = response;
  } catch (err) {
    randomError.value = "Erreur lors de la récupération de la citation aléatoire";
    console.error(err);
  } finally {
    randomLoading.value = false;
  }
};

const handleFormSubmit = async (formData) => {
  try {
    await quoteService.addQuote(formData);
    fetchRandomQuote();
    closeForm();
  } catch (err) {
    error.value = "Erreur lors de l'ajout de la citation";
    console.error(err);
  }
};

const closeForm = () => {
  showForm.value = false;
  editingQuote.value = null;
};

onMounted(() => {
  fetchRandomQuote();
});
</script>
