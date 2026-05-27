<script setup>
   import WeatherCard from '../components/WeatherCard.vue'

</script>
<template>
    <section class = "home">
        <h1>Weather App</h1>
        <p class = "subtitle">Apliación de clima en tiempo real</p>
        <WeatherCard/>

    </section>
</template>
<style scoped>
.home { padding: 40px; font-family: Arial; }
.h1{ color: #1e3a5f; font-size: 2rem; margin-bottom: 8px; }
.subtitle { color: #66748B;}

</style>



