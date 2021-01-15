using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Server.Data;

namespace Server
{
    public class Startup
    {
        readonly string AllowAngulaDevWebserverOriginPolicy = "myAllowAngulaDevWebserverOriginPolicyName";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ServerConfiguration>(Configuration.GetSection("Co2Server"));
            services.AddSingleton<CsvStore>();

            services.AddCors(options =>
            {
                options.AddPolicy(
                    AllowAngulaDevWebserverOriginPolicy,
                    builder => builder.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200"));
            });

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/app";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "CO2-Server",
                    Version = "v1",
                    Description = "Data store for air quality (CO2) tracking."
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(AllowAngulaDevWebserverOriginPolicy);
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CO2-Server v1"));

            // app.UseHttpsRedirection();

            app.UseSpaStaticFiles();

            app.UseRouting();

            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                // spa.Options.SourcePath = "app";
            });
        }
    }
}
