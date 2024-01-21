using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.Share.DataModels;

namespace OA.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnnouncementController : ControllerBase
{
    private readonly OaContext _context;

    public AnnouncementController(OaContext context)
    {
        _context = context;
    }

    // GET: api/Announcement
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AnnouncementModel>>> GetAnnouncements()
    {
        if (_context.Announcements == null)
        {
            return NotFound();
        }

        return await _context.Announcements.ToListAsync();
    }

    // GET: api/Announcement/5
    [HttpGet("{id}")]
    public async Task<ActionResult<AnnouncementModel>> GetAnnouncementModel(string id)
    {
        if (_context.Announcements == null)
        {
            return NotFound();
        }

        var announcementModel = await _context.Announcements.FindAsync(id);

        if (announcementModel == null)
        {
            return NotFound();
        }

        return announcementModel;
    }

    // PUT: api/Announcement/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAnnouncementModel(string id, AnnouncementModel announcementModel)
    {
        if (id != announcementModel.Id)
        {
            return BadRequest();
        }

        _context.Entry(announcementModel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AnnouncementModelExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Announcement
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<AnnouncementModel>> PostAnnouncementModel(AnnouncementModel announcementModel)
    {
        if (_context.Announcements == null)
        {
            return Problem("Entity set 'OaContext.Announcements'  is null.");
        }

        _context.Announcements.Add(announcementModel);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (AnnouncementModelExists(announcementModel.Id))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetAnnouncementModel", new { id = announcementModel.Id }, announcementModel);
    }

    // DELETE: api/Announcement/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnnouncementModel(string id)
    {
        if (_context.Announcements == null)
        {
            return NotFound();
        }

        var announcementModel = await _context.Announcements.FindAsync(id);
        if (announcementModel == null)
        {
            return NotFound();
        }

        _context.Announcements.Remove(announcementModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AnnouncementModelExists(string id)
    {
        return (_context.Announcements?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}