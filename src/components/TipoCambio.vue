<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

const store = useWeatherStore()
const cantidad = ref('')
const resultado = ref(null)

function calcular() {
  if (!cantidad.value || store.tipoCambio === null) return
  resultado.value = (cantidad.value * store.tipoCambio).toFixed(2)
}

onMounted(() => store.cargarTipoCambio())
</script>

<template>
  <div class="card">
    <h3>Convertidor de Euros a Pesos</h3>
    <p v-if="store.cargandoCambio" class="msg">Cargando...</p>
    <template v-else-if="store.tipoCambio !== null">
      <input v-model.number="cantidad" type="number" min="0" placeholder="Cantidad en EUR" />
      <button @click="calcular">Calcular</button>
      <p v-if="resultado !== null" class="resultado">
        {{ cantidad }} EUR = <strong>{{ resultado }} MXN</strong>
      </p>
    </template>
    <p v-else class="msg err">No se pudo obtener el tipo de cambio</p>
  </div>
</template>

<style scoped>
.card {
  background: #16213e;
  color: #d0d0d0;
  border-radius: 12px;
  padding: 28px 32px;
  max-width: 420px;
  margin-top: 16px;
  font-family: 'Gill Sans', Calibri, sans-serif;
  text-align: center;
}
h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px;
}
input {
  width: 100%;
  background: #0d0d1a;
  border: 1px solid #2a2a40;
  border-radius: 8px;
  color: #d0d0d0;
  font-size: 15px;
  padding: 10px 14px;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 12px;
}
input:focus { border-color: #444; }
button {
  width: 100%;
  background: #1a1a4e;
  border: 1px solid #2a2a60;
  border-radius: 8px;
  color: #d0d0d0;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 16px;
}
button:hover { background: #22226a; }
.resultado { font-size: 15px; color: #8888a0; margin: 0; }
.resultado strong { color: #ffffff; font-weight: 600; }
.msg { font-size: 13px; color: #666; margin: 8px 0; }
.err { color: #f87171; }
</style>