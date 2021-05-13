<template>
    <div>
        <b-container>
            <numberPuzzle></numberPuzzle>
        </b-container>
    </div>
</template>

<script>
    import numberPuzzle from "./numberPuzzle";
    import auth from "../core/Auth";

    export default {
        name: "Game",
        components: {
            numberPuzzle
        },
        beforeCreate() {
            if (!auth.checkRole(["user"])) {
                this.$router.push("/").catch(e => console.log(e));
                ;
            }
        }

    }

</script>

<style scoped>

</style>