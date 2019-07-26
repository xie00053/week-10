<template>
    <div>
        <!-- <h1>Single Product Page</h1> -->
        <!-- $route.params:路线参考。 意思为进入route，查找object， 查找object里的id -->
        <!-- {{$route.params.id}} -->
        <!-- send props :product, propety "product"-->
        <ProductInfo :product="product" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductInfo from "@/components/ProductInfo.vue";

export default {
    components: { ProductInfo },
    data() {
    return { product: "" };
  },
    // props: ["id"]
    // 这样不用每次
    props: {
        id: {
            type: Number,
            required:true
        }
    },

//   computed: mapGetters(["getProductById"]) 如果按照完整的computed的格式，使用 computed:{ },那么需要写成 ...mapGetters(["getProductById"]),
    computed: {
    ...mapGetters(["getProductById"]),  
  },

   created() {
    console.log(this.id);
    this.product = this.getProductById(this.id);
  },
}
</script>
