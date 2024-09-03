require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    args: 'start',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: [DEPLOY_HOST],
      ref: DEPLOY_REF,
      ssh_options: 'StrictHostKeyChecking=no',
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'export PATH=$PATH:~/.nvm/versions/node/v18.20.4/bin/ && cd frontend/ && npm i && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
