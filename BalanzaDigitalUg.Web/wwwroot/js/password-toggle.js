// password-toggle.js - Funcionalidad para mostrar/ocultar contraseña
// Versión mejorada y reutilizable

class PasswordToggle {
    constructor(options = {}) {
        this.defaults = {
            inputId: 'passwordInput',
            showText: 'Mostrar contraseña',
            hideText: 'Ocultar contraseña',
            showIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>`,
            hideIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>`
        };

        this.config = { ...this.defaults, ...options };
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        const input = document.getElementById(this.config.inputId);
        if (!input) {
            console.warn(`No se encontró el campo de contraseña con ID: ${this.config.inputId}`);
            return;
        }

        // Verificar si ya existe el botón
        if (input.parentElement.querySelector('.password-toggle-btn')) {
            return;
        }

        // Crear botón
        const button = this.createButton();

        // Insertar botón
        input.parentElement.appendChild(button);

        // Configurar evento
        this.setupEventListeners(input, button);

        // Deshabilitar botones nativos
        this.disableNativeButtons(input);

        this.initialized = true;
    }

    createButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'password-toggle-btn';
        button.innerHTML = this.config.showIcon;
        button.title = this.config.showText;
        button.setAttribute('aria-label', this.config.showText);
        button.setAttribute('aria-pressed', 'false');

        return button;
    }

    setupEventListeners(input, button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.togglePasswordVisibility(input, button);
            input.focus();
        });
    }

    togglePasswordVisibility(input, button) {
        const isPassword = input.type === 'password';

        if (isPassword) {
            input.type = 'text';
            button.innerHTML = this.config.hideIcon;
            button.title = this.config.hideText;
            button.setAttribute('aria-label', this.config.hideText);
            button.setAttribute('aria-pressed', 'true');
        } else {
            input.type = 'password';
            button.innerHTML = this.config.showIcon;
            button.title = this.config.showText;
            button.setAttribute('aria-label', this.config.showText);
            button.setAttribute('aria-pressed', 'false');
        }
    }

    disableNativeButtons(input) {
        // Deshabilitar botones nativos del navegador
        const styleId = `hide-native-buttons-${input.id}`;
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #${input.id}::-ms-reveal,
            #${input.id}::-ms-clear,
            #${input.id}::-webkit-credentials-auto-fill-button,
            #${input.id}::-webkit-contacts-auto-fill-button {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Método estático para inicialización rápida
    static initAll() {
        const passwordInputs = document.querySelectorAll('input[type="password"]');

        passwordInputs.forEach(input => {
            if (!input.id) {
                input.id = `password-${Math.random().toString(36).substr(2, 9)}`;
            }

            const toggle = new PasswordToggle({ inputId: input.id });
            toggle.init();
        });
    }
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    PasswordToggle.initAll();
});

// Exportar para uso manual
window.PasswordToggle = PasswordToggle;