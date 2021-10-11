using BugTackerApi.DTO;
using BugTrackerBusiness.Interfaces;
using BugTrackerData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;


namespace BugTackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ILogger<TicketController> _logger;
        private readonly IRepository<Ticket> _ticketRepository;

        public TicketController(IRepository<Ticket> ticketRepository, ILogger<TicketController> logger)
        {
            _logger = logger;
            _ticketRepository = ticketRepository;
        }

        /// <summary>
        /// Gets a list of available tickets.
        /// </summary>
        /// <returns>A list of all available tickets.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Produces("application/json")]
        public ActionResult<IEnumerable<TicketDto>> GetAllTickets()
        {
            _logger.LogInformation($"Attempted to get all tickets from the list at: {DateTime.Now}");
            if (_ticketRepository.Count() == 0)
            {
                return NoContent();
            }
            var list = _ticketRepository.All();
            return Ok(list);
        }


        /// <summary>
        /// Gets a single ticket
        /// </summary>
        /// <param name="id">Ticket id</param>
        /// <returns>Existing ticket by id</returns>
        [HttpGet("{id:int}", Name = nameof(GetTicketById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public ActionResult<TicketDto> GetTicketById(int id)
        {
            if (!_ticketRepository.Exists(id))
            {
                _logger.LogError($"Attempted to get ticket {id}, which does not exists. Time of attempt: {DateTime.Now}");
                return NotFound();
            }
            var entity = _ticketRepository.Get(id);
            _logger.LogInformation($"Ticket with the id: {id} was successfully retrieved from the database. Request time: {DateTime.Now}");
            return Ok(
                new TicketDto { Title = entity.Title, Description = entity.Description, Priority = entity.Priority, Id = entity.Id, Status = entity.Status });
        }

        /// <summary>
        /// Creates a new ticket with given values.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [Consumes("application/json")]
        public ActionResult<TicketDto> PostTicket([FromBody] CreateTicketDto request)
        {
            var newEntity = new Ticket
            {
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Status = BugTrackerData.Enums.Status.Open,
                DateCreated = DateTime.Now,
            };
            _ticketRepository.Create(newEntity);
            _ticketRepository.SaveChanges();

            var dto = new TicketDto
            {
                Title = newEntity.Title,
                Description = newEntity.Description,
                Priority = newEntity.Priority,
                Status = newEntity.Status
            };
            _logger.LogInformation($"A new ticket was created with the following Id: {dto.Id} and title: {dto.Title}");
            return Created(nameof(PostTicket), dto);
        }

        /// <summary>
        /// Updates an existing ticket within the database
        /// </summary>
        /// <param name="id">Id of the ticket that's being updates</param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult<TicketDto> UpdateTicket([FromRoute] int id, [FromBody] CreateTicketDto request)
        {
            var ticketToBeUpdated = _ticketRepository.Get(id);

            if (ticketToBeUpdated == null)
            {
                _logger.LogError($"Attempted to update ticket with Id: {id}, which does not exists. Time of attempt: {DateTime.Now}");
                return NotFound();
            }

            ticketToBeUpdated.Title = request.Title;
            ticketToBeUpdated.Description = request.Description;
            ticketToBeUpdated.Priority = request.Priority;
            ticketToBeUpdated.Status = request.Status;

            _ticketRepository.Update(ticketToBeUpdated);
            _logger.LogInformation($"Ticket with the Id: {id} was successfully updated.");

            var dto = new TicketDto { Title = ticketToBeUpdated.Title, Description = ticketToBeUpdated.Description, Priority = ticketToBeUpdated.Priority, Status = ticketToBeUpdated.Status };

            return Ok(dto);
        }

        /// <summary>
        /// Deletes a ticket with specified Id within the database
        /// </summary>
        /// <param name="id">Id of the ticket to be deleted</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteTicket(int id)
        {
            var request = _ticketRepository.Get(id);
            if (request == null)
            {
                _logger.LogError($"Attempted to delete ticket with Id: {id}, which does not exists. Time of attempt: {DateTime.Now}");
                return NotFound();
            }
            _ticketRepository.Delete(request);
            _logger.LogInformation($"Ticket with Id: {id} was deleted.");
            return Ok();
        }
    }
}
