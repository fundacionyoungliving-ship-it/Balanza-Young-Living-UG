using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BalanzaDigitalUg.Web.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<TipoMaterial> TipoMateriales { get; set; }
    public DbSet<MaterialReciclado> MaterialesReciclados { get; set; }
    public DbSet<Registros> Registros { get; set; }
    public DbSet<Comuna> Comunas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MaterialReciclado>()
            .HasOne(m => m.Tipo)
            .WithMany(t => t.MaterialesReciclados)
            .HasForeignKey(m => m.TipoId);

        modelBuilder.Entity<Registros>()
            .Property(r => r.ProcesadoEnAppWeb)
            .HasDefaultValue(false);

        modelBuilder.Entity<Comuna>().HasMany(c => c.MaterialesReciclados)
            .WithOne(m => m.Comuna)
            .HasForeignKey(m => m.ComunaId);


        modelBuilder.Entity<TipoMaterial>().HasData(
            new TipoMaterial { Id = 1, Nombre = "Plastico" },
            new TipoMaterial { Id = 2, Nombre = "Vidrio" },
            new TipoMaterial { Id = 3, Nombre = "Metal" },
            new TipoMaterial { Id = 4, Nombre = "Papel" },
            new TipoMaterial { Id = 5, Nombre = "Carton" }
        );

        modelBuilder.Entity<Comuna>().HasData(
            new Comuna { Id = 1, Nombre = "Colibri" },
            new Comuna { Id = 2, Nombre = "Colibri 2" },
            new Comuna { Id = 3, Nombre = "San Gregorio" }
        );

        modelBuilder.Entity<Registros>().HasData(
            new Registros { Id = 1, Uid = "4A979617", Nombre = "Andres Suarez", Material = "Papel", Peso = 0.161m, Fecha = new DateTime(2025, 10, 14, 13, 59, 40), ProcesadoEnAppWeb = false },
            new Registros { Id = 2, Uid = "4A979617", Nombre = "Andres Suarez", Material = "Metal", Peso = 0.161m, Fecha = new DateTime(2025, 10, 14, 14, 4, 39), ProcesadoEnAppWeb = false },
            new Registros { Id = 3, Uid = "4A979617", Nombre = "Andres Suarez", Material = "Papel", Peso = 0.161m, Fecha = new DateTime(2025, 10, 14, 14, 7, 6), ProcesadoEnAppWeb = false },
            new Registros { Id = 4, Uid = "4A979617", Nombre = "Andres Suarez", Material = "Carton", Peso = 0.081m, Fecha = new DateTime(2025, 10, 14, 14, 8, 35), ProcesadoEnAppWeb = false },
            new Registros { Id = 5, Uid = "4A979617", Nombre = "Andres Suarez", Material = "Carton", Peso = 0.029m, Fecha = new DateTime(2025, 10, 14, 14, 10, 22), ProcesadoEnAppWeb = false }
            // new Registros { Id = 6, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Carton", Peso = 0.188m, Fecha = new DateTime(2025, 9, 30, 1, 1, 23), ProcesadoEnAppWeb = false },
            // new Registros { Id = 7, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Carton", Peso = 0.213m, Fecha = new DateTime(2025, 9, 30, 10, 6, 48), ProcesadoEnAppWeb = false },
            // new Registros { Id = 8, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Metal", Peso = 0.043m, Fecha = new DateTime(2025, 9, 30, 10, 11, 0), ProcesadoEnAppWeb = false },
            // new Registros { Id = 9, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Papel", Peso = 0.038m, Fecha = new DateTime(2025, 9, 30, 10, 12, 4), ProcesadoEnAppWeb = false },
            // new Registros { Id = 10, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Carton", Peso = 0.186m, Fecha = new DateTime(2025, 9, 30, 10, 21, 44), ProcesadoEnAppWeb = false },
            // new Registros { Id = 11, Uid = "039D5039", Nombre = "Maria Zurita", Material = "Metal", Peso = 0.044m, Fecha = new DateTime(2025, 10, 30, 11, 34, 42), ProcesadoEnAppWeb = false },
            // new Registros { Id = 12, Uid = "039D5039", Nombre = "Maria Zurita", Material = "Carton", Peso = 0.045m, Fecha = new DateTime(2025, 10, 30, 11, 35, 0), ProcesadoEnAppWeb = false },
            // new Registros { Id = 13, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Metal", Peso = 0.028m, Fecha = new DateTime(2025, 10, 30, 11, 46, 33), ProcesadoEnAppWeb = false },
            // new Registros { Id = 14, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Papel", Peso = 0.056m, Fecha = new DateTime(2025, 10, 30, 11, 47, 12), ProcesadoEnAppWeb = false },
            // new Registros { Id = 15, Uid = "001FFA79", Nombre = "Ariel Vargas", Material = "Carton", Peso = 0.228m, Fecha = new DateTime(2025, 10, 30, 11, 58, 38), ProcesadoEnAppWeb = false }
        );

        modelBuilder.Entity<MaterialReciclado>().HasData(
            new MaterialReciclado { Id = 1, TipoId = 1, Peso = 0.5m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 13), UsuarioId = "1", ComunaId = 1 },
            new MaterialReciclado { Id = 2, TipoId = 2, Peso = 1.2m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 14), UsuarioId = "2", ComunaId = 2 },
            new MaterialReciclado { Id = 3, TipoId = 3, Peso = 0.8m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 15), UsuarioId = "1", ComunaId = 1 },
            new MaterialReciclado { Id = 4, TipoId = 4, Peso = 1.5m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 16), UsuarioId = "2", ComunaId = 2 },
            new MaterialReciclado { Id = 5, TipoId = 5, Peso = 0.3m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 17), UsuarioId = "1", ComunaId = 1 },
            new MaterialReciclado { Id = 6, TipoId = 1, Peso = 2.0m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 18), UsuarioId = "2", ComunaId = 2 },
            new MaterialReciclado { Id = 7, TipoId = 2, Peso = 0.7m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 19), UsuarioId = "1", ComunaId = 1 },
            new MaterialReciclado { Id = 8, TipoId = 3, Peso = 1.1m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 20), UsuarioId = "2", ComunaId = 2 },
            new MaterialReciclado { Id = 9, TipoId = 4, Peso = 0.9m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 21), UsuarioId = "1", ComunaId = 1 },
            new MaterialReciclado { Id = 10, TipoId = 5, Peso = 1.8m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 22), UsuarioId = "2", ComunaId = 2 },
            new MaterialReciclado { Id = 11, TipoId = 1, Peso = 0.6m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 13, 10, 0, 0), UsuarioId = "1", ComunaId = 2 },
            new MaterialReciclado { Id = 12, TipoId = 2, Peso = 1.0m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 14, 11, 0, 0), UsuarioId = "2", ComunaId = 1 },
            new MaterialReciclado { Id = 13, TipoId = 3, Peso = 0.9m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 15, 12, 0, 0), UsuarioId = "1", ComunaId = 2 },
            new MaterialReciclado { Id = 14, TipoId = 4, Peso = 1.7m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 16, 13, 0, 0), UsuarioId = "2", ComunaId = 1 },
            new MaterialReciclado { Id = 15, TipoId = 5, Peso = 0.4m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 17, 14, 0, 0), UsuarioId = "1", ComunaId = 2 },
            new MaterialReciclado { Id = 16, TipoId = 1, Peso = 1.9m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 18, 15, 0, 0), UsuarioId = "2", ComunaId = 1 },
            new MaterialReciclado { Id = 17, TipoId = 2, Peso = 0.8m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 19, 16, 0, 0), UsuarioId = "1", ComunaId = 2 },
            new MaterialReciclado { Id = 18, TipoId = 3, Peso = 1.3m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 20, 17, 0, 0), UsuarioId = "2", ComunaId = 1 },
            new MaterialReciclado { Id = 19, TipoId = 4, Peso = 0.7m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 21, 18, 0, 0), UsuarioId = "1", ComunaId = 2 },
            new MaterialReciclado { Id = 20, TipoId = 5, Peso = 1.6m, UsuarioBalanza = "Marilyn Cunalata", FechaIngreso = new DateTime(2025, 10, 22, 19, 0, 0), UsuarioId = "2", ComunaId = 1 }
        );
    }
}