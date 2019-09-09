using Functions.Tests;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace PingTest
{
    [TestClass]
    public class PingTest
    {
        private readonly ILogger logger = TestFactory.CreateLogger();

        [TestMethod]
        public async Task PingingTest()
        {
            var actionResult = (Microsoft.AspNetCore.Mvc.OkObjectResult) await Ping.Function.Run(null, logger);
            Assert.IsNotNull(actionResult);
            Assert.IsTrue(actionResult.Value.ToString().Contains("Ping"));
        }
    }
}
