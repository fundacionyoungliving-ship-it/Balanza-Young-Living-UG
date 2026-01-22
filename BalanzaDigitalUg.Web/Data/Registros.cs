namespace BalanzaDigitalUg.Web.Data;

public class Registros
{
    public int Id { get; set; }
    public string Uid { get; set; }
    public string Nombre { get; set; }
    public string Material { get; set; }
    public decimal Peso { get; set; }
    public DateTime Fecha { get; set; }
    public bool ProcesadoEnAppWeb { get; set; }
}