<template>
  <div class="container-fluid" v-if="tokenIsPresent">
    <div class="row">
      <nav class="nav bg-dark w-100">
        <a href="" class="navbar-brand">
          NAVIGATION BAR
        </a>
      </nav>
    </div>
    <div class="row ">
      <h1 class="mx-auto py-5 ">AUBYN'S TO-DO APPLICATION</h1>
    </div>
    <div v-if="todoDeleted">
      <h1 class="mx-auto">Todo Has Been Deleted!</h1>
    </div>
    <div v-if="todoCreated">
      <h1 class="mx-auto">Todo Has Been Created!</h1>
    </div>
    <template v-if="create">
      <div class="row ">
        <table class="  table-rounded mx-auto bg-white">
          <tr @submit.prevent>
            <td>
              <input v-model="name" type="text" placeholder="name" />
            </td>
            <td>
              <input
                v-model="description"
                type="text"
                placeholder="Description"
              />
            </td>
            <td>
              <button @click="createTodo" class="btn btn-info">Save</button>
            </td>
          </tr>
        </table>
      </div>
    </template>
    <template v-if="edit">
      <div class="row">
        <table class=" table mx-auto bg-white">
          <tr @submit.prevent>
            <td>
              <input v-model="todoUpdate.name" type="text" placeholder="name" />
            </td>
            <td>
              <input
                v-model="todoUpdate.description"
                type="text"
                placeholder="Description"
              />
            </td>
            <td>
              <button
                @click="updateTodo(todoUpdate.id)"
                class="btn btn-success"
              >
                Update
              </button>
            </td>
            <td>
              <button
                @click="(create = true), (edit = false)"
                class="btn btn-secondary"
              >
                Cancel
              </button>
            </td>
          </tr>
        </table>
      </div>
    </template>
    <div class="row  ">
      <div class="col d-flex mx-auto p-5">
        <table
          class=" table-bordered table rounded w-50 mx-auto bg-white rounded-5 p-5"
        >
          <tr class="my-5" :key="index" v-for="(todo, index) in todo">
            <td>{{ `${todo.name}` }}</td>
            <td>{{ `${todo.description}` }}</td>
            <td>
              <button @click="deleteTodo(todo.id)" class="btn btn-danger">
                Delete
              </button>
            </td>
            <td>
              <button
                @click="
                  (create = false), (edit = true);
                  getTodoUpdate(todo);
                "
                class="btn btn-primary"
              >
                Edit
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "App",
  data() {
    return {
      id: ``,
      todoDeleted: false,
      todoCreationError: false,
      todoCreated: false,
      route: "/api/todos/",
      form: {},
      todo: [],
      title: "",
      description: "",
      create: true,
      edit: false,
      todoUpdate: {},
      state: this.$store.state.app,
      name: ""
    };
  },
  mounted() {
    this.getTodo();

  },
  computed: {
tokenIsPresent(){
  return this.$store.getters["/app/activeToken"] !== null;
}
  },

  methods: {
    getTodo() {
      this.$axios
        .get("/api/todos")
        .then(({ data }) => {
          this.todo = [...data];
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getTodoUpdate(todo) {
      this.todoUpdate = { ...todo };
    },

    createTodo() {
      this.$axios
        .post(this.route, {
          name: this.name,
          description: this.description,
        })
        .then(() => {
          this.getTodo();
          this.todoCreated = true;
          this.name = "";
          this.description = "";
        })

        .catch((e) => {
          this.todoCreationError = true;
          console.log("error during create", e);
        });
    },
    updateTodo(id) {
      this.$axios
        .put(this.route + id, {
          title: this.todoUpdate.name,
          description: this.todoUpdate.description,
        })
        .then(() => {
          this.todoCreated = true;
          this.todoCreationError = false;
          this.getTodo();
          this.create = true;
          this.edit = false;
        })

        .catch((e) => {
          this.todoCreationError = true;
          console.log("error during create", e);
        });
    },
    deleteTodo(id) {
      this.$axios
        .delete("/api/todos/" + id)
        .then(() => {
          this.todoCreated = false;

          this.getTodo();
          this.todoDeleted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

* {
  font-family: "Architects Daughter", cursive;
  font-weight: 700;
}

.container-fluid {
  background-image: url(https://wallpapercave.com/wp/wp5129083.jpg);
  height: 100vh;
  width: 100%;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.table th {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
  padding: 50px;
}
</style>
