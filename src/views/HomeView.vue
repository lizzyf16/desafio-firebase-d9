<template>
  <div class="home">
    <h1 class="text-center">Lista de Usuarios</h1>
    <FormUser />
    <hr class="py-3">
    <TableUser :users="users" />
  </div>
</template>

<script>
import FormUser from '@/components/FormUser.vue';
import TableUser from '@/components/TableUser.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    FormUser,
    TableUser
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    ...mapActions(["setUsers"])
  },
  mounted() {
    this.setUsers();
  },
}
</script>
<style>
h1 {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>
