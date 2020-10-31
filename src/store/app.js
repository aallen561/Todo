const state = {};

const getters = {};

const actions = {

    init() { 
        
        console.log(this.$store);
        const token = localStorage.getItem("token");
        
        if (token) {
        
          this.$axios.defaults.headers["authorization"] = `Bearer ${token}`;
        }
        else if (this.$route.name !== "login") {
        
          this.$router.push({ name: "login"});
        }

    }
};

const mutations = {};

export const app = {
namespace: true,
    state,
    getters,
    actions,
    mutations 
};


