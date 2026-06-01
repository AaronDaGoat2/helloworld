import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { renderToString } from "vue/server-renderer";
import {interpretarCodigo} from "../services/weatherServices";


export const useWeatherStore =defineStore('weather', () =>{
    //Estados
    const ciudad = ref('Cancun')
    const latitud = ref(20.970)
    const longitud = ref(-86.93)
   // const temperatura = ref(null)
    //const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')

    /* Datos del clima agrupados con reactive */
const clima = reactive({
    temperatura: null,
    viento: null,
    codigoClima: 0,
    ultimaActualizacion:null
})

/* Historial de ciudades consultadas*/
const historial = ref([])





    //Computadas
    const tieneClima=computed(() => clima.temperatura!==null)

    const descripcionClima= computed(() => {
        if(!clima.temperatura) return 'Sin datos'
        if(clima.temperatura > 30 ) return 'Esta HOT'
        if(clima.temperatura > 25 ) return 'Calido'
        if(clima.temperatura > 15 ) return 'Templado'
        return 'Fresco'
    })
/* Regresa el icono segun el codigo de clima Open Meteo dxddxdxdxdxdxdxdxd*/
const inconoClima = computed(() => {
    tieneClima.value ? interpretaCodigo(clima.codigoClima).emoji : '🌐'
})
 
/*FC: Tiempo desde desde la ultima actualizacion */
const tiempoActualizacion = computed(() => {
    if(!clima.ultimaActualizacion) return 'NUNCA'
    
    const minutos = Math.floor((Date.now() - clima.ultimaActualizacion) / 60000)
    if (minutos < 1) return "Hace menos de un minuto"
    if( minutos < 60) return `hace ${minutos} minutos`
    return `hace ${Math.floor(minutos/60)} h.`

})



    //Accioones
    function setCiudad (nombre, lat, lon ){
        ciudad.value = nombre
        latitud.value=lat
        longitud.value=lon
    }
    function setClima(temp, vientKm , cod){
    clima.temperatura=temp
    clima.viento = vientKm
    clima.codigoClima = cod

    }

    function limpiarError(){
        error.value=''
    }

    //Exponer todo lo que los componentes pueden utilizar
    return {
        ciudad, latitud, longitud, temperatura, viento, cargando, error,
        tieneClima, descripcionClima, iconoClima, tiempoActualizacion,
        setCiudad, setClima, limpiarError
    }


})

















