# BalanzaDigitalUg

Este proyecto es una aplicación web desarrollada en C# y Blazor, pensada para la gestión de registros de materiales reciclados. Está orientada a estudiantes universitarios que están comenzando a aprender programación, especialmente si tienen experiencia previa en Python y Java.

## Objetivos del Proyecto
- Aprender conceptos básicos de desarrollo web con C# y Blazor.
- Comprender la estructura de un proyecto web moderno.
- Practicar el uso de bases de datos y migraciones.
- Familiarizarse con la organización de componentes y páginas en una aplicación web.

## Estructura del Proyecto
- **BalanzaDigitalUg.Web/**: Carpeta principal de la aplicación web.
  - **Components/**: Componentes reutilizables y páginas principales.
  - **Data/**: Modelos de datos y contexto de base de datos.
  - **Migrations/**: Archivos de migración para la base de datos.
  - **wwwroot/**: Archivos estáticos como CSS y JavaScript.
  - **Program.cs**: Punto de entrada de la aplicación.
  - **appsettings.json**: Configuración de la aplicación.

## Tecnologías Utilizadas
- **C#**: Lenguaje principal del proyecto.
- **Blazor**: Framework para construir interfaces web interactivas con C#.
- **SQLite**: Base de datos ligera para almacenar los registros.
- **Docker**: Para facilitar la ejecución y despliegue del proyecto.

## Requisitos Previos
- Conocimientos básicos de programación (Python o Java).
- Visual Studio Code o Visual Studio instalado.
- .NET SDK instalado.

## Enlaces de Descarga y Documentación
- **Descarga .NET:**  
  [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download)
- **Descarga MySQL:**  
  [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- **Documentación de EF Core:**  
  [https://learn.microsoft.com/en-us/ef/core/](https://learn.microsoft.com/en-us/ef/core/)

### ¿Qué es EF Core?
Entity Framework Core (EF Core) es un ORM (Object-Relational Mapper) para .NET. Permite trabajar con bases de datos usando clases y objetos en C#, sin necesidad de escribir SQL directamente. EF Core traduce las operaciones sobre objetos (como agregar, consultar, modificar o eliminar) en comandos SQL que se ejecutan en la base de datos. Esto facilita el desarrollo y el mantenimiento de aplicaciones que usan bases de datos relacionales como SQL Server, MySQL, SQLite, entre otros.

## Primeros Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/andres-ug/BalanzaDigitalUg.git
   ```
2. Abre la carpeta `BalanzaDigitalUg.Web` en Visual Studio Code o Visual Studio.
3. Restaura los paquetes y ejecuta la aplicación:
   ```powershell
   dotnet restore; dotnet run --project BalanzaDigitalUg.Web
   ```
4. Accede a la aplicación en tu navegador en `http://localhost:5000` (o el puerto que indique la consola).

## Recursos para Aprender
- [Documentación oficial de Blazor](https://learn.microsoft.com/es-es/aspnet/core/blazor/)
- [Tutoriales de C# para principiantes](https://learn.microsoft.com/es-es/dotnet/csharp/tutorials/)


## Contribuciones
Este proyecto está abierto a contribuciones. Si tienes sugerencias o mejoras, ¡no dudes en crear un pull request!

---

*Este README está orientado a estudiantes universitarios que están comenzando a aprender programación y desean explorar el desarrollo web con C# y Blazor.*
