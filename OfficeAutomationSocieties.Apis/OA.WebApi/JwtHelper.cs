﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using OA.Share.DataModels;

namespace OA.WebApi;

public class JwtHelper
{
    private readonly IConfiguration _configuration;

    public JwtHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GetMemberToken(UserModel model)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, model.Name),
            new Claim(ClaimTypes.Role, model.Identity),
            new Claim(ClaimTypes.PrimarySid,model.UserId)
        };

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!));
        
        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            notBefore: DateTime.Now, //notBefore
            expires: DateTime.Now.AddSeconds(30), //expires
            signingCredentials: signingCredentials
        );
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return token;
    }
}

public class TokenActionFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var test = context.HttpContext.Request.Path;
        string? bearer = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
        if (string.IsNullOrEmpty(bearer) || !bearer.Contains("Bearer")) return;
        string[] jwt = bearer.Split(' ');
        var tokenObj = new JwtSecurityToken(jwt[1]);

        var claimsIdentity = new ClaimsIdentity(tokenObj.Claims);
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        context.HttpContext.User = claimsPrincipal;
    }
}

public static class TokenHelper
{
    public static UserModel? GetUser(this ClaimsPrincipal claimsPrincipal)
    {
        try
        {
            var claimId = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.PrimarySid);
            var claimName = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            var claimRole = claimsPrincipal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            if (claimId.IsNull() || claimName.IsNull() || claimRole.IsNull())
            {
                return null;
            }

            return new UserModel()
            {
                Name = claimName!.Value,
                UserId = claimId!.Value,
                Identity = claimRole!.Value
            };
        }
        catch
        {
            return null;
        }
    }

    private static bool IsNull(this Claim? claim)
        => claim == null || !string.IsNullOrEmpty(claim.Value);
}