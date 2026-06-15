import { defineStore } from "pinia"
import { ref, computed, reactive } from "vue"
import { interpretaCodigo, obtenerTipoCambio } from "../services/weatherService"

export const useWeatherStore = defineStore('weather', () => {
  const ciudad = ref('Cancun')
  const pais = ref('Mexico')
  const latitud = ref(20.970)
  const longitud = ref(-86.93)
  const cargando = ref(false)
  const error = ref('')

  const clima = reactive({
    temperatura: null,
    viento: null,
    codigoClima: 0,
    ultimaActualizacion: null
  })

  const historial = ref([])

  // --- tipo de cambio ---
  const tipoCambio = ref(null)
  const cargandoCambio = ref(false)

  async function cargarTipoCambio() {
    cargandoCambio.value = true
    try {
      tipoCambio.value = await obtenerTipoCambio()
    } catch {
      tipoCambio.value = null
    } finally {
      cargandoCambio.value = false
    }
  }
  // ----------------------

  const tieneClima = computed(() => clima.temperatura !== null)
  const descripcionClima = computed(() => {
    if (!clima.temperatura) return 'Sin datos'
    if (clima.temperatura > 30) return 'Esta HOT'
    if (clima.temperatura > 25) return 'Calido'
    if (clima.temperatura > 15) return 'Templado'
    return 'Fresco'
  })
  const iconoClima = computed(() => {
    return tieneClima.value ? interpretaCodigo(clima.codigoClima).emoji : '🌐'
  })
  const tiempoActualizacion = computed(() => {
    if (!clima.ultimaActualizacion) return 'NUNCA'
    const minutos = Math.floor((Date.now() - clima.ultimaActualizacion) / 60000)
    if (minutos < 1) return "Hace menos de un minuto"
    if (minutos < 60) return `hace ${minutos} minutos`
    return `hace ${Math.floor(minutos / 60)} h.`
  })

  function setCiudad(nombre, lat, lon, paisNombre) {
    ciudad.value = nombre
    pais.value = paisNombre
    latitud.value = lat
    longitud.value = lon
    const yaExiste = historial.value.some(c => c.nombre === nombre)
    if (!yaExiste) {
      historial.value = [{ nombre, lat, lon }, ...historial.value.slice(0, 5)]
    }
  }
  function setClima(temp, vientKm, cod) {
    clima.temperatura = temp
    clima.viento = vientKm
    clima.codigoClima = cod
  }
  function limpiarError() { error.value = '' }
  function limpiarHistorial() { historial.value = [] }

  return {
    ciudad, pais, latitud, longitud, clima, historial, cargando, error,
    tieneClima, descripcionClima, iconoClima, tiempoActualizacion,
    tipoCambio, cargandoCambio,
    setCiudad, setClima, limpiarError, limpiarHistorial, cargarTipoCambio
  }
})