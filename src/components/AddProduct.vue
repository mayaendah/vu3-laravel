<template>

    <div class="card border-primary mt-5 shadow" style="max-width: 60rem;">
        <div class="card-body">
         
            <form @submit.prevent="saveproduct" enctype="multipart/form-data">
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
                    <label class="form-label mt-4">Image</label>
                    <input type="file" class="form-control" placeholder="Name of Product" @change="uploadImage">
                    <div class="text-center mt-4">
                        <img :src="preview"  class="rounded shadow" width="200">
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
    data(){
        return{
            product:{},
            title:'',
            price:'',
            validation:[],
            image:'',
            preview:''
           
        }
    },
    methods:{
       async saveproduct(){
            this.validation=[]

            if(!this.product.title){
                this.validation.push("title tidak boleh kosong")
            }

            if(!this.product.price){
                this.validation.push("price tidak boleh kosong")
            }

            if(!this.image){
                this.validation.push("image tidak boleh kosong")
            }

            let formData = new FormData();
                formData.append('title',this.product.title);
                formData.append('price',this.product.price);
                formData.append('image', this.image);

                console.log(formData);
           
            let url='http://127.0.0.1:8000/api/crud';
            await axios.post(url,formData).then((response)=>{
                // 
                if(response.data.success==true){
                    this.pesan=response.data.message
                     alert(response.data.message);
                    this.product.title='';
                    this.product.price='';
                    this.image='';
                }
            
            
            }).catch(error=>{
                console.log("penyimpanan gagal");
            })
        },
        uploadImage(e){
            console.log(e.target.files[0]);
            this.image=e.target.files[0];

            let fileReader=new FileReader();
            fileReader.readAsDataURL(this.image);
            fileReader.onload=e=>{
                this.preview=e.target.result;
                console.log(this.preview);
            }

        }
    }
}
</script>