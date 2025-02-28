<script setup>
import Canva from '~/components/general/Canva.vue';
import Colors from '~/components/general/Colors.vue';

</script>

<template>
    <div class="theme">Todays Prompt</div>
    <div class="prompt">"A guy attempts to smuggle cocaine into Amsterdam in/under his hair"</div>
    <hr>
    <div class="inner">
        <Canva />
        <div>
            <Colors />
            <div>
                <input type="range" min="0" max="100"  class="slider" id="mySlider">
            </div>
        </div>
        
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
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
.inner-container {
    display: flex;
    align-items: center;
}

.color-container {
    width: 75px;
    height: 75px;
    margin: 5px;
    background-color: black;
}

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