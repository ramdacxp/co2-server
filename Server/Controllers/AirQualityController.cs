using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AirQualityController : ControllerBase
    {
        private readonly ILogger<AirQualityController> _logger;

        private readonly CsvStore _store;

        public AirQualityController(
            ILogger<AirQualityController> logger,
            CsvStore store)
        {
            _logger = logger;
            _store = store;
        }

        [HttpGet]
        public IEnumerable<string> GetDataSources()
        {
            return _store.GetDataSources();
        }

        [HttpGet("{dataSourceId}")]
        public IEnumerable<string> GetDataPackages(string dataSourceId)
        {
            return _store.GetDataPackages(dataSourceId);
        }

    }
}
