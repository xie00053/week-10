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
    },
    PRODUCTS_SOLD(state, data) {
      // update the product quantity in the state
      // Make API call to update the database
      const productIndex = this.getters.getProductIndex(data.product.id);
      state.products[productIndex].quantity -= data.quantity;
      // the line above is same as writing this
      // state.products[productIndex].quantity -= state.products[productIndex].quantity - data.quantity;

      // Make API call to update the database
      axios
        .put(
          "https://xie00053-week-10.firebaseio.com/products.json",
          state.products
        )
        .then(response => {
          console.log("your data was updated" + response.status);
        });
    },
    // 这里的data 包含了quantity 和 product
    PRODUCT_QUANTITY(state, data) {
      // get the index of the produt from the array of products
      const productIndex = this.getters.getProductIndex(data.product.id);
      // update the quantity of the product at the found index
      state.products[productIndex].quantity = data.quantity;
      axios
        .put(
          "https://xie00053-week-10.firebaseio.com/products.json",
          state.products
        )
        .then(response => {
          console.log("your data was updated" + response.status);
        });
    },

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
    },
    buyProducts({ commit }, { quantity, product }) {
      commit("PRODUCTS_SOLD", { quantity, product });
    },
    // commite a mutation to update the state, sending the payload as { quantity, product }
    updateQuantity({ commit }, { quantity, product }) {
      commit("PRODUCT_QUANTITY", { quantity, product });
    }

  }, 
  
  getters: {
    getProductById: state => id => {
      // the find is a js function
      return state.products.find(product => product.id === id);
    },
    getProductIndex: state => id => {
      return state.products.findIndex(product => product.id === id);
    }
  }

});

// database link: 
//https://xie00053-week-10.firebaseio.com/
