<template>
    <b-container>
        <div class="containerGame">
            <div class="header"><h1>Игра "Пятнашки"</h1></div>

            <div class="game-field">
                <b-button id="generateField" v-on:click="createField(4)">Новая игра</b-button>
                <table id="myTable">
                </table>

            </div>
            <canvas id="myCanvas" width="700" height="400"></canvas>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: "numberPuzzle",
        data() {
            return {
                cells: [],
                dragSrcEl: "",
                canvas: Object,
                ctx: Object,
                speed: 4,
                textX: 0


                /* heightBlock:Number,*/

            }
        },
        created() {
            this.canvas = document.getElementById('myCanvas');
            this.ctx = this.canvas.getContext('2d');
        },
        methods: {
            createField(n) {
                let table = document.getElementById('myTable');
                table.classList.remove("win");
                table.innerHTML = "";
                this.cells = [];
                let row, cell;
                let counter = 0;
                let initialArr = [];
                const mainArr = [];

                for (let i = 1; i < n * n; i++) {
                    initialArr.push(i);
                    mainArr.push(i);
                }
                this.mixArr(initialArr);


                for (let i = 0; i < n; i++) {
                    row = table.insertRow(i);
                    for (let j = 0; j < n; j++) {
                        cell = row.insertCell(j);
                        cell.addEventListener('dragstart', this.handleDragStart, false);
                        if (counter < initialArr.length) {
                            cell.innerHTML = '<div class="item" draggable="true"' + ' id="' + initialArr[counter] + '">' + initialArr[counter] + '</div>';
                            let thisDiv = document.getElementById(initialArr[counter]);

                            thisDiv.addEventListener('mouseenter', function () {
                                thisDiv.classList.add('cursorTable');
                            });
                            thisDiv.addEventListener('mouseleave', function () {
                                thisDiv.classList.remove('cursorTable');
                            });


                        } else {
                            cell.addEventListener('dragover', this.handleDragOver, false);
                            cell.addEventListener('drop', this.handleDrop, false);

                        }
                        this.cells[counter] = initialArr[counter];
                        counter++;
                    }
                }
                this.cells[n * n - 1] = 'empty';
                console.log(this.cells);

            },

            mixArr(arr) {
                let randIndex;
                for (let i in arr) {
                    let x = arr[i];
                    randIndex = Math.floor(Math.random() * arr.length);
                    arr[i] = arr[randIndex];
                    arr[randIndex] = x;
                }
            },

            handleDragStart(e) {

                let _this = e.path[1];
                this.dragSrcEl = _this;
                console.log(typeof this.dragSrcEl);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', _this.innerHTML);
            },

            handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
                return false;
            },

            handleDrop(e) {

                let _this = e.path[0];
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (this.dragSrcEl !== _this) {
                    let c;
                    let x = parseInt(this.dragSrcEl.innerText);
                    let index = this.cells.indexOf(x);

                    this.cells[this.cells.indexOf('empty')] = x;
                    this.cells[index] = 'empty';
                    if (this.won(this.cells)) {
                        c = true;
                    } else {
                    }

                    this.dragSrcEl.innerHTML = _this.innerHTML;
                    console.log(typeof this.dragSrcEl);
                    this.dragSrcEl.addEventListener('dragover', this.handleDragOver, false);
                    this.dragSrcEl.addEventListener('drop', this.handleDrop, false);


                    _this.innerHTML = e.dataTransfer.getData('text/html');
                    _this.removeEventListener('dragover', this.handleDragOver, false);
                    _this.removeEventListener('drop', this.handleDrop, false);

                    if (c) {
                        setTimeout(this.animate, 1000);
                    }
                }
                let elements = document.getElementsByClassName('cursorTable');
                for (let el of elements) {
                    el.classList.remove('cursorTable');
                }
                return false;
            },

            won(arr) {
                if (arr[arr.length - 1] !== "empty") return;
                for (let i = 0; i < arr.length - 1; i++) {
                    if (i + 1 === arr[i]) {
                        continue;
                    } else {
                        return false;
                    }
                }
                return true;
            },

            animate() {
                let table = document.getElementById("myTable")
                table.innerHTML = "Победа!";
                table.classList.add("win")
            }
        }
    }
</script>

<style>
    .containerGame {
        /* width: 700px;*/
        margin: 0 auto;
        position: relative;
    }

    #myTable {
        border: 1px solid #949494;
        vertical-align: middle;
        margin: 35px auto;
    }

    .header {
        font-family: monospace;
    }

    .item {
        background: rgba(104, 104, 104, 0.49);
        color: rgba(245, 255, 242, 1);
        border: 2px solid #505050;
        font: 30px Arial, Verdana, sans-serif;
        height: 70px;
        line-height: 70px;
        width: 70px;
        text-align: center;
        cursor: pointer;
        border-radius: 8px;
    }

    td {
        border: 1px solid transparent;
    }

    td.over {
        border: 1px dashed #ccc;
    }

    table.win {
        background: #b8b8b8;
        border: none !important;
        border-radius: 8px;
        font-size: 32px;
        width: 180px;
        height: 46px;

    }

    .cursorTable {
        background: rgba(104, 104, 104, 0.69) !important;
    }


</style>