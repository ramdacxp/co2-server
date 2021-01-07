using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public IEnumerable<string> GetDataPackages(
            [RegularExpression(@"^[a-z0-9_-]+$", ErrorMessage="No valid data source id")]
            string dataSourceId)
        {
            return _store.GetDataPackages(dataSourceId);
        }

        [HttpGet("{dataSourceId}/{dataPackageId}")]
        public IEnumerable<AirQuality> GetData(
            [RegularExpression(@"^[a-z0-9_-]+$", ErrorMessage="No valid data source id")]
            string dataSourceId,
            [RegularExpression(@"^[a-z0-9_-]+$", ErrorMessage="No valid data package id")]
            string dataPackageId)
        {
            return _store.GetData(dataSourceId, dataPackageId);
        }

        [HttpPost("{dataSourceId}")]
        public IActionResult AddData(
            [RegularExpression(@"^[a-z0-9_-]+$", ErrorMessage="No valid data source id")]
            string dataSourceId,
            [FromBody]
            AirQuality data)
        {
            if (!_store.AddData(dataSourceId, data))
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
