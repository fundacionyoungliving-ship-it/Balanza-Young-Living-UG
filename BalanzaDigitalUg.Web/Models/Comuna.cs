using System.ComponentModel.DataAnnotations;

namespace BalanzaDigitalUg.Web.Data;

public class Comuna
{
    [Key]
    public int Id { get; set; }
    [Required, MaxLength(120)]
    public string Nombre { get; set; } = null!;
    
    public ICollection<MaterialReciclado> MaterialesReciclados { get; } = [];
    
}