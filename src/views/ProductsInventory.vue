<template>
    <div>
        <h1>Product Inventory</h1>
        <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <!-- min and max are html syntax -->
            <input type="number" min="0" v-model="product.quantity" />
          </td>
          <td>
            
            <!-- 发送product.quantity, 同时更新product， 方式在methods里 -->
            <button
              @click="sendQuantity(product.quantity, product)"
              class="btn btn-warning"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
   //created 是firebase hook
      // 通过dispatch调用data
      // 这样在刷新页面之后也会显示data
    created(){
        this.$store.dispatch("fetchData");
    },
  computed: mapState(["products"]),
//   computed:{
//       ...mapState(["products"]),
//       newComputed() {}
//   },
  methods: {
    ...mapActions(["updateQuantity"]),
    // send the quantity to store and update the state and database
    sendQuantity(quantity, product) {
      // { quantity: quantity, product: product } 这是一个object， 里面包含key和value， 这里的key可以是任何名称
      if(quantity >= 0){
      this.updateQuantity({ quantity: quantity, product: product });
      } else {
        // throw an error
        console.log ("quantity must be 0 or above")
      }
    }
  }
}
</script>
