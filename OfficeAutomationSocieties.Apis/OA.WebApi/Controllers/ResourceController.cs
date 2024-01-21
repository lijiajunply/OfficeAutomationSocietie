using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.Share.DataModels;

namespace OA.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ResourceController : ControllerBase
{
    private readonly OaContext _context;

    public ResourceController(OaContext context)
    {
        _context = context;
    }

    // GET: api/Resource
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResourceModel>>> GetResources()
    {
        if (_context.Resources == null)
        {
            return NotFound();
        }

        return await _context.Resources.ToListAsync();
    }

    // GET: api/Resource/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ResourceModel>> GetResourceModel(string id)
    {
        if (_context.Resources == null)
        {
            return NotFound();
        }

        var resourceModel = await _context.Resources.FindAsync(id);

        if (resourceModel == null)
        {
            return NotFound();
        }

        return resourceModel;
    }

    // PUT: api/Resource/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutResourceModel(string id, ResourceModel resourceModel)
    {
        if (id != resourceModel.Id)
        {
            return BadRequest();
        }

        _context.Entry(resourceModel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ResourceModelExists(id))
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

    // POST: api/Resource
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ResourceModel>> PostResourceModel(ResourceModel resourceModel)
    {
        if (_context.Resources == null)
        {
            return Problem("Entity set 'OaContext.Resources'  is null.");
        }

        _context.Resources.Add(resourceModel);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (ResourceModelExists(resourceModel.Id))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetResourceModel", new { id = resourceModel.Id }, resourceModel);
    }

    // DELETE: api/Resource/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResourceModel(string id)
    {
        if (_context.Resources == null)
        {
            return NotFound();
        }

        var resourceModel = await _context.Resources.FindAsync(id);
        if (resourceModel == null)
        {
            return NotFound();
        }

        _context.Resources.Remove(resourceModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ResourceModelExists(string id)
    {
        return (_context.Resources?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}