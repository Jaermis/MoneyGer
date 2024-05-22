namespace MoneyGer.Server.Dtos
{
    public class EventsFetchDto
    {
        internal int id_event;

        public int event_id {get; set;}
        public int Id { get; set; }
        public string Description { get; set; } =null!;
        public string DateStart { get; set; } = null!;
        public string? EventTime {get; set; }
    }
}