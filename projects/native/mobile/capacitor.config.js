/**
 * @type {import('@capacitor/cli').CapacitorConfig}
 */
const config = {
  appId: "io.github.eric.chaosign",
  appName: "学习通签到",
  webDir: "www",
  server: {
    url: process.env.SERVER_URL || "http://localhost:3000",
    cleartext: true,
  },
};

module.exports = config;
