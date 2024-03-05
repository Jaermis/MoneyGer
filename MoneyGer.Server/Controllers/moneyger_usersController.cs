using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MoneyGer.Server.Context;
using MoneyGer.Server.Models;

namespace MoneyGer.Server.Controllers
{
    public class moneyger_usersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public moneyger_usersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: moneyger_users
        public async Task<IActionResult> Index()
        {
            return View(await _context.moneyger_users.ToListAsync());
        }

        // GET: moneyger_users/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var moneyger_users = await _context.moneyger_users
                .FirstOrDefaultAsync(m => m.AccountID == id);
            if (moneyger_users == null)
            {
                return NotFound();
            }

            return View(moneyger_users);
        }

        // GET: moneyger_users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: moneyger_users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AccountID,WorkEmail,UserPassword,FirstName,LastName,DateCreated")] moneyger_users moneyger_users)
        {
            if (ModelState.IsValid)
            {
                _context.Add(moneyger_users);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(moneyger_users);
        }

        // GET: moneyger_users/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var moneyger_users = await _context.moneyger_users.FindAsync(id);
            if (moneyger_users == null)
            {
                return NotFound();
            }
            return View(moneyger_users);
        }

        // POST: moneyger_users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AccountID,WorkEmail,UserPassword,FirstName,LastName,DateCreated")] moneyger_users moneyger_users)
        {
            if (id != moneyger_users.AccountID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(moneyger_users);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!moneyger_usersExists(moneyger_users.AccountID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(moneyger_users);
        }

        // GET: moneyger_users/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var moneyger_users = await _context.moneyger_users
                .FirstOrDefaultAsync(m => m.AccountID == id);
            if (moneyger_users == null)
            {
                return NotFound();
            }

            return View(moneyger_users);
        }

        // POST: moneyger_users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var moneyger_users = await _context.moneyger_users.FindAsync(id);
            if (moneyger_users != null)
            {
                _context.moneyger_users.Remove(moneyger_users);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool moneyger_usersExists(int id)
        {
            return _context.moneyger_users.Any(e => e.AccountID == id);
        }
    }
}
