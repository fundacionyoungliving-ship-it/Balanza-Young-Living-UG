// theme.js - Funciones globales y manejo del tema

class ThemeManager {
    constructor() {
        this.themeKey = 'app-theme';
        this.defaultTheme = 'light';
    }

    // Obtener tema actual
    getTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        return savedTheme || (prefersDark ? 'dark' : this.defaultTheme);
    }

    // Aplicar tema
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.themeKey, theme);

        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    // Alternar entre light/dark
    toggleTheme() {
        const currentTheme = this.getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        return newTheme;
    }

    // Inicializar tema al cargar
    init() {
        const theme = this.getTheme();
        this.applyTheme(theme);

        // Configurar listener para cambios del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            if (!localStorage.getItem(this.themeKey)) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Método para cambiar tema desde Blazor
    static setTheme(theme) {
        const manager = new ThemeManager();
        manager.applyTheme(theme);
    }
}

// Inicializar tema automáticamente
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.init();
});

// Funciones utilitarias globales
window.Utils = {
    // Formatear fecha
    formatDate: (date, format = 'es-ES') => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString(format);
    },

    // Formatear número
    formatNumber: (num, decimals = 2) => {
        if (isNaN(num)) return '0';
        return parseFloat(num).toLocaleString('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    // Copiar al portapapeles
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Error al copiar:', err);
            return false;
        }
    },

    // Descargar archivo
    downloadFile: (filename, content, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};



// Exportar para uso global
window.ThemeManager = ThemeManager;

// Función para ocultar menú en páginas de login
function hideSidebarOnLoginPages() {
    // Verificar si estamos en una página de autenticación
    const authPages = ['/Account/Login', '/Account/Register', '/Account/ForgotPassword'];
    const currentPath = window.location.pathname;

    if (authPages.some(page => currentPath.includes(page))) {
        // Añadir clase al body
        document.body.classList.add('login-page');

        // Ocultar sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }

        // Ajustar contenido principal
        const mainContent = document.querySelector('.flex-grow-1.bg-light');
        if (mainContent) {
            mainContent.style.marginLeft = '0';
            mainContent.style.width = '100%';
            mainContent.style.minHeight = '100vh';
        }
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    hideSidebarOnLoginPages();
});

// También ejecutar después de navegación de Blazor
window.addEventListener('popstate', hideSidebarOnLoginPages);

// Exportar para uso manual
window.hideSidebarOnLoginPages = hideSidebarOnLoginPages;