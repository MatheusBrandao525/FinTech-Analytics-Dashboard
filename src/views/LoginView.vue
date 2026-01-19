<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';

const router = useRouter();
const email = ref('demo@fintech.com');
const password = ref('password');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    await authService.login(email.value, password.value);
    router.push({ name: 'dashboard' });
  } catch (err) {
    error.value = 'Invalid credentials. Try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-fintech-primary text-fintech-text p-4 relative overflow-hidden">
    <!-- Abstract Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fintech-accent/10 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fintech-success/5 rounded-full blur-[100px]"></div>
    </div>

    <div class="w-full max-w-md bg-fintech-card border border-fintech-border rounded-xl shadow-2xl p-8 z-10 relative backdrop-blur-sm bg-opacity-80">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-tr from-fintech-accent to-blue-600 rounded-lg mx-auto flex items-center justify-center mb-4 shadow-lg shadow-fintech-accent/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-white">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">FinTech Pro</h1>
        <p class="text-fintech-muted mt-2">Institutional-grade Analytics</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-fintech-muted mb-2">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full bg-fintech-secondary border border-fintech-border rounded-lg px-4 py-3 text-fintech-text focus:outline-none focus:ring-2 focus:ring-fintech-accent focus:border-transparent transition-all placeholder-gray-600"
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-fintech-muted mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full bg-fintech-secondary border border-fintech-border rounded-lg px-4 py-3 text-fintech-text focus:outline-none focus:ring-2 focus:ring-fintech-accent focus:border-transparent transition-all placeholder-gray-600"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-fintech-danger text-sm text-center">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-gradient-to-r from-fintech-accent to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="!loading">Sign In to Platform</span>
          <span v-else>Authenticating...</span>
        </button>
      </form>
      
      <div class="mt-8 text-center text-xs text-fintech-muted">
        <p>Demo Credentials: Any email / password</p>
      </div>
    </div>
  </div>
</template>
