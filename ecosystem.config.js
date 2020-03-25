module.exports = {
  apps: [
    {
      name: 'videogiid-nuxt',
      cwd: '/data01/virt15865/domeenid/www.kunstihoone.ee/videogiid-beta',
      exec_mode: 'cluster',
      instances: 'max',
      script:
        '/data01/virt15865/domeenid/www.kunstihoone.ee/videogiid-beta/node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        HOST: '0.0.0.0',
        NODE_ENV: 'development',
        PORT: 3000,
        BASE_URL: 'https://kh-videogiid.wwwstuudio.ee/wp-json/www-api/v1/'
      },
      env_production: {
        HOST: '0.0.0.0',
        NODE_ENV: 'production',
        PORT: 3000,
        BASE_URL: 'https://kh-videogiid.wwwstuudio.ee/wp-json/www-api/v1/'
      }
    }
  ]
}
