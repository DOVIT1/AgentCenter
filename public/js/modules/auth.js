import { CONFIG } from './config.js';
import { state } from './state.js';
import { showScreen } from './utils.js';

export async function login(username, password) {
    try {
        const resp = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const payload = await resp.json();
        if (!resp.ok) {
            return { success: false, error: payload.error || 'Invalid credentials' };
        }

        // Update State
        state.currentUser = payload.user;
        state.userToken = payload.token;
        localStorage.setItem('userToken', state.userToken);
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

        return { success: true, ...payload };
    } catch (err) {
        console.error("Login Error", err);
        return { success: false, error: 'Connection error' };
    }
}

export function logout() {
    state.reset();
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    // Reload to clear all listeners and state cleanly
    window.location.reload();
}

export async function createUser(userData) {
    try {
        const resp = await fetch(`${CONFIG.API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.userToken}` },
            body: JSON.stringify(userData)
        });
        if (resp.ok) return { success: true, message: 'User created successfully' };
        const payload = await resp.json();
        return { success: false, error: payload.error || 'Error creating user' };
    } catch (err) {
        return { success: false, error: 'Connection error' };
    }
}
