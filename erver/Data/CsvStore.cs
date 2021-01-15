using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Server.Data
{
    public class CsvStore
    {
        private static object _lock = new object();

        private readonly ILogger<CsvStore> _logger;

        private readonly IOptions<ServerConfiguration> _config;

        public CsvStore(ILogger<CsvStore> logger, IOptions<ServerConfiguration> config)
        {
            _logger = logger;
            _config = config;
        }

        public string RootPath => _config.Value.StoragePath;

        public IEnumerable<string> GetDataSources()
        {
            var result = new List<string>();

            var di = new DirectoryInfo(RootPath);

            if (di.Exists)
            {
                foreach (var sdi in di.GetDirectories())
                {
                    result.Add(sdi.Name.ToLowerInvariant());
                }
                _logger.LogInformation($"CSV store contains {result.Count} data source(s).");
            }
            else
            {
                _logger.LogWarning($"CSV store root folder '{di.FullName}' not found.");
            }

            return result;
        }

        public IEnumerable<string> GetDataPackages(string dataSourceId)
        {
            var result = new List<string>();

            var di = new DirectoryInfo(Path.Combine(RootPath, dataSourceId));

            if (di.Exists)
            {
                foreach (var sdi in di.GetDirectories())
                {
                    result.Add(sdi.Name.ToLowerInvariant());
                }
                _logger.LogInformation($"CSV store contains {result.Count} data package(s) for data source '{dataSourceId}'.");
            }
            else
            {
                _logger.LogWarning($"CSV store does not contain data source '{dataSourceId}'.");
            }

            return result;
        }

        public IEnumerable<DatedAirQuality> GetData(string dataSourceId, string dataPackageId)
        {
            var result = new List<DatedAirQuality>();

            var di = new DirectoryInfo(Path.Combine(RootPath, dataSourceId, dataPackageId));
            if (di.Exists)
            {
                foreach (var fi in di.GetFiles("*.csv"))
                {
                    lock (_lock)
                    {
                        using (var reader = new StreamReader(fi.FullName))
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            result.AddRange(csv.GetRecords<DatedAirQuality>());
                        }
                    }
                }

                _logger.LogInformation($"CSV store '{dataSourceId}/{dataPackageId}' contains {result.Count} record(s).");
            }
            else
            {
                _logger.LogWarning($"CSV store does not contain records for '{dataSourceId}/{dataPackageId}'.");
            }

            return result.OrderBy(r => r.Timestamp);
        }

        public bool AddData(string dataSourceId, DatedAirQuality data)
        {
            if (data == null)
            {
                return false;
            }

            lock (_lock)
            {
                var dataPackageId = data.Timestamp.ToString("yyyy-MM", CultureInfo.InvariantCulture);
                var di = new DirectoryInfo(Path.Combine(RootPath, dataSourceId, dataPackageId));
                if (!di.Exists)
                {
                    di.Create();
                }

                var fi = new FileInfo(Path.Combine(di.FullName, data.Timestamp.ToString("yyyy-MM-dd") + ".csv"));
                var writeCsvHeader = !fi.Exists;

                using (var writer = new StreamWriter(fi.FullName, true))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    // use async variant as others have problems with LF
                    csv.Configuration.HasHeaderRecord = writeCsvHeader;
                    csv.WriteRecordsAsync<DatedAirQuality>(new[] { data }).Wait();
                }
            }

            return true;
        }

    }
}
