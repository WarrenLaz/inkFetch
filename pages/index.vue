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
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const changeColor = (color_) => {
    color.value = color_
    context.value.strokeStyle = color_; 
}


// Initialize canvas context on mount
onMounted(() => {
  const canvas = canvasRef.value;
  context.value = canvas.getContext("2d");
  context.value.lineWidth = slideval.value;
  context.value.lineCap = "round";
  context.value.strokeStyle = color; // Default stroke color
  // Draw filled rectangle (x, y, width, height)
  const ctx = context.value;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
                <div class="grid grid-cols-4 grid-rows-4 p-1 gap-1  w-60 h-60 border-4 border-black bg-[#E0E0E0] rounded-lg">
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

                <div class="flex flex-col gap-1 sm:gap-2 md:gap-7">
                    <button @click="clearCanvas" class="p-3 text-[16px] bg-[#292929] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        CLEAR
                    </button>
                    <button @click="changeColor('white')" class="p-3 text-[16px] bg-[#E0E0E0] border-3 border-[#292929] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#969595] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 446.201"><g fill-rule="nonzero"> <path d="M121.683 218.8c-2.858-2.857-2.629-7.723.512-10.864 3.14-3.141 8.007-3.37 10.864-.512l174.464 174.467c2.857 2.857 2.628 7.724-.513 10.865-3.141 3.14-8.007 3.369-10.864.512L121.683 218.8z"/><path d="M304.071 407.141l-179.668 38.621c-7.248 1.536-14.411-1.059-19.04-6.192l-83.521-83.944c-30.268-30.425-28.351-42.165 1.249-71.674L297.755 10.135c12.341-14.197 37.43-13.072 49.401.83l151.95 152.417c16.511 16.57 17.726 36.066.38 53.365L314.024 401.733a19.918 19.918 0 01-9.958 5.387l.005.021z"/><path fill="#E3504D" d="M299.918 387.549l-179.669 38.622-95.182-95.668c-5.677-5.677-5.677-14.598 0-20.274l287.08-286.195c5.185-5.86 14.445-5.353 19.791 0l155.611 156.092c5.679 5.68 5.676 14.591 0 20.274L299.918 387.549z"/><path fill="#AF413F" d="M309.168 378.299l-22.609-20.198 186.884-192.123 14.106 14.148c5.16 5.396 6.421 11.826 0 20.274L309.168 378.299z"/><path d="M475.163 446.111c-5.544 0-10.041-4.941-10.041-11.034 0-6.094 4.497-11.034 10.041-11.034h18.919c5.544 0 10.04 4.94 10.04 11.034 0 6.093-4.496 11.034-10.04 11.034h-18.919zm-173.12-38.535l-76.601 16.467h217.962c5.545 0 10.041 4.94 10.041 11.034 0 6.093-4.496 11.034-10.041 11.034h-321.28c-6.447.614-12.619-1.948-16.761-6.541l-89.724-90.179c-20.295-20.398-20.555-37.615.185-58.164l92.631-91.796c7.78-7.738 20.331-7.753 28.133-.077l177.357 173.933c7.877 7.746 7.981 20.413.235 28.29-3.734 3.794-7.341 4.969-12.137 5.999z"/><path fill="#E4E5E5" d="M299.918 387.549l-179.669 38.622-95.182-95.668c-5.677-5.677-5.677-14.598 0-20.274l97.496-96.614 177.355 173.934z"/></g></svg>
                    </button>
                    <button class="p-3 text-[16px] bg-[#4776ed] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#474aed] hover:scale-[1.05] active:scale-[0.95] active:bg-[#5247ed]">
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scope>

</style>
