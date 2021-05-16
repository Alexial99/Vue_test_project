<template>
    <b-container>
        <div class="containerGame">
            <div class="header"><h1>Игра "Пятнашки"</h1></div>

            <div class="game-field">
                <b-button id="generateField"
                          v-on:click="startNewGame">Новая игра
                </b-button>
                <table id="myTableGame">
                    <number-puzzle-table :key="startNew" v-if="startNew!==null"></number-puzzle-table>
                </table>

            </div>
            <canvas height="400" id="myCanvas" width="700"></canvas>
        </div>
    </b-container>
</template>

<script>
    import numberPuzzleTable from './numberPuzzleTable'

    export default {
        name: "numberPuzzle",
        data() {
            return {

                startNew: null
                /* heightBlock:Number,*/

            }
        },

        components: {
            numberPuzzleTable
        },
        methods: {

            startNewGame() {
                if (this.startNew === null) {
                    this.startNew = true;
                }
                this.startNew = !this.startNew;
            },

        }
    }
</script>

<style>
    .containerGame {
        /* width: 700px;*/
        margin: 0 auto;
        position: relative;
    }

    #myTableGame {
        vertical-align: middle;
        margin: 35px auto;
    }

    .header {
        font-family: monospace;
    }
</style>