using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JtableAttributes.Startup))]
namespace JtableAttributes
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
