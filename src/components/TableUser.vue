<template>
  <div class="tableUser container">
    <section v-if="users">
      <!-- <h3 class="text-center">Usuarios registrados en el sistema</h3> -->
      <div class="d-flex justify-content-center">
        <h4 class="text-center">Usuarios registrados</h4>
      </div>
      <div v-if="users.length > 0">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>
                <button class="btn btn-warning mx-2" @click="preUpdateUser(user.id)" data-bs-toggle="modal"
                  data-bs-target="#updateModal">
                  Actualizar
                </button>
                <button class="btn btn-danger mx-2" @click="delUser(user.id)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-center text-danger">No existen usuarios registrados</p>
      </div>
    </section>
    <section v-else class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Los Usuarios se estan cargando...</span>
      </div>
    </section>
    <!-- modal actualizar -->
    <div class="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="updateModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="updateModalLabel">Editar usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- agregar nuevos productos -->
            <form @submit.prevent="updateUser">
              <div class="py-2">
                <label for="" class="form-label">ID:</label>
                <input type="text" class="form-control" name="id" v-model="editUser.id" disabled>
              </div>
              <div class="py-2">
                <label for="" class="form-label">Nombre:</label>
                <input type="text" class="form-control" name="nombre" v-model="editUser.name">
              </div>
              <div class="py-2">
                <label for="" class="form-label">Apellido:</label>
                <input type="text" class="form-control" name="apellido" v-model="editUser.lastName">
              </div>
              <div class="py-2">
                <label for="" class="form-label">Email:</label>
                <input type="text" class="form-control" name="email" v-model="editUser.email">
              </div>
              <div class="py-2">
                <label for="" class="form-label">Teléfono:</label>
                <input type="text" class="form-control" name="telefono" v-model="editUser.phone">
              </div>
              <div class="py-2">
                <input type="submit" value="Actualizar usuario" class="btn btn-success" data-bs-dismiss="modal">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import {
  getFirestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import firebaseApp from '../firebaseConfig.js'

import { mapActions } from 'vuex'

export default {
  name: 'TableUser',
  props: {
    users: Array
  },
  data() {
    return {
      updateModal: "",
      editUser: {
        id: "",
        name: "",
        lastName: "",
        email: "",
        phone: ""
      }
    }
  },
  methods: {
    ...mapActions(["delUser"]),
    preUpdateUser(userID) {
      let { id, name, lastName, email, phone } = this.users.find(user => user.id == userID);
      this.editUser = { id, name, lastName, email, phone };
    },
    async updateUser() {
      try {
        let db = getFirestore(firebaseApp);
        let userRef = doc(db, 'users', this.editUser.id);
        await updateDoc(userRef, {
          name: this.editUser.name,
          lastName: this.editUser.lastName,
          email: this.editUser.email,
          phone: this.editUser.phone
        });
        alert("Usuario editado correctamente");
        this.editUser = {
          id: "",
          name: "",
          lastName: "",
          email: "",
          phone: ""
        }
        this.updateModal.hide();
      } catch (error) {
        console.log(error);
      }
    },
    async mounted() {
      this.updateModal = new window.bootstrap.Modal('#updateModal');
    },
    // async delUser(idUser, name) {
    //   try {
    //     let confirmation = confirm("Está seguro que desea eliminar el usuario: " + name + "?");
    //     if (!confirmation) {
    //       return
    //     }
    //     let db = getFirestore(firebaseApp);
    //     const usersRef = doc(db, "users", idUser);

    //     //ELIMINACIÓN DEL PRODUCTO DESDE FIRESTORE
    //     await deleteDoc(usersRef);

    //     // this.getsProducts();

    //   } catch (error) {
    //     console.log("Error al intentar eliminar el producto.")
    //   }
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>