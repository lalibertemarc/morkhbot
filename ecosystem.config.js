module.exports = {
    apps: [
        {
            name: "Morkhbot",
            script: "server.js",

            // Options reference: http://pm2.keymetrics.io/docs/usage/application-declaration/
            node_args: "-r dotenv/config", //args to pass to node. Here we instantiate environment
            error_file: "./logs/errors.log",
            out_file: "./logs/out.log",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            args: "",
            exec_mode: "cluster",
            instances: 1,
            autorestart: true,
            watch: false, //specify whether pm2 should automatically restart process when files are updated
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ],

    deploy: {
        production: {
            key: "C:/Users/Marc/.ssh/mlaliberte.pem",
            user: "ubuntu",
            host: "ec2-18-222-60-80.us-east-2.compute.amazonaws.com",
            ref: "origin/master",
            repo: "https://github.com/lalibertemarc/morkhbot.git",
            path: "/home/ubuntu/morkhbot",
            "pre-deploy-local" : "ssh -i C:/Users/Marc/.ssh/mlaliberte.pem ubuntu@ec2-18-222-60-80.us-east-2.compute.amazonaws.com ./deploy_production/.env ubuntu@ec2-18-222-60-80.us-east-2.compute.amazonaws.com:/home/ubuntu/morkhbot/",      
            "post-deploy": "mv /home/ubuntu/morkhbot/.env ./.env && export PATH=$PATH:/home/ubuntu/morkhbot/ && npm install && pm2 startOrRestart ecosystem.config.js --env production && pm2 update"
        }
    }
};
