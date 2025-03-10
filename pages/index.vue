<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

definePageMeta({
  layout: false, // This disables the layout for this page
});

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
    "#264653", "#2A9D8F", "#33FF57", "#52B788",
    "#577590", "#6A0572", "#83C5BE", "#8AB17D",
    "#C77DFF", "#E76F51", "#E9C46A", "#EF476F",
    "#F4A261", "#F8B195", "#FF6700", "#FFB5A7"
];
</script>

<template>
<nav class="bg-[#292929] text-white p-4 shadow-[10px_10px_20px_rgba(0,0,0,0.3)]">
  <div class="flex justify-center items-center">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <svg fill="#f5f5f5" height="40" width="40" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-26.04 -26.04 312.51 312.51" xml:space="preserve" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#f5f5f5" stroke-width="0.00260431"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><path transform="translate(-26.04, -26.04), scale(19.531875)" fill="#000000" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokewidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.5208619999999999"></g><g id="SVGRepo_iconCarrier"> <path d="M256.585,93.257L167.181,3.853c-5.128-5.128-13.443-5.128-18.571,0l-21.415,21.415c-5.086,5.086-5.121,13.303-0.118,18.44 L91.623,58.914L51.738,76.02L0.637,228.358c-0.37,1.102-0.575,2.232-0.625,3.359c-0.037,0.845,0.013,1.689,0.149,2.517 c0.271,1.657,0.88,3.253,1.803,4.681c0.154,0.238,0.316,0.471,0.488,0.7c0.342,0.456,0.719,0.892,1.129,1.304 c0.104,0.104,0.216,0.195,0.334,0.273c0.041,0.027,0.086,0.044,0.128,0.068c0.08,0.045,0.159,0.094,0.242,0.128 c0.051,0.021,0.106,0.031,0.158,0.048c0.078,0.025,0.156,0.055,0.236,0.07c0.06,0.012,0.121,0.142,0.181,0.148 c0.075,0.008,0.15,0.152,0.226,0.152c0.002,0,0.004,0,0.006,0c0.076,0,0.151-0.143,0.226-0.151c0.057-0.006,0.115-0.07,0.172-0.081 c0.078-0.015,0.154-0.076,0.23-0.1c0.054-0.017,0.109-0.043,0.162-0.064c0.085-0.034,0.164-0.09,0.245-0.136 c0.041-0.023,0.134-0.043,0.174-0.069c0.117-0.077-0.618-0.169,0.382-0.273v-0.001l75.584-75.636 c0.109-0.109,0.182-0.224,0.271-0.345c0.356-0.485,0.539-1.06,0.563-1.648c0.012-0.294-0.026-0.591-0.103-0.882 c-0.038-0.145-0.091-0.289-0.152-0.43c-1.812-4.187-2.653-8.699-2.513-13.182c0.002-0.051,0.008-0.101,0.009-0.151 c0.048-1.338,0.188-2.672,0.411-3.995c0.179-1.062,0.421-2.114,0.712-3.156c1.359-4.857,3.926-9.442,7.741-13.258 c0.066-0.066,0.136-0.127,0.203-0.193c0.306-0.3,0.613-0.598,0.928-0.883c0.132-0.119,0.269-0.229,0.402-0.345 c0.255-0.223,0.509-0.448,0.77-0.66c0.152-0.124,0.309-0.238,0.463-0.359c0.248-0.195,0.495-0.393,0.748-0.578 c0.157-0.115,0.318-0.221,0.477-0.332c0.255-0.18,0.509-0.363,0.768-0.534c0.166-0.11,0.337-0.21,0.505-0.316 c0.257-0.162,0.513-0.329,0.774-0.482c0.162-0.096,0.328-0.182,0.491-0.274c0.272-0.154,0.542-0.31,0.818-0.455 c0.162-0.085,0.328-0.161,0.492-0.244c0.28-0.141,0.559-0.284,0.842-0.415c0.175-0.081,0.352-0.153,0.528-0.23 c0.276-0.122,0.551-0.246,0.83-0.359c0.182-0.074,0.367-0.138,0.551-0.208c0.277-0.106,0.552-0.215,0.831-0.313 c0.189-0.066,0.381-0.123,0.572-0.185c0.275-0.09,0.549-0.183,0.826-0.265c0.202-0.06,0.406-0.11,0.609-0.165 c0.269-0.073,0.536-0.151,0.806-0.217c0.209-0.051,0.42-0.092,0.63-0.139c0.266-0.059,0.532-0.122,0.799-0.174 c0.216-0.042,0.434-0.074,0.651-0.111c0.263-0.045,0.526-0.094,0.79-0.133c0.222-0.032,0.445-0.055,0.667-0.082 c0.26-0.032,0.52-0.068,0.781-0.093c0.227-0.022,0.454-0.034,0.681-0.051c0.258-0.019,0.515-0.042,0.772-0.055 c0.23-0.011,0.461-0.013,0.692-0.019c0.255-0.007,0.511-0.018,0.766-0.018c0.245,0,0.49,0.009,0.735,0.014 c0.239,0.005,0.477,0.006,0.715,0.017c0.247,0.011,0.494,0.032,0.74,0.05c0.236,0.016,0.472,0.028,0.707,0.05 c0.25,0.023,0.498,0.056,0.747,0.086c0.232,0.027,0.465,0.05,0.696,0.082c0.252,0.035,0.503,0.081,0.755,0.123 c0.227,0.037,0.454,0.07,0.68,0.113c0.26,0.049,0.518,0.109,0.776,0.164c0.216,0.046,0.432,0.088,0.647,0.139 c0.266,0.063,0.529,0.137,0.793,0.208c0.206,0.055,0.413,0.104,0.619,0.164c0.268,0.078,0.534,0.166,0.801,0.251 c0.199,0.063,0.398,0.121,0.596,0.188c0.273,0.093,0.542,0.198,0.813,0.299c0.188,0.07,0.378,0.135,0.565,0.209 c0.275,0.109,0.547,0.23,0.82,0.347c0.179,0.077,0.36,0.148,0.538,0.229c0.268,0.121,0.532,0.254,0.797,0.383 c0.179,0.088,0.361,0.169,0.539,0.261c0.264,0.135,0.523,0.282,0.784,0.425c0.175,0.096,0.351,0.186,0.525,0.286 c0.266,0.153,0.526,0.318,0.788,0.479c0.163,0.101,0.329,0.196,0.491,0.3c0.259,0.167,0.512,0.345,0.767,0.52 c0.16,0.11,0.323,0.214,0.481,0.327c0.241,0.172,0.475,0.356,0.712,0.536c0.167,0.127,0.338,0.248,0.503,0.38 c0.223,0.177,0.44,0.366,0.66,0.551c0.172,0.145,0.348,0.283,0.517,0.432c0.281,0.247,0.555,0.506,0.829,0.765 c0.102,0.096,0.207,0.186,0.308,0.284c1.811,1.866,3.339,3.909,4.583,6.072c0.249,0.433,0.486,0.87,0.712,1.312 c1.583,3.092,2.608,6.399,3.074,9.768c0.2,1.444,0.297,2.899,0.292,4.353c-0.004,0.97-0.053,1.939-0.148,2.905 c-0.048,0.483-0.107,0.965-0.177,1.445c-0.128,0.874-0.299,1.743-0.503,2.605c-0.287,1.213-0.652,2.41-1.089,3.586 c-0.277,0.745-0.576,1.484-0.913,2.211c-0.283,0.608-0.594,1.205-0.919,1.797c-1.35,2.459-3.057,4.773-5.14,6.855 c-0.001,0.001-0.001,0.001-0.001,0.001c-0.517,0.517-1.052,1.002-1.594,1.473c-0.124,0.108-0.248,0.215-0.374,0.321 c-0.539,0.453-1.088,0.888-1.65,1.297c-0.077,0.056-0.157,0.108-0.235,0.163c-0.514,0.367-1.038,0.713-1.568,1.044 c-0.125,0.078-0.248,0.157-0.374,0.233c-0.585,0.352-1.178,0.684-1.78,0.993c-0.121,0.062-0.243,0.119-0.365,0.18 c-0.544,0.27-1.095,0.524-1.651,0.76c-0.105,0.044-0.208,0.093-0.313,0.136c-0.623,0.256-1.253,0.487-1.889,0.699 c-0.145,0.049-0.291,0.094-0.437,0.14c-0.612,0.194-1.228,0.374-1.848,0.529c-0.046,0.012-0.092,0.026-0.138,0.037 c-0.657,0.161-1.319,0.292-1.983,0.409c-0.153,0.027-0.307,0.053-0.46,0.077c-0.664,0.106-1.33,0.196-1.999,0.258 c-0.06,0.006-0.119,0.008-0.179,0.013c-0.627,0.055-1.255,0.086-1.884,0.102c-0.147,0.004-0.294,0.009-0.441,0.01 c-0.686,0.008-1.373-0.003-2.058-0.041c-0.079-0.004-0.158-0.014-0.236-0.019c-0.605-0.038-1.209-0.097-1.812-0.171 c-0.194-0.024-0.388-0.051-0.582-0.078c-0.55-0.078-1.099-0.171-1.645-0.279c-0.136-0.027-0.273-0.049-0.409-0.077 c-0.665-0.141-1.327-0.305-1.983-0.491c-0.158-0.045-0.314-0.096-0.471-0.143c-0.518-0.155-1.032-0.324-1.543-0.507 c-0.183-0.066-0.367-0.131-0.549-0.2c-0.646-0.245-1.287-0.505-1.919-0.796c-0.18-0.083-0.366-0.14-0.554-0.185 c-0.052-0.013-0.103-0.022-0.156-0.032c-0.154-0.029-0.309-0.045-0.464-0.05c-0.028-0.001-0.055-0.009-0.083-0.009 c-0.011,0-0.022,0.003-0.032,0.003c-0.175,0.002-0.349,0.018-0.521,0.051c-0.037,0.007-0.072,0.019-0.109,0.028 c-0.135,0.031-0.268,0.07-0.398,0.119c-0.054,0.02-0.105,0.044-0.158,0.067c-0.115,0.052-0.227,0.111-0.336,0.178 c-0.046,0.028-0.093,0.054-0.138,0.085c-0.148,0.102-0.29,0.213-0.42,0.344L18.7,253.047c-0.31,0.31-0.503,0.692-0.581,1.091 c-0.026,0.133-0.039,0.269-0.039,0.404c0,0.406,0.116,0.812,0.348,1.163c0.077,0.117,0.168,0.229,0.271,0.332l0.794,0.794 c0.261,0.261,0.535,0.503,0.815,0.737c0.077,0.064,0.155,0.126,0.233,0.188c0.234,0.186,0.474,0.363,0.72,0.531 c0.058,0.039,0.113,0.081,0.172,0.12c0.299,0.196,0.605,0.377,0.918,0.546c0.075,0.04,0.151,0.077,0.227,0.115 c0.255,0.13,0.513,0.252,0.776,0.364c0.084,0.036,0.168,0.073,0.253,0.107c0.328,0.132,0.661,0.252,0.999,0.354 c0.046,0.014,0.093,0.024,0.14,0.038c0.298,0.087,0.6,0.161,0.904,0.224c0.095,0.02,0.191,0.039,0.287,0.057 c0.311,0.058,0.624,0.105,0.938,0.138c0.042,0.004,0.083,0.012,0.124,0.016c0.352,0.034,0.706,0.049,1.061,0.052 c0.037,0,0.073,0.005,0.11,0.005c0.074,0,0.149-0.008,0.224-0.009c0.193-0.004,0.385-0.011,0.578-0.023 c0.122-0.008,0.243-0.018,0.365-0.029c0.193-0.018,0.385-0.043,0.577-0.07c0.118-0.017,0.236-0.033,0.354-0.054 c0.206-0.036,0.411-0.08,0.616-0.127c0.102-0.023,0.203-0.042,0.305-0.068c0.301-0.076,0.601-0.163,0.898-0.263 c0.003-0.001,0.007-0.002,0.01-0.003l113.62-38.402l38.402-12.979l32.308-75.33l0.176,0.176c5.128,5.128,13.443,5.128,18.571,0 l21.415-21.415C261.713,106.7,261.713,98.385,256.585,93.257z"></path> </g></svg>
      <NuxtLink to="/" class="text-xl font-bold">InkFetch</NuxtLink>
    </div>
  </div>
</nav>

  
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
