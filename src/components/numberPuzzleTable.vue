<template>
    <b-container>

        <div id="myTable">
            <table id="mobile-menu">
                <tr v-for="tr in arrOfNumbers">
                    <td ref="cells" v-for="td in tr" v-if="!empty(td)" v-on:dragstart="handleDragStart">
                        <div class="item" draggable="true" ref="item" v-bind:id="cells[td]"
                             v-on:mouseenter="cursorTableTrue"
                             v-on:mouseleave="cursorTableFalse">
                            {{cells[td]}}
                        </div>
                    </td>
                    <td ref="last-cell" v-for="td in tr" v-if="empty(td)" v-on:dragstart="handleDragStart"></td>
                </tr>
            </table>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: "numberPuzzleTable",
        data() {
            return {
                cells: [],
                dragSrcEl: "",
                ctx: Object,
                speed: 4,
                textX: 0,
                size: 4,
                cursorTableIndex: false,
                arrOfNumbers: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]],
                dataTrans: ""

            }
        },
        mounted() {
            let table = document.getElementById('myTable');
            table.classList.remove("win");
            let lastCell = this.$refs["last-cell"];
            if (lastCell && this.cells && this.empty(15)) {
                lastCell[0].addEventListener("dragover", this.handleDragOver, false);
                lastCell[0].addEventListener("drop", this.handleDrop, false);
            }

            let cells = this.$refs["cells"];
            for (let cell of cells)
                cell.addEventListener('click', this.handleMove, false);
        },


        created() {
            this.cells = [];
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

            let randIndex;
            for (let i in arr) {
                let x = arr[i];
                randIndex = Math.floor(Math.random() * arr.length);
                arr[i] = arr[randIndex];
                arr[randIndex] = x;
            }
            arr.push('empty');
            this.cells = arr;
        },

        methods: {

            empty(x) {
                return this.cells[x] === "empty";
            },
            cursorTableTrue(e) {
                e.target.classList.add("cursorTable");
            },
            cursorTableFalse(e) {
                e.target.classList.remove("cursorTable");
            },

            handleDragStart(e) {
                let _this = e.path[1];
                this.dragSrcEl = _this;
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
            handleMove(e) {
                let _this = e.target.parentElement;
                if (!_this)
                    return false;
                if (!e.target || e.target.tagName === 'TD' || e.target.tagName === "TR")
                    return false;

                e.target.classList.remove('cursorTable');
                let dataTrans = _this.innerHTML;

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                let x = parseInt(_this.innerText);
                let index = this.cells.indexOf(x);
                let empty = this.cells.indexOf('empty');


                if (!(index === empty + 1 || index === empty - 1 || index === empty + 4 || index === empty - 4)) return false;

                let c;

                this.cells[this.cells.indexOf('empty')] = x;
                this.cells[index] = 'empty';
                if (this.won(this.cells)) {
                    c = true;
                }

                _this.innerHTML = "";// _this.innerHTML;
                _this.removeEventListener('click', this.handleMove);
                _this.addEventListener('dragover', this.handleDragOver, false);
                _this.addEventListener('drop', this.handleDrop, false);

                let table = document.getElementById("myTable");
                let tds = table.querySelectorAll('td');
                tds[empty].innerHTML = dataTrans;

                tds[empty].removeEventListener('dragover', this.handleDragOver, false);
                tds[empty].removeEventListener('drop', this.handleDrop, false);
                tds[empty].addEventListener('click', this.handleMove, false);

                let thisDiv = tds[empty].getElementsByClassName('item')[0];
                if (thisDiv) {
                    thisDiv.addEventListener('mouseenter', this.cursorTableTrue);
                    thisDiv.addEventListener('mouseleave', this.cursorTableFalse);
                }

                if (c) {
                    setTimeout(this.animate, 400);
                }

                return false;

            },
            handleDrop(e) {

                let _this = e.path[0];

                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                let x = parseInt(this.dragSrcEl.innerText);
                let index = this.cells.indexOf(x);
                let empty = this.cells.indexOf('empty');


                if (!(index === empty + 1 || index === empty - 1 || index === empty + 4 || index === empty - 4)) return false;

                if (this.dragSrcEl !== _this) {
                    let c;


                    this.cells[this.cells.indexOf('empty')] = x;
                    this.cells[index] = 'empty';
                    if (this.won(this.cells)) {
                        c = true;
                    }


                    this.dragSrcEl.innerHTML = _this.innerHTML;


                    this.dragSrcEl.addEventListener('dragover', this.handleDragOver, false);
                    this.dragSrcEl.addEventListener('drop', this.handleDrop, false);
                    this.dragSrcEl.removeEventListener('click', this.handleMove);
                    _this.innerHTML = e.dataTransfer.getData('text/html');

                    _this.removeEventListener('dragover', this.handleDragOver, false);
                    _this.removeEventListener('drop', this.handleDrop, false);
                    _this.addEventListener('click', this.handleMove, false);


                    let thisDiv = _this.getElementsByClassName('item')[0];
                    if (thisDiv) {
                        thisDiv.addEventListener('mouseenter', this.cursorTableTrue);
                        thisDiv.addEventListener('mouseleave', this.cursorTableFalse);
                    }

                    if (c) {
                        setTimeout(this.animate, 400);
                    }
                }

                return false;
            },

            won(arr) {
                if (arr[arr.length - 1] !== "empty") return;
                for (let i = 0; i < arr.length - 1; i++) {
                    if (i + 1 === arr[i]) {

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
        font: 28px Arial, Verdana, sans-serif;
        height: 60px;
        line-height: 60px;
        width: 60px;
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

    table .win {
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

    #mobile-menu {
        cursor: pointer;
    }

</style>