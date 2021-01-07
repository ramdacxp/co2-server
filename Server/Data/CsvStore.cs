using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Server.Data
{
    public class CsvStore
    {
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
                _logger.LogInformation($"CSV store contains '{result.Count}' data sources.");
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
                _logger.LogInformation($"CSV store of data source '{dataSourceId}' contains '{result.Count}' data packages.");
            }
            else
            {
                _logger.LogWarning($"CSV store does not contain data source '{dataSourceId}'.");
            }

            return result;
        }
    }
}
