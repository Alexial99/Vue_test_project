<template>
    <b-container>
        <div>
            <H1>profile</H1>
            <b-table responsive striped hover :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
        </div>
    </b-container>
</template>

<script>
    import auth from "../core/Auth";

    export default {
        name: "Profile",
        data() {
            return {
                fields: ['key', 'value'],
                items: []
            }
        },
        created() {
            let _auth = auth.getLogs();
            for(let x=0;x<_auth.length;x++){
                for (let y in _auth[x]) {
                    this.items.push({key: y, value: _auth[x][y]});
                }
            }
        },
        methods: {
            rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.status === 'awesome') return 'table-success'
            },

        }

    }


</script>

<style scoped>
    H1 {
        font-family: monospace;
    }
</style>