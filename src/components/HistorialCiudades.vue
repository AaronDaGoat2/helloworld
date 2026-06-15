<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

const store = useWeatherStore()

/* Computada dentro del componente — muestra el más reciente primero */
const historialOrdenado = computed(() =>
    [...store.historial].reverse()
)
</script>

<template>
    <!-- v-show: el elemento se renderiza siempre en el DOM pero se oculta con display:none -->
    <div class="historial-container" v-show="store.historial.length > 0">
        <p class="historial-titulo">Ciudades recientes:</p>

        <div class="historial-lista">
            <button
                class="historial-btn"
                v-for="ciudad in historialOrdenado"
                :key="ciudad.nombre"
                @click="store.setCiudad(ciudad.nombre, ciudad.lat, ciudad.lon)"
            >
                {{ ciudad.nombre }}
            </button>
        </div>

        <button class="limpiar-btn" @click="store.limpiarHistorial()">
            Limpiar historial
        </button>
    </div>
</template>

<style scoped>
.historial-container {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #cdd5df;
    border-radius: 12px;
    max-width: 320px;
    font-family: Arial;
}

.historial-titulo {
    color: #66748B;
    font-size: 13px;
    margin: 0 0 10px 0;
}

.historial-lista {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.historial-btn {
    background: #dbeaf3;
    color: #1e3a5f;
    border: none;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
}

.historial-btn:hover {
    background: #2563EB;
    color: white;
}

.limpiar-btn {
    background: none;
    border: 1px solid #cdd5df;
    color: #66748B;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
}


</style>