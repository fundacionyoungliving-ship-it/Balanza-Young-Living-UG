namespace BalanzaDigitalUg.Web.Data;

public class Registros
{
    public int Id { get; set; }
    public string Uid { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public decimal Peso { get; set; }
    public DateTime Fecha { get; set; }
    public bool ProcesadoEnAppWeb { get; set; }
}