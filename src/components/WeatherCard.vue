<script setup>
import { onMounted, watch, onUnmounted } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import { obtenerClima, interpretaCodigo } from '../services/weatherService'

const store = useWeatherStore();
let timer = null;

async function cargarClima() {
    store.cargando = true;
    store.limpiarError();
    try {
        const datos = await obtenerClima(store.latitud, store.longitud);
        store.setClima(datos.temperatura, datos.viento, datos.codigosClima);
    } catch {
        store.error = 'No se pudo carnal no se pudo obtener el clima. Verifica tu conexión.';
    } finally {
        store.cargando = false;
    }
}

/* Watch: recargar cuando el usuario cambia de ciudad
   solo se ejecutara cuando latitud o longitud cambian
*/
watch(
    [() => store.latitud, () => store.longitud],
    () => {
        cargarClima();
    }
)

onMounted(async () => {
    await cargarClima();
    timer = setInterval(cargarClima, 5 * 60 * 1000) // cada 5 minutos
});

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div class="card">
        <header>
            <div>
                <h2>{{ store.ciudad }}</h2>
                <span class="actualizacion"> {{ store.tiempoActualizacion }}</span>
            </div>
            <span class="badge"> {{ store.descripcionClima }}</span>
        </header>

        <div v-if="store.cargando" class="estado">
            <span class="spinner">⏳</span>obteniendo clima...
        </div>

        <div v-else-if="store.error" class="estado error">
            {{ store.error }}
            
        </div>

        <div v-else class="datos">
            <p class="icono">{{ store.iconoClima }}</p>
            <p class="temp">{{ store.clima.temperatura }}°C</p>
            <p class="viento"> {{ store.clima.viento }} km/h</p>
        </div>

        <button @click="cargarClima" :disabled="store.cargando">
            {{ store.cargando ? 'Actualizando..' : 'Actualizar' }}
        </button>
    </div>
</template>

<style scoped>
.card { border: 2px solid; border-radius: 16px; padding: 28px;
    max-width: 320px; 
    font-family: 'Gill sans', 'Gill sans MT', Calibri, 'Trebuchet MS', sans-serif;
    header{ display: flex; justify-content: space-between; align-items: center;}
    h2 {color: #1e3a5f; margin: 0;}
    .badge{background-color: #dbeaf3; color: #1e3a5f; padding: 4px 10px; border-radius: 20px; font-size: 13px;}
    .temp    { font-size:48px; font-weight:800; color:#2563EB; margin:16px 0 0; }
    .viento  { color:#374151; margin:4px 0; }
    .estado  { padding:20px 0; color:#7e96bd; }
    .error   { color:#991B1B; }
    button   { margin-top:16px; background:#2563EB; color:white;
               border:none; padding:10px 20px; border-radius:8px; cursor:pointer; }
    button:disabled { opacity:0.5; cursor:not-allowed; }
} 
</style>
