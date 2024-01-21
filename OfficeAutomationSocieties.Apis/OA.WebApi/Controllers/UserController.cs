using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OA.Share.DataModels;

namespace OA.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly OaContext _context;

    public UserController(OaContext context)
    {
        _context = context;
    }

    // GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
    {
        if (_context.Users == null)
        {
            return NotFound();
        }

        return await _context.Users.ToListAsync();
    }

    // GET: api/User/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserModel>> GetUserModel(string id)
    {
        if (_context.Users == null)
        {
            return NotFound();
        }

        var userModel = await _context.Users.FindAsync(id);

        if (userModel == null)
        {
            return NotFound();
        }

        return userModel;
    }

    // PUT: api/User/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUserModel(string id, UserModel userModel)
    {
        if (id != userModel.UserId)
        {
            return BadRequest();
        }

        _context.Entry(userModel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserModelExists(id))
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

    // POST: api/User
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
    {
        if (_context.Users == null)
        {
            return Problem("Entity set 'OaContext.Users'  is null.");
        }

        _context.Users.Add(userModel);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (UserModelExists(userModel.UserId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetUserModel", new { id = userModel.UserId }, userModel);
    }

    // DELETE: api/User/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserModel(string id)
    {
        if (_context.Users == null)
        {
            return NotFound();
        }

        var userModel = await _context.Users.FindAsync(id);
        if (userModel == null)
        {
            return NotFound();
        }

        _context.Users.Remove(userModel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool UserModelExists(string id)
    {
        return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
    }
}