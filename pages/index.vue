<script setup>
import Canva from '~/components/general/Canva.vue';
import Colors from '~/components/general/Colors.vue';
import BrushResize from '~/components/general/BrushResize.vue'
import { useSliderStore } from '~/store/sliderStore';

const store = useSliderStore();
</script>

<template>
    <div class="theme">Todays Prompt</div>
    <div class="prompt">"A guy attempts to smuggle cocaine into Amsterdam in/under his hair"</div>
    <hr>
    <div class="inner">
        <Canva />
        <div>
            <Colors />
            <BrushResize />
            {{ store.sliderValue }}
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');

.inner {
    display: flex;
    justify-content: center;
    /* Horizontally center the children */

}

.theme {
    margin-top: 5%;
    margin-bottom: 1%;
    text-align: center;
    color: #292929;
    ;
    cursor: pointer;
    font-family: "Lexend Deca", serif;
    font-optical-sizing: auto;
    font-weight: bold;
}

.prompt {
    margin-top: 1%;
    margin-bottom: -1%;
    text-align: center;
    color: #292929;
    cursor: pointer;
    font-family: "Lexend Deca", serif;
    font-weight: bold;
    font-size: 3vw;
}

hr {
    border: none;
    /* Remove the default border */
    height: 3px;
    /* Set the thickness of the line */
    background: linear-gradient(to right, #000, #292929);
    /* Gradient effect from pink to orange */
    width: 80%;
    /* Line width */
    margin: 40px auto;
    /* Center the line and add some vertical space */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Subtle shadow below the line */
    border-radius: 10px;
    /* Rounded corners for the line */
}
</style>