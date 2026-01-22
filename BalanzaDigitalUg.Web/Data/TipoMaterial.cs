using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BalanzaDigitalUg.Web.Data;

public class TipoMaterial
{
    [Key] public int Id { get; set; }

    [Required(ErrorMessage = "Nombre es obligatorio"),
     MaxLength(50, ErrorMessage = "El nombre no puede exceder los 50 caracteres")]
    public string Nombre { get; set; } = null!;

    public ICollection<MaterialReciclado> MaterialesReciclados { get; } = [];
}