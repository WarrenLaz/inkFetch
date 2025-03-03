<script setup>
const startfill = ref(["#FAF9F6","#FAF9F6","#FAF9F6","#FAF9F6"]);
const isClick = ref(0);
const onHover = (index)=>{
    for(let i = 0; i < index; i++){
        startfill.value[i] = "#292929";
    }
    for(let j = index; j < startfill.value.length; j++){
        startfill.value[j] = "#FAF9F6";
    }
}
const onLeave = (index)=>{
    if(isClick.value===0){
        for(let i = 0; i < index; i++){
            startfill.value[i] = "#FAF9F6";
        }
    }
}
const Click = (index)=>{
    isClick.value=1;
    for(let i = 0; i < index; i++){
        startfill.value[i] = "#292929";
    }

    for(let j = index; j < startfill.value.length; j++){
        startfill.value[j] = "#FAF9F6";
    }
}
</script>
<template>
    <div class="flex items-center justify-center mt-15">
        <div class="items-center w-[1/5] bg-white border-2 shadow-2xl p-6 text-center rounded-lg">
            <h2 class="font-bold text-lg mb-3">Title</h2>
            <div class="w-[400px] h-[400px]  border-[#292929] border-6 shadow-2xl p-6 text-center "></div>
            <div class="flex gap-2 mt-4 bg-[#f7f3f3] rounded-xl border-2 shadow-2xl" > 
                <button class="hover:scale-[1.05] active:scale-[0.95]" v-for="(val, index) in [0,1,2,3,4]" 
                @mouseover="onHover(val+1)" @mouseleave="onLeave(val+1)" @click="Click(val+1)">
                <Stars :fill="startfill[val]"/>
                </button> 
            </div>
        </div>
    </div>
</template>