using Org.BouncyCastle.Asn1.Cms;

namespace MoneyGer.Server.Dtos
{
    public class EventsDto
    {
        public string? Description { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime Time{get; set; }
    }
}