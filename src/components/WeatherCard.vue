<script setup>
import {onMounted} from 'vue'
import {useWeatherStore} from '../stores/weatherStore'
import {obtenerClima, interpretaCodigo } from '../services/weatherServices'

const store = useWeatherStore();
async function cargarClima(){
    store.cargando = true;
    store.limpiarError();
    try{
        const datos = await obtenerClima(store.latitud, store.longitud);
        console.log(datos)
        store.setClima(datos.temperatura, datos.viento);
        store.codigoClima = datos.codigosClima
        //store.descripcionClima = interpretaCodigo(datos.codigosClima)
        
    } catch {
        store.error = 'No se pudo carnal no se conecto a la API del clima';
    } finally {
        store.cargando = false;
    }
}


onMounted(cargarClima);
</script>
<template>
    <div class = "card">
        <header>
            <h2>{{ store.ciudad }}</h2>
            <span class = "badge"> {{ store.descripcionClima }}</span>
        </header>

        <div v-if = "store.cargando" class = "estado">
            obteniendo clima...
        </div>

        <div v-else-if = "store.error" class = "estado error">
            {{ store.error }}
        </div>

        <div v-else class = "datos">
            <p class = "temp">{{ store.temperatura }}°C</p>
            <p class = "viento"> {{ store.viento }} km/h</p>
        </div>
        <button @click = "cargarClima" :disabled = "store.cargando">
            {{ store.cargando? 'Actualizando..':'Actualizar' }} 
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

