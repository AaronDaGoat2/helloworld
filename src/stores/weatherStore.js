import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { renderToString } from "vue/server-renderer";

export const useWeatherStore =defineStore('weather', () =>{
    //Estados
    const ciudad = ref('Cancun')
    const latitud = ref(20.970)
    const longitud = ref(-86.93)
    const temperatura = ref(null)
    const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')

    //Computadas
    const tieneClima=computed(() => temperatura.value!==null)

    const descripcionClima= computed(() => {
        if(!temperatura.value) return 'Sin datos'
        if(temperatura.value > 30 ) return 'Esta HOT'
        if(temperatura.value > 25 ) return 'Calido'
        if(temperatura.value > 15 ) return 'Templado'
        return 'Fresco'
    })

    //Accioones
    function setCiudad (nombre, lat, lon ){
        ciudad.value = nombre
        latitud.value=lat
        longitud.value=lon
    }
    function setClima(temp, vientKm ){
    temperatura.value=temp
    viento.value=vientKm

    }

    function limpiarError(){
        error.value=''
    }

    //Exponer todo lo que los componentes pueden utilizar
    return {
        ciudad, latitud, longitud, temperatura, viento, cargando, error,
        tieneClima, descripcionClima,
        setCiudad, setClima, limpiarError
    }


})

















