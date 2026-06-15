<script setup>
import WeatherCard from '../components/WeatherCard.vue'
import SearchBar from '../components/SearchBar.vue'
import HistorialCiudades from '../components/HistorialCiudades.vue'
import TipoCambio from '../components/TipoCambio.vue'
import { useWeatherStore } from '../stores/weatherStore'

const store = useWeatherStore()

async function onBuscar(ciudad) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ciudad)}&format=json&limit=1`
        const respuesta = await fetch(url)
        const datos = await respuesta.json()

        if (datos.length === 0) {
            alert(`No se encontró la ciudad: ${ciudad}`)
            return
        }

        const { lat, lon, display_name, address } = datos[0]
        const nombreCorto = display_name.split(',')[0].trim()
        // Guardar tambien el pais que viene en la respuesta de Nominatim
        const paisNombre = address?.country || 'Desconocido'

        store.setCiudad(nombreCorto, parseFloat(lat), parseFloat(lon), paisNombre)

    } catch (e) {
        alert('Error al buscar la ciudad. Verifica tu conexión.')
    }
}
</script>

<template>
    <section class="home">
        <h1>Weather App</h1>
        <p class="subtitle">Aplicación de clima en tiempo real</p>
        <SearchBar @buscar="onBuscar" />
        <WeatherCard />
        <TipoCambio />
        <HistorialCiudades />
    </section>
</template>

<style scoped>
.home { padding: 40px; font-family: Arial; }
.h1{ color: #1e3a5f; font-size: 2rem; margin-bottom: 8px; }
.subtitle { color: #66748B;}
</style>