<template>
  <div :class="buttonGroupCls"><slot></slot></div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
interface ButtonGroupProps {
  size: 'small' | 'middle' | 'large'
}

const { size } = defineProps<ButtonGroupProps>()
const addBtnPrefix = (cls = '') => `xs-btn-group${cls}`
const buttonGroupCls = reactive([
  addBtnPrefix(),
  addBtnPrefix(size === 'middle' || !size ? '' : '-' + size),
])
</script>
