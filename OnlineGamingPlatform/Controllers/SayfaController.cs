using Microsoft.AspNetCore.Mvc;

namespace OnlineGamingPlatform.Controllers
{
    public class SayfaController : Controller
    {    
        public IActionResult MainPage()
        {
            return View();
        }

        public IActionResult Games()
        {
            return View();
        }
        public IActionResult Favorites()
        {
            return View();
        }
        public IActionResult Likes()
        {
            return View();
        }
        public IActionResult Purchases()
        {
            return View();
        }
       
        public IActionResult Buy()
        {
            return View();
        }

        public IActionResult PersonelSayfasi()
        {
            return View();
        }

        [Route("Sayfa/PersonelSayfasi/AddGame")]
        public IActionResult AddGame()
        {
            return View("~/Views/Sayfa/PersonelSayfasi/AddGame.cshtml");
        }

    }
}
