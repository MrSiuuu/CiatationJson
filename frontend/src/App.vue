<script setup>
import { RouterView, RouterLink } from 'vue-router';
import franchiLogo from './assets/franchi.png';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Badge version -->
    <div class="fixed top-4 right-4 z-50">
      <span class="bg-green-100 text-green-700 px-6 py-2 rounded-full text-lg font-semibold shadow">
        Version actuelle : v1.0
      </span>
    </div>
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div class="flex flex-col md:flex-row w-full max-w-4xl justify-between items-center">
          <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <img :src="franchiLogo" alt="Logo" class="h-10 w-10 object-contain rounded-full shadow" />
            <h1 class="text-2xl font-bold text-gray-900">Générateur de Citations</h1>
          </div>
          <nav class="flex space-x-8">
            <RouterLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors">Accueil</RouterLink>
            <RouterLink to="/add" class="text-gray-600 hover:text-blue-600 transition-colors">Ajouter une citation</RouterLink>
            <RouterLink to="/about" class="text-gray-600 hover:text-blue-600 transition-colors">À propos</RouterLink>
          </nav>
        </div>
      </div>
    </div>

    <main class="py-8 flex justify-center">
      <div class="w-full max-w-4xl px-4">
        <RouterView />
      </div>
    </main>

    <footer class="bg-white shadow-sm py-4 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p> KOUYATE Issa  © {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
}
</style>

