using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UsersController : BaseApiController
  {
    private readonly DataContext _context;
    public UsersController(DataContext context)
    {
      _context = context;
    }

    [AllowAnonymous]
    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
      var users = _context.Users.ToList();

      return users;
    }

    [Authorize]
    [HttpGet("{id}")]
    public ActionResult<AppUser> GetUser(int id)
    {
      return _context.Users.Find(id);
    }
  }
}