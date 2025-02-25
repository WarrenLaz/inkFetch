
<script>
import { useSliderStore } from '~/store/sliderStore';

const store = useSliderStore();
</script>
<template>
    <div>
        <input type="range" min="0" max="100" v-model="store.sliderValue" class="slider" id="mySlider">
    </div>
</template>
<style scoped>
.slider-container {
      width: 80%;
      margin: 50px auto;
      text-align: center;
    }

    /* Style the slider itself (boxy look) */
    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 20px; /* Make it taller for a more boxy feel */
      background: #ccc; /* Light gray background */
      border: 2px solid #888; /* Border to make it look boxy */
      border-radius: 5px; /* Slight rounding of the corners */
      outline: none;
      transition: background 0.3s ease;
    }

    .slider:hover {
      background: #bbb; /* Slightly darker when hovered */
    }

    /* Style the thumb (boxy style) */
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px; /* Square thumb */
      height: 20px; /* Square thumb */
      border: 2px solid #292929; /* Boxy border for the thumb */
      background: #292929; /* Green color for the thumb */
      cursor: pointer;
      border-radius: 0px; /* Square corners */
    }

    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 2px solid #888;
      background: #4CAF50;
      cursor: pointer;
      border-radius: 0px; /* Square corners */
    }

    /* Display the value of the slider */
    .slider-value {
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #292929;
    }
</style>