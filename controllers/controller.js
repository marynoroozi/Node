const autoBind = require("auto-bind");

// این کنترلر برای اینه که یک سری کارها که بین همه کنترلرهای ما چه یوزر باشه چه پروداکت یا هرچیز دیگه ای ممکنه ثابت باشه، اون هارو میزاریم در این فایل
// و چون این کلاس هست، میگیم که ککنترلرهای دیگه که اونا هم کلاس هستن از این ارثبری بکنند
class Controller {
  constructor() {
    autoBind(this);
  }

  error(message, status) {
    let err = new Error(message);
    err.status = status;
    throw err;
  }
}
module.exports = Controller;
