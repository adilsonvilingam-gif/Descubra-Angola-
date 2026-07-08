// =============================================
// AUTH.JS - Sistema de Login/Registro (Página Login)
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Auth.js carregado!');

    // ==========================================
    // 1. ELEMENTOS
    // ==========================================
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // ==========================================
    // 2. TOGGLE SENHA (Mostrar/Ocultar)
    // ==========================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.password-input-wrapper').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ==========================================
    // 3. TABS (Alternar entre Login e Registro)
    // ==========================================
    loginTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            loginTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.dataset.tab;
            
            if (tabName === 'login') {
                loginPanel.classList.add('active');
                registerPanel.classList.remove('active');
                clearMessage(loginMessage);
            } else {
                registerPanel.classList.add('active');
                loginPanel.classList.remove('active');
                clearMessage(registerMessage);
            }
        });
    });

    // ==========================================
    // 4. FUNÇÃO PARA LIMPAR MENSAGENS
    // ==========================================
    function clearMessage(element) {
        if (element) {
            element.textContent = '';
            element.className = 'form-message';
        }
    }

    // ==========================================
    // 5. FUNÇÃO PARA MOSTRAR MENSAGENS
    // ==========================================
    function showMessage(element, text, type = 'error') {
        if (element) {
            element.textContent = text;
            element.className = 'form-message ' + type + ' show';
        }
    }

    // ==========================================
    // 6. FUNÇÃO DE NOTIFICAÇÃO
    // ==========================================
    function showNotification(message, type = 'success') {
        if (window.showPushNotification) {
            window.showPushNotification(message, '', type);
        }
    }

    // ==========================================
    // 7. VALIDAÇÃO DE EMAIL
    // ==========================================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==========================================
    // 8. REDIRECIONAR APÓS LOGIN
    // ==========================================
    function redirectAfterLogin() {
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
        sessionStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    }

    // ==========================================
    // 9. LOGIN
    // ==========================================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value;
            const rememberMe = document.getElementById('rememberMe')?.checked;
            const submitBtn = this.querySelector('.btn-login');
            
            if (!email || !password) {
                showMessage(loginMessage, '❌ Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage(loginMessage, '❌ Por favor, insira um email válido.', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    const userData = { name: user.name, email: user.email };
                    localStorage.setItem('user', JSON.stringify(userData));
                    
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                        localStorage.setItem('savedEmail', email);
                    } else {
                        localStorage.removeItem('rememberMe');
                        localStorage.removeItem('savedEmail');
                    }
                    
                    showMessage(loginMessage, '✅ Login realizado com sucesso! Redirecionando...', 'success');
                    showNotification('Bem-vindo de volta, ' + user.name + '! 👋', 'success');
                    
                    setTimeout(() => {
                        redirectAfterLogin();
                    }, 1500);
                    
                } else {
                    showMessage(loginMessage, '❌ Email ou senha incorretos. Tente novamente.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Entrar';
                }
            }, 800);
        });
    }

    // ==========================================
    // 10. REGISTRO
    // ==========================================
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName')?.value.trim();
            const email = document.getElementById('registerEmail')?.value.trim();
            const password = document.getElementById('registerPassword')?.value;
            const confirmPassword = document.getElementById('registerConfirmPassword')?.value;
            const acceptTerms = document.getElementById('acceptTerms')?.checked;
            const submitBtn = this.querySelector('.btn-login');
            
            if (!name || !email || !password || !confirmPassword) {
                showMessage(registerMessage, '❌ Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (name.length < 2) {
                showMessage(registerMessage, '❌ O nome deve ter pelo menos 2 caracteres.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage(registerMessage, '❌ Por favor, insira um email válido.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage(registerMessage, '❌ A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage(registerMessage, '❌ As senhas não coincidem.', 'error');
                return;
            }
            
            if (!acceptTerms) {
                showMessage(registerMessage, '❌ Você precisa aceitar os Termos de Uso.', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
            
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find(u => u.email === email)) {
                    showMessage(registerMessage, '❌ Este email já está registrado.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Criar Conta';
                    return;
                }
                
                const newUser = { 
                    name: name, 
                    email: email, 
                    password: password,
                    created: new Date().toISOString()
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                localStorage.setItem('user', JSON.stringify({ name: name, email: email }));
                
                showMessage(registerMessage, '✅ Registro realizado com sucesso! Redirecionando...', 'success');
                showNotification('Bem-vindo, ' + name + '! 🎉', 'success');
                
                setTimeout(() => {
                    redirectAfterLogin();
                }, 1500);
            }, 800);
        });
    }

    // ==========================================
    // 11. VALIDAÇÃO EM TEMPO REAL
    // ==========================================
    const passwordInput = document.getElementById('registerPassword');
    const confirmInput = document.getElementById('registerConfirmPassword');
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.length >= 2) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
                if (this.value.length > 0) {
                    this.classList.add('error');
                }
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (isValidEmail(this.value)) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
                if (this.value.length > 0) {
                    this.classList.add('error');
                }
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const hint = this.closest('.form-group').querySelector('.password-hint');
            const value = this.value;
            
            if (hint) {
                if (value.length === 0) {
                    hint.textContent = 'A senha deve ter pelo menos 6 caracteres';
                    hint.className = 'password-hint';
                    this.classList.remove('error', 'success');
                } else if (value.length < 6) {
                    hint.textContent = '⚠️ A senha deve ter pelo menos 6 caracteres';
                    hint.className = 'password-hint error';
                    this.classList.remove('success');
                    this.classList.add('error');
                } else {
                    hint.textContent = '✅ Senha válida!';
                    hint.className = 'password-hint success';
                    this.classList.remove('error');
                    this.classList.add('success');
                }
            }
        });
    }
    
    if (confirmInput && passwordInput) {
        confirmInput.addEventListener('input', function() {
            if (this.value.length === 0) {
                this.classList.remove('error', 'success');
                this.style.borderColor = '';
            } else if (this.value === passwordInput.value) {
                this.classList.remove('error');
                this.classList.add('success');
                this.style.borderColor = '#4CAF50';
            } else {
                this.classList.remove('success');
                this.classList.add('error');
                this.style.borderColor = '#E85D04';
            }
        });
    }

    // ==========================================
    // 12. VERIFICAR SE JÁ ESTÁ LOGADO (CORRIGIDO)
    // ==========================================
    function checkAlreadyLoggedIn() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                
                // Verificar se a página atual é a de login
                // Se for, redirecionar para o index
                const currentPage = window.location.pathname.split('/').pop();
                if (currentPage === 'login.html') {
                    console.log('🔒 Utilizador já logado. Redirecionando para index.html');
                    showNotification('Você já está logado como ' + userData.name + '! 👋', 'success');
                    
                    setTimeout(() => {
                        redirectAfterLogin();
                    }, 1500);
                } else {
                    console.log('🔒 Utilizador logado: ' + userData.name);
                }
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    }
    checkAlreadyLoggedIn();

    // ==========================================
    // 13. PREENCHER EMAIL SALVO
    // ==========================================
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) {
            emailInput.value = savedEmail;
        }
        const rememberCheckbox = document.getElementById('rememberMe');
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    // ==========================================
    // 14. SALVAR EMAIL QUANDO "LEMBRAR-ME" ESTIVER MARCADO
    // ==========================================
    const rememberCheckbox = document.getElementById('rememberMe');
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', function() {
            const emailInput = document.getElementById('loginEmail');
            if (this.checked && emailInput && emailInput.value) {
                localStorage.setItem('savedEmail', emailInput.value);
            } else {
                localStorage.removeItem('savedEmail');
            }
        });
    }

    // ==========================================
    // 15. LIMPAR MENSAGENS AO TROCAR DE TAB
    // ==========================================
    loginTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            if (tabName === 'login') {
                clearMessage(loginMessage);
            } else {
                clearMessage(registerMessage);
            }
        });
    });

    console.log('✅ Auth.js - Sistema de autenticação carregado!');
});