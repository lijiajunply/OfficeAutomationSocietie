using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.Share.DataModels;

namespace OA.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectController : ControllerBase
{
    private readonly OaContext _context;

    public ProjectController(OaContext context)
    {
        _context = context;
    }

    // GET: api/Project
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjects()
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }

        return await _context.Projects.ToListAsync();
    }

    // GET: api/Project/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectModel>> GetProjectModel(string id)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }

        var projectModel = await _context.Projects.FindAsync(id);

        if (projectModel == null)
        {
            return NotFound();
        }

        return projectModel;
    }

    // PUT: api/Project/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProjectModel(string id, ProjectModel projectModel)
    {
        if (id != projectModel.Id)
        {
            return BadRequest();
        }

        _context.Entry(projectModel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectModelExists(id))
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

    // POST: api/Project
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ProjectModel>> PostProjectModel(ProjectModel projectModel)
    {
        if (_context.Projects == null)
        {
            return Problem("Entity set 'OaContext.Projects'  is null.");
        }

        _context.Projects.Add(projectModel);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (ProjectModelExists(projectModel.Id))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetProjectModel", new { id = projectModel.Id }, projectModel);
    }

    // DELETE: api/Project/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProjectModel(string id)
    {
        if (_context.Projects == null)
        {
            return NotFound();
        }

        var projectModel = await _context.Projects.FindAsync(id);
        if (projectModel == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(projectModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProjectModelExists(string id)
    {
        return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}