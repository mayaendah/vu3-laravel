<template>
    <div class="card border-primary mt-5 shadow" style="max-width: 60rem">
        <div></div>

        <div class="card-body">
            <div class="row" >
                <div class="col-md-6" v-for="(product) in products" :key="product.id">
                    <div class="card mt-4 p-4">
                        <center>
                            <img :src="`http://localhost:8000/storage/${product.image}`" width="200" height="200" />
                        </center>
                        <div class="card-body" align="right">
                            <h5 class="card-title" >{{ product.title }}</h5>
                            <p class="card-text">Harga Rp. {{ product.price }}</p>
                            <router-link class="btn btn-primary btn-sm rounded shadaow"
                                :to="{ name: 'EditProduct', params: { id: product.id } }">Edit</router-link>&nbsp;
                            <button class="btn btn-secondary btn-sm rounded shadaow"
                                @click.prevent="delProduct(product.id)">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div> -->



        <!-- <table class="table table-hover mt-3  rounded ">
   
            <thead>
                <tr style="font-size:medium">
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="(product,index) in products" :key="product.id">
                <tr class="table-secondary">
                    <td>{{index+1}}</td>
                    <td>{{product.title}}</td>
                    <td>{{product.price}}</td>
                    <td>
                        <img  :src="`http://localhost:8000/storage/${product.image}`" alt="" class="img-fluid">
                       </td>
                    <td>
                        <router-link class="btn btn-primary btn-sm rounded shadaow"  :to="{name:'EditProduct',params:{id:product.id}}">Edit</router-link>&nbsp;
                        <button class="btn btn-secondary btn-sm rounded shadaow"  @click.prevent="delProduct(product.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table> -->
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            products: Array,
        };
    },
    created() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            let url = "http://127.0.0.1:8000/api/crud";
            await axios
                .get(url)
                .then((response) => {
                    this.products = response.data.data;
                    console.log(this.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async delProduct(id) {
            let url = `http://127.0.0.1:8000/api/crud/${id}`;
            await axios
                .delete(url)
                .then((response) => {
                    if (response.data.code == 200) {
                        alert(response.data.message);
                        this.getProduct();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        console.log("Product List created");
    },
};
</script>

<style>
.card {
    border-radius: 5px;
    width: 100%;
    margin: 0px auto;
    float: none;
}

.table th td {
    text-align: center;
}
</style>
