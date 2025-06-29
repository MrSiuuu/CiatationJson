<template>
  <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">
      {{ isEditing ? 'Modifier la citation' : 'Ajouter une citation' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="text" class="block text-sm font-medium text-gray-700 mb-1">Citation</label>
        <textarea
          id="text"
          v-model="formData.text"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        ></textarea>
      </div>
      <div>
        <label for="auteur-select" class="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
        <div v-if="auteursError" class="text-red-500 text-sm mb-2">{{ auteursError }}</div>
        <select
          id="auteur-select"
          v-model="selectedAuteur"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
        >
          <option value="">-- Choisir un auteur existant --</option>
          <option v-for="auteur in auteurs" :key="auteur" :value="auteur">{{ auteur }}</option>
        </select>
        <div class="text-center text-gray-500 my-2 text-xs">ou</div>
        <input
          id="nouvel-auteur"
          v-model="nouvelAuteur"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Écrire un nouvel auteur"
        />
      </div>
      <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          {{ isEditing ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const props = defineProps({
  quote: {
    type: Object,
    default: () => ({ text: '', author: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({
  text: '',
  author: ''
});

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
  if (props.isEditing) {
    formData.value = { ...props.quote };
    selectedAuteur.value = props.quote.author || ''
  }
  fetchAuteurs()
});

const handleSubmit = () => {
  // Utiliser le nouvel auteur s'il est saisi, sinon l'auteur sélectionné
  formData.value.author = nouvelAuteur.value ? nouvelAuteur.value : selectedAuteur.value
  emit('submit', { ...formData.value });
  if (!props.isEditing) {
    formData.value = { text: '', author: '' };
    selectedAuteur.value = ''
    nouvelAuteur.value = ''
  }
};
</script>
