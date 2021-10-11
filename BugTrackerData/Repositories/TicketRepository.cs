using BugTrackerBusiness.Interfaces;
using BugTrackerData.Models;
using System.Collections.Generic;
using System.Linq;

namespace BugTrackerData.Repositories
{
    public class TicketRepository : IRepository<Ticket>
    {
        private readonly AppDbContext _context;

        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Ticket> All()
        {
            var allTickets = _context.Tickets.ToList();
            return allTickets;  
        }

        public long Count()
        {
            var ticketCount = _context.Tickets.Count();
            return ticketCount;
        }

        public Ticket Create(Ticket entity)
        {
            var ticket = new Ticket
            {
                Title = entity.Title,
                Description = entity.Description,
                Priority = entity.Priority,
                Status = entity.Status,
                DateCreated = entity.DateCreated,

            };
            _context.Tickets.Add(ticket);
            SaveChanges();
            return ticket;
        }

        public void Delete(Ticket entity)
        {
           var entryToBeDeleted = _context.Tickets.FirstOrDefault(x => x.Id == entity.Id);
            _context.Tickets.Remove(entryToBeDeleted);
            SaveChanges();
           
        }

        public bool Exists(int id)
        {
            return _context.Tickets.Any(x => x.Id == id);
        }

        public Ticket Get(int id)
        {
            var ticket = _context.Tickets.FirstOrDefault(x => x.Id == id);
            return ticket;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public Ticket Update(Ticket entity)
        {
            _context.Tickets.Update(entity);
            _context.SaveChanges();

            return entity;
        }
    }
}
