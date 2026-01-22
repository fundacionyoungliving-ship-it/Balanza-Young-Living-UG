using Microsoft.AspNetCore.Identity;

namespace BalanzaDigitalUg.Web.Data;

public static class InitialData
{
    public static async Task SeedUsersAsync(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        var user1 = new ApplicationUser
            { Id = 1.ToString(), UserName = "admin@example.com", Email = "admin@example.com", EmailConfirmed = true };
        var user2 = new ApplicationUser
            { Id = 2.ToString(), UserName = "user@example.com", Email = "user@example.com", EmailConfirmed = true };

        if (await userManager.FindByEmailAsync(user1.Email) == null)
            await userManager.CreateAsync(user1, "Admin123!");

        if (await userManager.FindByEmailAsync(user2.Email) == null)
            await userManager.CreateAsync(user2, "User123!");
    }

    public static async Task SeedRolesAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        string[] roles = ["Admin", "Gestor"];
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Asignar rol Admin al usuario admin
        var adminUser = await userManager.FindByEmailAsync("admin@example.com");
        if (adminUser != null && !await userManager.IsInRoleAsync(adminUser, "Admin"))
            await userManager.AddToRoleAsync(adminUser, "Admin");

        var gestorUser = await userManager.FindByEmailAsync("user@example.com");
        if (gestorUser != null && !await userManager.IsInRoleAsync(gestorUser, "Gestor"))
            await userManager.AddToRoleAsync(gestorUser, "Gestor");
    }
}