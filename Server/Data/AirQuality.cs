using System;
using CsvHelper.Configuration.Attributes;

namespace Server.Data
{
    public class AirQuality
    {
        /// <summary>
        /// Temperature in 1/10 degree celsius (e.g. 236 for 23.6 °C)
        /// </summary>
        public int Temperature { get; set; }

        /// <summary>
        /// CO² concentration in ppm (usually 400 .. 5000)
        /// </summary>
        public int Co2Concentration { get; set; }
    }
}
