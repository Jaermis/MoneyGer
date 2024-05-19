using Org.BouncyCastle.Asn1.Cms;

namespace MoneyGer.Server.Dtos
{
    public class CreateEventsDto
    {
        public string? Description { get; set; }
        public DateTime DateStart { get; set; }
        public string EventTime {get; set; } = null!;
    }
}