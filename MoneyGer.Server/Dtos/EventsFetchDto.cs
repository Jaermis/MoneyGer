namespace MoneyGer.Server.Dtos
{
    public class EventsFetchDto
    {
        public int Id { get; set; }
        public string Description { get; set; } =null!;
        public string DateStart { get; set; } = null!;
        public string? EventTime {get; set; }
    }
}