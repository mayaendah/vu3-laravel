<template>

    <div class="card border-primary mt-5 shadow" style="max-width: 60rem;">
        <div class="card-body">

            <form @submit.prevent="PostUpdate" enctype="multipart/form-data">
                <div class="form-group">
                    <label class="form-label mt-4">Title</label>
                    <input type="text" class="form-control" placeholder="Name of Product" v-model="product.title">
                    <div v-if="validation.length">
                        <div class="alert alert-danger mt-1">
                            {{validation[0]}}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label mt-4">Price</label>
                    <input type="number" class="form-control" placeholder="Name of Product" v-model="product.price">
                    <div v-if="validation.length">
                        <div class="alert alert-danger mt-1">
                            {{validation[1]}}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label mt-4">image</label>

                    

                    <input type="text" class="form-control" placeholder="Name of Product" v-model="product.image" hidden>

                    <input type="file" class="form-control" placeholder="Name of Product" @change="updateImage">



                    <div class="text-center mt-4">
                        <img :src="`http://localhost:8000/storage/${product.image}`" width="200" height="200" />
                    </div>
                  
                    <div v-if="validation.length">
                        <div class="alert alert-danger mt-1">
                            {{validation[2]}}
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary mt-4 rounded" style="float:right">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            product: {},
            image:'',
            preview:'',
            validation: [],

        }
    },
    created() {
        this.getProductById();
    },
    methods: {
        async getProductById() {

            let url = `http://127.0.0.1:8000/api/crud/${this.$route.params.id}`;
            await axios.get(url).then(response => {
                console.log(response);
                this.product = response.data.data;

            }).catch(error => {
                console.log(error);
            });
        },

        updateImage(e){

            console.log(e.target.files[0]);
            this.image=e.target.files[0];

        },

        PostUpdate() {

            if(this.image){
                let title = this.product.title;
                let price = this.product.price;
                let image = this.image;


                axios.post(`http://127.0.0.1:8000/api/crud/${this.$route.params.id}`, {
                title: title,
                price: price,
                image: image,

            }).then((response) => {
                console.log(response);
                //redirect ke post index
                this.$router.push({ name: 'ListProduct' });

            }).catch(error => {
                //assign state validation with error 
                console.log(error);
            })

            }else{
                let title = this.product.title;
                let price = this.product.price;
                let image = this.product.image;

                axios.put(`http://127.0.0.1:8000/api/crud/${this.$route.params.id}`, {
                title: title,
                price: price,
                image: image,

            }).then((response) => {
                console.log(response);
                //redirect ke post index
                this.$router.push({ name: 'ListProduct' });

            }).catch(error => {
                //assign state validation with error 
                console.log(error);
            })
            }

            

           
        }
    }
}
</script>