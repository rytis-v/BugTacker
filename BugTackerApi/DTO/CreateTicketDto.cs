using BugTrackerData.Enums;
using System.ComponentModel.DataAnnotations;

namespace BugTackerApi.DTO
{
    public class CreateTicketDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Priority Priority { get; set; }

        public Status Status { get; set; }
    }
}
