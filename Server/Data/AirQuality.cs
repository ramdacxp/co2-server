using System;

namespace Server.Data
{
    public class AirQuality
    {
        /// <summary>
        /// Local date and time when data was sampled
        /// </summary>
        public DateTime Timestamp { get; set; }

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
