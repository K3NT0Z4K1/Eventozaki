 import { auth } from './firebase-config.js';
    import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

    window.handleLogin = async function() {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const btn = document.getElementById('loginBtn');
      const err = document.getElementById('errorMsg');

      if (!email || !password) {
        showError('Please fill in all fields.');
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>Signing in...';
      err.style.display = 'none';

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'dashboard.html';
      } catch (e) {
        showError(friendlyError(e.code));
        btn.disabled = false;
        btn.innerHTML = 'Sign In to Dashboard';
      }
    };

    function showError(msg) {
      const err = document.getElementById('errorMsg');
      err.textContent = msg;
      err.style.display = 'block';
    }

    function friendlyError(code) {
      const map = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Try again.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/too-many-requests': 'Too many attempts. Try again later.',
        'auth/invalid-credential': 'Invalid credentials. Check your email and password.',
      };
      return map[code] || 'Login failed. Please try again.';
    }

    // Enter key support
    document.getElementById('password').addEventListener('keydown', e => {
      if (e.key === 'Enter') window.handleLogin();
    });

    // Redirect if already logged in
    import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    onAuthStateChanged(auth, user => {
      if (user) window.location.href = 'dashboard.html';
    });