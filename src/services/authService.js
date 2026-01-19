export const authService = {
    login: async (email, password) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock validation
        if (email && password) {
            const token = 'mock-jwt-token-' + Math.random().toString(36).substring(7);
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify({ name: 'Alex Trader', email }));
            return { success: true, token, user: { name: 'Alex Trader', email } };
        }

        throw new Error('Invalid credentials');
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
