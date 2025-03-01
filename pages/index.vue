<script setup>
import { ref } from "vue";
import Canva from "~/components/general/Canva.vue";

const Container = [
    "background-color: #FF5733", "background-color:#C70039", "background-color:#900C3F", "background-color:#581845",
    "background-color:#FFC300", "background-color:#FF5733", "background-color:#C70039", "background-color:#900C3F",
    "background-color:#DAF7A6", "background-color:#FFC300", "background-color:#FF5733", "background-color:#C70039",
    "background-color:#33FF57", "background-color:#DAF7A6", "background-color:#FFC300", "background-color:#FF5733"
];


const sliderValue = ref(50); // Default position (centered)
const isDragging = ref(false); // Track if the user is dragging the thumb

// Start dragging
const startDrag = (e) => {
    isDragging.value = true;
    updateSliderPosition(e);
};

// Stop dragging
const stopDrag = () => {
    isDragging.value = false;
};

// Update slider position based on mouse/touch movement
const updateSliderPosition = (e) => {
    if (!isDragging.value) return;

    const slider = e.target.closest('.relative');
    const rect = slider.getBoundingClientRect();
    const offsetY = e.clientY - rect.top; // Get the Y-coordinate of the mouse inside the slider

    // Update slider value based on the Y-coordinate
    sliderValue.value = Math.min(100, Math.max(0, (offsetY / rect.height) * 100));
};

// Bind events
const handleMouseMove = (e) => {
    updateSliderPosition(e);
};

const sliderval = ref(5);
</script>

<template>

    <body class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-[600px] bg-white shadow-lg p-6 text-center rounded-lg">
            <!-- Title Section -->
            <h2 class="font-bold text-lg">Today's Prompt</h2>
            <p class="text-xl font-semibold">“Today's Prompt”</p>

            <!-- Canva Component -->
            <div class="flex item-center justify-center">
            <Canva/>
            </div>
            <!-- Main Content Section -->
            <div class="flex mt-6 gap-6 items-center justify-center">
                <!-- Grid Section -->
                <div class="grid grid-cols-4 grid-rows-4 p-1 gap-1 w-60 h-60 border-4 border-black rounded-lg">
                    <div v-for="(value, index) in Container" :key="index"
                        class="w-full h-full border-4 border-black rounded-md" :style="value">
                    </div>
                </div>
                <div>
                    slider
                </div>
                <div class="flex flex-col gap-30">
                    <button class="p-3 text-[16px] bg-[#292929] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        CLEAR
                    </button>
                    <button class="p-3 text-[16px] bg-[#292929] text-[#f5f5f5] cursor-pointer font-bold text-lg rounded-md transition-all duration-200 ease-in-out hover:bg-[#3a3a3a] hover:scale-[1.05] active:scale-[0.95] active:bg-[#1f1f1f]">
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    </body>
</template>
