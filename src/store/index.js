import { createStore } from 'vuex'
import {
  getFirestore,
  collection,
  query,
  // getDocs,
  orderBy,
  doc,
  addDoc,
  deleteDoc,
  // updateDoc,
  onSnapshot
} from "firebase/firestore";
let db = getFirestore(firebaseApp);
import firebaseApp from '../firebaseConfig.js'

export default createStore({
  state: {
    users: undefined
  },
  getters: {
  },
  mutations: {
    SET_USER(state, users) {
      state.users = users
    },
    DEL_USER(state, id) {
      let index = state.users.findIndex(user => user.id == id)
      console.log(index)
      state.users.splice(index, 1)
    }
  },
  actions: {
    setUsers({ commit }) {
      try {
        let users = []
        let usersRef = collection(db, 'users')
        const queryData = query(usersRef, orderBy('name', 'asc'))
        onSnapshot(queryData, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let dataChange = change.doc.data();
            if (change.type == 'added') {
              console.log(`Se ha agregado el usuario ${dataChange.name}`);
            } else if (change.type == 'modified') {
              console.log(`Se ha modificado el usuario ${dataChange.name}`);
            } else if (change.type == "removed") {
              console.log(`Se ha eliminado el usuario ${dataChange.name}`);
              commit('DEL_USER', change.doc.id)
            }
          })
          users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          commit('SET_USER', users)
        });
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(context, newUser) {
      try {
        let userRef = collection(db, 'users')
        let user = {
          name: newUser.name,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
        }
        await addDoc(userRef, user);
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async delUser(context, userID) {
      try {
        console.log("Datos: ", userID)
        let confirmDel = confirm("Desea eliminar el usuario: " + userID + "?");
        if (!confirmDel) {
          return
        }
        const usersRef = doc(db, 'users', userID)
        await deleteDoc(usersRef)
        alert("Usuario eliminado correctamente")
      } catch (error) {
        console.log(error)
        alert("Error al eliminar el usuario")
      }
    },
  },
  modules: {
  }
})
