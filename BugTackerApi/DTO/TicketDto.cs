using BugTrackerData.Enums;

namespace BugTackerApi.DTO
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }

    }
}
