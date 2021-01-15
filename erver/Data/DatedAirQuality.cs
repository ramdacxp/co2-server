using System;
using CsvHelper.Configuration.Attributes;

namespace Server.Data
{
    public class DatedAirQuality : AirQuality
    {
        /// <summary>
        /// Local date and time when data was sampled
        /// </summary>
        [FormatAttribute("yyyy-MM-ddTHH:mm:ss")]
        public DateTime Timestamp { get; set; }
    }
}
