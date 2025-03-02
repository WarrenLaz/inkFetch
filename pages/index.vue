<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Get the position for both mouse and touch events
// Reference to the canvas element
const canvasRef = ref(null);
const isDrawing = ref(false);
const context = ref(null);
const color = ref("black");
const slideval = ref(50);

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

const changeColor = (color_) => {
    color.value = color_
    context.value.strokeStyle = color_; 
}


// Initialize canvas context on mount
onMounted(() => {
  const canvas = canvasRef.value;
  context.value = canvas.getContext("2d");
  context.value.lineWidth = slideval;
  context.value.lineCap = "round";
  context.value.strokeStyle = color; // Default stroke color
});

// Cleanup on unmount
onBeforeUnmount(() => {
  isDrawing.value = false;
});

const appendColor = (color_) => {
    return "background-color:" + String(color_)
}

watch(slideval, (newVal, oldVal) => {
    context.value.lineWidth = newVal;
});

const Container = [
    "#FF5733", "#C70039", "#900C3F", "#581845",
    "#FFC300", "#FF5733", "#C70039", "#900C3F",
    "#DAF7A6", "#FFC300", "#FF5733", "#C70039",
    "#33FF57", "#DAF7A6", "#FFC300", "#FF5733"
];


</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-[1/5]  bg-white border-2 shadow-2xl p-6 text-center rounded-lg">
            <!-- Title Section -->
            <h2 class="font-bold text-lg">Today's Prompt</h2>
            <p class="text-xl font-semibold mb-2">“Today's Prompt”</p>

            <!-- Canva Component -->
            <div class="flex items-center justify-center">
                <canvas
                    ref="canvasRef"
                    width="400"
                    height="400"
                    class="border-[10px] border-[#292929] cursor-default touch-none"
                    @mousedown="startDrawing"
                    @mousemove="draw"
                    @mouseup="stopDrawing"
                    @mouseleave="stopDrawing"
                    @touchstart="startDrawing"
                    @touchmove="draw"
                    @touchend="stopDrawing"
                ></canvas>
            </div>

            <!-- Main Content Section -->
            <div class="flex flex-row mt-6 gap-6 items-center justify-center">
                <!-- Grid Section -->
                <div class="grid grid-cols-4 grid-rows-4 p-1 gap-1  w-60 h-60 border-4 border-black rounded-lg">
                    <button @click="changeColor(value)" v-for="(value, index) in Container" :key="index"
                        class="
                        w-full h-full border-4 border-black rounded-md
                        hover:scale-[1.05] active:scale-[0.95]
                        " :style="appendColor(value)">
                    </button>
                </div>

                <div class="flex flex-col items-center">
                    <input 
                        type="range" 
                        orient="vertical"
                        min="0" 
                        max="100" 
                        v-model="slideval"
                        class="w-[2px] h-50 mt-4"
                        style="writing-mode: vertical-lr; direction: rtl; appearance: slider-vertical;"
                    />

                    <div class="w-5">
                    <span class="mt-3 text-lg font-semibold text-gray-700 ">
                    {{ slideval }}
                    </span>
                    </div>
                </div>

                <div class="flex flex-col gap-6 sm:gap-8 md:gap-30">
                    <button @click="clearCanvas" class="p-3 text-[16px] bg-[#292929] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        CLEAR
                    </button>
                    <button class="p-3 text-[16px] bg-[#4776ed] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scope>

</style>
