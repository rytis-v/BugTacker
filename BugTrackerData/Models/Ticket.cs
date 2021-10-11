using BugTrackerData.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace BugTrackerData.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateClosed { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
    }
}
