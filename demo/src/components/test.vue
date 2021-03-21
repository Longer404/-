<template v-slot:testslot>
    <div class="father" @click="fatherbutton">
        <div class="firstson" @mouseleave="afterchange" @mouseover="sthchange" @click="firstbutton" :style="changeColor(flag)">
        </div>
        <div class="secondson" @click="secondbutton" >
        </div>
        <div class="thirdson" @click="thirdbutton">
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const flag = ref(false)
        const fatherbutton = () => {
            console.log(0)
        }
        const firstbutton = () => {
            console.log(1)
            
        }
        const secondbutton = () => {
            console.log(2)
        }
        const thirdbutton = () => {
            console.log(3)
        }
        const afterchange = () => {
            flag.value = false
        }
        const sthchange = () => {
            flag.value = true
        }
        const changeColor = (flag) => {
            if (flag) {
                return {
                    backgroundColor : 'green',
                    cursor: 'pointer',
                }
                
            } else {
                return {
                    backgroundColor : 'red',
                    cursor: 'default',
                }
            }
        }
        return {
            flag,
            sthchange,
            afterchange,
            changeColor,
            firstbutton,
            secondbutton,
            thirdbutton,
            fatherbutton
        }
    },
}
</script>

<style>
.father {
    width: 200px;
    height: 200px;
    background: #555;
}
.firstson {
    width: 50px;
    height: 50px;
    background: rgb(252, 3, 3);
}
.secondson {
    width: 50px;
    height: 50px;
    background: rgb(3, 252, 45);
}

.thirdson {
    width: 50px;
    height: 50px;
    background: rgb(49, 3, 252);
}

</style>