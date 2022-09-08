<template>
  <button :class="buttonCls"><slot /></button>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
interface ButtonProps {
  long: boolean
  round: boolean
  circle: boolean
  loading: boolean
  size: 'small' | 'middle' | 'large'
  type: 'primary' | 'success' | 'warning' | 'error' | 'link' | 'default'
}

const { type, long, round, circle, loading, size } = defineProps<ButtonProps>()
const addBtnPrefix = (cls = '') => `xs-btn${cls}`
const buttonCls = reactive([
  addBtnPrefix(),
  addBtnPrefix('-' + (type ? type : 'default')),
  {
    [addBtnPrefix('-long')]: long,
    [addBtnPrefix('-round')]: round,
    [addBtnPrefix('-circle')]: circle,
    [addBtnPrefix('-loading')]: loading,
  },
  addBtnPrefix(size === 'middle' ? '' : '-' + size),
])
</script>
