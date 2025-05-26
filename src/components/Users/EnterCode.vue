<script setup>
import useAuthentication from '@/stores/authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const Auth = useAuthentication();

const code = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();

const successText = ref('');

const props = defineProps({
    email: {
        type: String,
        required: true
    }
});

const handleResetPassword = async ()=>{
    successText.value = '';
    const res = await Auth.resetPassword(props.email, code.value, newPassword.value, confirmPassword.value);
    successText.value = res.message || 'Password reset successful';
    if(res.success){
        alert('Password reset successfully');
        router.push('/login'); // Redirect to login page after successful reset
        // Optionally redirect or clear fields
        
    } else {
        alert(res.message || 'Failed to reset password');
    }

}


</script>

<template>
    <div class="code">
        <span>We have received a request to reset your password. To reset your password, please enter your code  </span>
        <form @submit.prevent="handleResetPassword">
            <label for="">New Password</label>
            <input type="number" v-model="code" placeholder="Enter code here" required>
             <label for="">New Password</label>
             <input type="password" v-model="newPassword" placeholder="Enter new password" required>
            <label for="">Confirm Password</label>
            <input type="password" v-model="confirmPassword" required placeholder="Confirm new password">
            <button type="submit">Reset Now</button>
            <span>{{ successText }}</span>
        </form>
    </div>
</template>

<style scoped>
.code {
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.code form{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 60%;
}
.code input{
    min-width: 50%;
    height: 2.2rem;
    border: 1px solid rgb(210, 210, 210);
    border-radius: 7px;
    padding-left: .6rem;
}
.code button{
    align-self: center;
    width: 40%;
    height: 2rem;
    border: none;
    background-color: rgb(44, 98, 235);
    font-weight: 600;
    margin-top: 5px;
    border-radius: 8px;
    color: aliceblue;
    cursor: pointer;
    transition: all .2s;
     box-shadow: 3px 3px 4px rgba(70, 69, 69, 0.4);

}
.code button:hover{
    background-color: red;
    scale: 1.01;
}
</style>