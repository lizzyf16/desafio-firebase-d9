<template>
    <div class="formUser container">
        <div>
            <h4 class="text-center">Agregar nuevo usuario</h4>
        </div>
        <div class="modal-body">
            <form @submit.prevent="addNewUser">
                <div class="row-cols-2 d-flex py-2 mx-3">
                    <div class="col px-1">
                        <label for="" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="inputName" name="nombre" v-model="formUser.name"
                            required>
                    </div>
                    <div class="col px-1">
                        <label for="" class="form-label">Apellido:</label>
                        <input type="text" class="form-control" name="apellido" v-model="formUser.lastName"
                            id="inputLastname" required>
                    </div>
                </div>
        
        <div class="mx-3">
            <div class="px-1 py-2">
                <label for="" class="form-label">Email:</label>
                <input type="email" class="form-control" name="email" v-model="formUser.email" id="inputEmail" required>
            </div>
            <div class="px-1 py-2">
                <label for="" class="form-label">Teléfono:</label>
                <input type="number" class="form-control" name="telefono" v-model="formUser.phone" id="inputPhone"
                    required>
            </div>
            <div class="px-1 py-2">
                <input type="submit" value="Agregar Usuario" class="btn btn-success">
                <!-- data-bs-dismiss="modal" -->
            </div>
        </div>


        </form>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'FormUser',
    data() {
        return {
            formUser: {
                name: "",
                lastName: "",
                email: "",
                phone: ""
            }
        }
    },
    methods: {
        ...mapActions(["addUser"]),
        async addNewUser() {
            let user = {
                name: this.formUser.name,
                lastName: this.formUser.lastName,
                email: this.formUser.email,
                phone: this.formUser.phone,
            }
            await this.addUser(user)
            this.formUser.name = ""
            this.formUser.lastName = ""
            this.formUser.email = ""
            this.formUser.phone = ""
            alert("Usuario agregado correctamente.");
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>