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
            let _auth = auth.getActiveProfile();
            console.log(_auth);
            for (let a in _auth) {
                this.items.push({key: a, value: _auth[a]});
                console.log(a);
            }
        },
        methods: {
            rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.status === 'awesome') return 'table-success'
            }
        }

    }


</script>

<style scoped>
    H1 {
        font-family: monospace;
    }
</style>