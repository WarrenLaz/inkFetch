import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';

export const useSliderStore = defineStore('slider', () => {
  const sliderValue = ref(50); // Default value

  // Load value from localStorage on the client-side
  onMounted(() => {
    if (process.client) {
      const savedValue = localStorage.getItem('sliderValue');
      if (savedValue !== null) {
        sliderValue.value = Number(savedValue);
      }
    }
  });

  // Watch for changes and update localStorage (only in client)
  watch(sliderValue, (newValue) => {
    if (process.client) {
      console.log("Exporting new slider value:", newValue);
      localStorage.setItem('sliderValue', String(newValue));
    }
  });

  return { sliderValue };
});
