import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    products:[]
  },

  mutations: {  
      // mutation里习惯使用大写命名function
    SET_PRODUCTS(state, sereverData){
      state.products = sereverData;
    }
  },
  actions: {
      // 通过fetchData获取，并且send the argument commit
    fetchData({ commit }){     
      axios
        // get the database -> products.json
      .get("https://xie00053-week-10.firebaseio.com/products.json")
      .then(response => {
        console.log(response.data);
        commit("SET_PRODUCTS",response.data);
      })
      
    }
  }
});

// database link: 
//https://xie00053-week-10.firebaseio.com/
