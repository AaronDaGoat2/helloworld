<script setup>
import { ref } from 'vue'

const emit = defineEmits(['buscar'])

const ciudadInput = ref('')

function onClickBuscar() {
    if (!ciudadInput.value.trim()) return
    emit('buscar', ciudadInput.value)
}
</script>

<template>
    <div class="search-bar">
        <input
            v-model="ciudadInput"
            type="text"
            placeholder="Escribe el nombre de la ciudad..."
            @keyup.enter="onClickBuscar"
        />
        <button @click="onClickBuscar">Buscar</button>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.search-bar input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #cdd5df;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}

.search-bar input:focus {
    border-color: #2563EB;
}

.search-bar button {
    padding: 10px 20px;
    background: #2563EB;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
}

.search-bar button:hover {
    background: #1d4ed8;
}
</style>