<template>
    <div>
       <router-link to="/">返回</router-link>

       <h1>{{title}}</h1>
        <table>
            <div v-for="i in log_list">

                <div>{{i.post_id}} {{i.time}} </div> 
                <div>{{i.content}}</div> 
                

                <br>
            </div>
        </table>

    <input v-model="content"><button @click = "submit">提交</button>
        
    </div>

   

</template>


<script>
import axios from 'axios';
export default{
    data(){
        return{
            id:"",
            content:"",
            log_list:[],
            name:"",
            title:"",
            time:"",

        }
    },

    created(){
        this.id = this.$route.params.Id;
        this.name = sessionStorage.getItem("name");
        axios.post("/post/getlogs?log_id="+this.id).then(res=>{
            this.log_list = res.data;
        })
        axios.get("/post/findOne?id="+this.id).then(res=>{
            this.title = res.data[0].content;
        })

    },

    methods:{
          stand(num){
            if(num < 10){
                num = "0" + num;
            }
            
            return num;
          },
          get_time(){
             var date = new Date();
             var year = this.stand(date.getFullYear());
             var mouth = this.stand(date.getMonth() + 1);
             var day = this.stand(date.getDate());
             var hour = this.stand(date.getHours());
             var min = this.stand(date.getMinutes());
             var sec = this.stand(date.getSeconds());

             
             var time = year + "-" + mouth + "-" + day + " " +  hour + ":" + min + ":" + sec;
             return time;
          },
          submit(){

              if(sessionStorage.getItem("name")!=null){
             let param = new URLSearchParams(); 
             param.append("content",this['content']);
             param.append("log_id",this['id']);
             param.append("post_id",sessionStorage.getItem("name"));
             
             var time = this.get_time();
            
             param.append("time",time);
             axios.post("/post/newlog",param).then(res =>{
                 alert("发送成功");
                 this.content="";
                 this.$router.go(0) 
             })
              }
            else{
                alert("登录后才能发帖");
            }
         },
         
    }
}
</script>


