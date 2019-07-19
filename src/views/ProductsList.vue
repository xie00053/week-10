<template>
    <div class="row">
        <h1 class="col-12">Product List</h1>
         
        <div class="col-sm-4 p-1" v-for="product in products" :key = "product.id">
          <!-- 第一个product可以是任何名字, 第二个 product 指的loop里的 product -->
        <ProductCard :product = "product" />
        </div>  

    </div>
</template>

<script>
// mapState 这个function指的是只选择map state里的内容，如果选择***可以写成：map***
import{ mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
      //created 是firebase hook
      // 通过dispatch调用data
    created(){
        this.$store.dispatch("fetchData");
    },

    computed: mapState(["products"]),
      // 也可以写成： 
      // computed: {
      //     products(){
      //         return  this.$store.state.products;
      //     }
      // }

    components: {
        ProductCard
    }    
}
</script>
