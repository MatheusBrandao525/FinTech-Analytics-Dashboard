<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon, ChartBarIcon, BriefcaseIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline';
import { authService } from '../services/authService';

const router = useRouter();
const route = useRoute();

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, routeName: 'dashboard' },
  { name: 'Market', href: '/market', icon: ChartBarIcon, routeName: 'market' },
  { name: 'Portfolio', href: '/portfolio', icon: BriefcaseIcon, routeName: 'portfolio' },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon, routeName: 'reports' },
];

const handleLogout = () => {
    authService.logout();
    router.push({ name: 'login' });
};

const user = authService.getUser();
</script>

<template>
  <div class="flex h-screen bg-fintech-primary overflow-hidden">
    <!-- Sidebar -->
    <div class="hidden md:flex flex-col w-64 bg-fintech-secondary border-r border-fintech-border">
      <div class="flex items-center justify-center h-16 border-b border-fintech-border">
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fintech-accent to-blue-500">
            FinTech Pro
        </span>
      </div>
      
      <div class="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav class="mt-5 flex-1 px-4 space-y-2">
            <router-link 
                v-for="item in navigation" 
                :key="item.name" 
                :to="item.href"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200"
                :class="[
                   route.name === item.routeName 
                     ? 'bg-fintech-accent/10 text-fintech-accent' 
                     : 'text-fintech-muted hover:bg-fintech-border/50 hover:text-fintech-text'
                ]"
            >
                <component 
                    :is="item.icon" 
                    class="mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200"
                    :class="[
                       route.name === item.routeName ? 'text-fintech-accent' : 'text-fintech-muted group-hover:text-fintech-text'
                    ]"
                />
                {{ item.name }}
            </router-link>
        </nav>
      </div>

      <div class="flex-shrink-0 flex border-t border-fintech-border p-4">
         <div class="flex items-center w-full">
            <div class="w-8 h-8 rounded-full bg-fintech-accent/20 flex items-center justify-center text-fintech-accent font-bold text-xs ring-2 ring-fintech-border">
                {{ user?.name?.charAt(0) || 'U' }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-fintech-text">{{ user?.name || 'User' }}</p>
              <p class="text-xs text-fintech-muted truncate max-w-[100px]">{{ user?.email || 'email@example.com' }}</p>
            </div>
            <button @click="handleLogout" class="ml-auto text-fintech-muted hover:text-fintech-danger transition-colors" title="Logout">
                <ArrowLeftOnRectangleIcon class="h-5 w-5" />
            </button>
         </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <main class="flex-1 relative overflow-y-auto focus:outline-none custom-scrollbar">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
