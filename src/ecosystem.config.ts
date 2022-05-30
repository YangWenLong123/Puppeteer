/**
 * @description pm2配置文件，文件名称不可修改
 */
module.exports = {
  apps : [
      {
        name: "EDC.node", //项目名称
        script: "./main.js", //入口文件
        watch: true,
        instances: 4, //分配到4个cpu上 取决于cpu数量 可设置max,所有cpu
        exec_mode : "cluster", //实例之间进行负载平衡
        max_memory_restart: '30720M', //堆内存30G自动重启，不会中断服务，已测试
        env: { //开发环境
            "PORT": 43365,
            "NODE_ENV": "local"
        },
        env_dev: { //dev环境
            "PORT": 43365,
            "NODE_ENV": "dev"
        },
        env_test: { //测试环境
            "PORT": 43365,
            "NODE_ENV": "test"
        },
        env_uat: { //uat环境
            "PORT": 43369,
            "NODE_ENV": "uat"
        },
        env_prod: { //生产环境
            "PORT": 43367,
            "NODE_ENV": "prod"
        }
      }
  ]
}