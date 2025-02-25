<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Reference to the canvas element
const canvasRef = ref(null);
const isDrawing = ref(false);
const context = ref(null);

// Get the position for both mouse and touch events
const getPosition = (event) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  
  if (event.touches) {
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
};

// Start drawing
const startDrawing = (event) => {
  event.preventDefault(); // Prevent scrolling on touch devices
  isDrawing.value = true;
  
  const ctx = context.value;
  const { x, y } = getPosition(event);
  ctx.beginPath();
  ctx.moveTo(x, y);
};

// Draw as the pointer moves
const draw = (event) => {
  if (!isDrawing.value) return;

  const ctx = context.value;
  const { x, y } = getPosition(event);
  ctx.lineTo(x, y);
  ctx.stroke();
};

// Stop drawing
const stopDrawing = () => {
  isDrawing.value = false;
  context.value.closePath();
};

// Clear the canvas
const clearCanvas = () => {
  const canvas = canvasRef.value;
  const ctx = context.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Initialize canvas context on mount
onMounted(() => {
  const canvas = canvasRef.value;
  context.value = canvas.getContext("2d");
  context.value.lineWidth = 5;
  context.value.lineCap = "round";
  context.value.strokeStyle = "black"; // Default stroke color
});

// Cleanup on unmount
onBeforeUnmount(() => {
  isDrawing.value = false;
});
</script>

<template>
  <div class="drawing-container">
    <canvas
      ref="canvasRef"
      width="400"
      height="400"
      class="drawing-canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
    ></canvas>
    <div class="inner-box">
    <button @click="clearCanvas" >CLEAR</button>
    <button @click="clearCanvas" style="background-color: #0066CC;">SUBMIT</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');

.drawing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drawing-canvas {
  border: 10px solid #292929;
  cursor: url('../../static/dot_cursor.png') 16 16, auto;
  touch-action: none; /* Prevent touch gestures like scrolling */
}
.inner-box{
  display: flex;
}
button {
  margin: 3%;
  padding: 3% 5%;
  font-size: 16px;
  background-color: #292929;
  color: #f5f5f5;
  cursor: pointer;
  font-family: "Lexend Deca", serif;
  font-optical-sizing: auto;
  border: none;
  border-radius: 5px; /* Rounded corners */
  transition: all 0.2s ease-in-out; /* Smooth transition */
}

/* Hover Effect */
button:hover {
  background-color: #3a3a3a; /* Slightly lighter */
  transform: scale(1.05); /* Slightly enlarges */
}

/* Press Animation */
button:active {
  transform: scale(0.95); /* Shrinks slightly */
  background-color: #1f1f1f; /* Darkens on press */
}

</style>
