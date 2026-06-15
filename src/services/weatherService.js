import axios from 'axios';

 const BASE_URL = 'https://api.open-meteo.com/v1/forecast' 
 /**
  * Obtener el clima actual de las coordenadas dadas.
  * @param{float} lat latitud
  * @param{float} lon longitud
  * @return (Promise<{temperatura: float, viento: float}>)
  */

export async function obtenerClima(lat, lon){
    const respuesta = await axios.get(BASE_URL,{
        params:{
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,wind_speed_10m,weather_code',
            timezone: 'auto'
        }
    })
    console.log(respuesta.status)
    const {temperature_2m, wind_speed_10m, weather_code} = respuesta.data.current
    return {
        temperatura: temperature_2m, 
        viento: wind_speed_10m,
        codigoClima: weather_code
    }
}
    /**
     * Convierte el weather_code de Open Meteo en un emoji y descripcion.
     * 
     */
    export function interpretaCodigo(code){
        if(code === 0 ) return {emoji: '☼', desc: 'Cielo despejado'}
        if(code <= 3) return {emoji: '🌥', desc: 'Parcialmente nublado'}
        if(code <= 48) return {emoji: '🌫', desc: 'Niebla'}
        if(code <= 67) return {emoji: '🌧', desc: 'Lluvia'}
        if(code <= 77) return {emoji: '🌨', desc: 'Nieve'}
        if(code <= 82) return {emoji: '🌦', desc: 'Chubasco'}
        return{emoji: '🌩', desc:'Tormenta'}
    }

// ...todo tu código existente de interpretaCodigo y lo que tengas...

export async function obtenerTipoCambio() {
  const resp = await fetch('https://v6.exchangerate-api.com/v6/e440e91451d22b837d2f0378/pair/EUR/MXN')
  const datos = await resp.json()
  if (datos.result !== 'success') throw new Error('Error al obtener tipo de cambio')
  return datos.conversion_rate
}






