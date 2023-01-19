<template>
    <div>
    
    <div v-if="this.is_login == ''">
        <input placeholder="输入学号" v-model="name"> <br>
        <input type="password" placeholder="输入密码" v-model="pwd"> <br>
        <button @click="login">登录/注册</button>

    </div>

    <div v-if="this.is_login != ''">
        欢迎，{{name}}
        <button @click="loginout">退出登录</button>

    </div>

	 <input v-model="title" placeholder="发布标题"><button @click = "submit">提交</button> <br>
     <input v-model="like" placeholder="搜索内容"><button @click = "search">搜索</button>
        

    <table>
         <th>标题</th> <th>发布者</th> <th>回帖数</th>
         <tr v-for="i in ti_list">

            <td><router-link :to="'content/' + i.id">{{i.content}}</router-link></td> <td>{{i.post_id}}</td>  <td>{{i.count}}</td> <br>
         </tr>
         
    </table> 
    </div>

</template>


<script>
import axios from 'axios'
export default {
    data(){
        return{
            title:"",
            ti_list:[],
            pwd:"",
            name:"",
            like:"",
            is_login:"",
        }
    },
    created(){
        console.log(sessionStorage.getItem("name"));
    if(sessionStorage.getItem("is_login")!=null){
        this.name = sessionStorage.getItem("name");
        this.is_login = 1
    }
    else{
        this.name = "";
    }
    
      axios.get('post/finds').then(res =>{
          this.ti_list = res.data;
          console.log(this.ti_list)
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

             if(sessionStorage.getItem("is_login")!=null){
             let param = new URLSearchParams(); 
             param.append("title",this['title']);
             param.append("post_id",sessionStorage.getItem("name"));
             var time = this.get_time();
             param.append("time",time);
             axios.post("/post/new",param).then(res =>{
                 alert("发送成功");
                 this.title="";
                 this.$router.go(0);
             })

             }

             else{
                 alert("登录后才能发帖");
             }
         },

         go(id){
             this.$router.push("/content/" + id);
         },

        login(){
    
       let param = new URLSearchParams(); 
       param.append("name",this['name']);
       param.append("pwd",this['pwd']);
       console.log(this['name']);
       console.log(this['pwd']);
       
       //判断用户名是否存在
       axios.get("user/is_sign/"+this.name).then((responds) =>{
           //如果用户名存在,则继续发送登录请求
       

           if(responds.data != ''){
               axios.post("user/login",param).then((responds) =>{
                console.log(responds.data);
                if(responds.data.ban == 1){
                    alert("登录失败");
                    console.log("登录失败");
                }
           else{
            if(responds.data != null){
           console.log("登录成功");
           alert("登录成功");
           console.log(responds.data.name);
           sessionStorage.setItem("name",responds.data.name);
           sessionStorage.setItem("is_login",1);
           this.is_login = 1
           
           
         }
         

         else{
            alert("登录失败");
            console.log("登录失败");
         }
         }
           
         
       })
           }
           //如果用户名不存在,则发送注册请求
           else{
               axios.post("user/register",param).then((responds) =>{
                   if(responds.data == 1) {
                       
                       alert("注册成功")
                       sessionStorage.setItem("name",responds.data.name);
                       sessionStorage.setItem("is_login",1);
                       this.is_login = 1
                   }
                   else alert("注册失败");
               })
           }
           
       })
       

     
    },

    loginout(){
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('is_login');
        this.name = '';
        this.pwd = '';
        this.is_login = '';
        
    },
    search(){
       axios.get('post/like_find?title=' + this.like).then(res =>{
          this.ti_list = res.data;
      })
    },
},
}
</script>
