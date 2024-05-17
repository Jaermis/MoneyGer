namespace MoneyGer.Server.Dtos
{
    public class Events
    {
        public string Description { get; set; } =null!;
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime Time{get; set; }
    }

}