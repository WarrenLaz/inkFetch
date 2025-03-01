<script setup>
import Canva from '~/components/general/Canva.vue';
const Container = [
    ["#FF5733", "#C70039", "#900C3F", "#581845"],
    ["#FFC300", "#FF5733", "#C70039", "#900C3F"],
    ["#DAF7A6", "#FFC300", "#FF5733", "#C70039"],
    ["#33FF57", "#DAF7A6", "#FFC300", "#FF5733"]
]

const sliderval = ref(5);
</script>

<template>

    <div class="mt-5 mb-1 text-center text-[#292929] font-[Lexend Deca, serif]">Todays Prompt</div>
    <div class="text-center text-[#292929] text-3xl">"Theme"</div>
    <hr class="h-[3px] w-[80%] m-[40px] rounded-[10px]">
    <div class="flex content-center">
        <Canva :brushsize="sliderval"/>
        <div>
        </div>
            <div>
                <input type="range" min="0" max="10" v-model="sliderval" class="slider" id="mySlider">
            </div>
            <h1>{{sliderval}}</h1>
        </div>
        <div>
                <div v-for="(value, index) in Container" :key="index" class="flex items-center">
                    <button v-for="(value_, in_) in value" :key="in_" class="w-[75px] h-[75px] m-[5px]" :style="{ backgroundColor: value_ }"/>

            </div>
    </div>
</template>
