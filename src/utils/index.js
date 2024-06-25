class utils {
  /**
   *
   * 时间戳转换日期
   *
   * @param {String} value 传入的时间戳
   * @param {String} String 返回的时间
   */
  formatDate(value) {
    if (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    } else {
      return ''
    }

  }

  /**
   * 循环对象
   *
   * @param {Object|Array} obj 传入的值
   * @param {Function} fn 为每个项调用的回调
   */
  forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') return

    // 如果还没有可写的东西，就强制一个数组
    if (typeof obj !== 'object') obj = [obj]

    if (this.isArray(obj)) {
      // 数组循环
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj)
      }
    } else {
      // 对象循环
      for (var key in obj) {
        /* 是否具有键 */
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj)
        }
      }
    }
  }

  /**
   * 确定值是否为数组
   *
   * @param {Object} val 传入的值
   * @returns {boolean} 如果值是数组，则为True，否则为false
   */
  isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  /**
   * 确定值是否为对象
   *
   * @param {Object} obj 传入的对象
   * @returns {String} 返回类型
   */
  getObjClass(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }

  /**
   * 深度克隆
   *
   * @param {Object} obj 传入需要克隆的对象
   * @returns {Object} 返回克隆好的对象
   */
  deepClone(obj) {
    let result
    let objClass = this.getObjClass(obj)

    if (objClass === 'Object') {
      result = {}
    } else if (objClass === 'Array') {
      result = []
    } else {
      return obj // 如果是其他数据类型不复制，直接将数据返回
    }

    // 遍历目标对象
    for (let key in obj) {
      let value = obj[key]
      result[key] = this.deepClone(value)
    }

    return result
  }


  /**
   * 递归合并两个对象
   *
   * @param {*} target
   * @param {*} sources
   * @return {*}
   * @memberof Common
   */
  assiginObj(target, sources) {
    let obj = target
    if (typeof target != 'object' || typeof sources != 'object' || typeof target) {
      return sources // 如果其中一个不是对象 就返回sources
    }
    for (let key in sources) {
      if (target.hasOwnProperty(key)) {
        obj[key] = this.assiginObj(target[key], sources[key])
      } else {
        // 不存在就直接添加
        obj[key] = sources[key]
      }
    }
    return obj
  }

  /**
  * 判断form对象的值是否有空
  * @param {Object} obj
  */
  objectValueHaveEmpty(obj) {
    let isEmpty = false;

    if (!obj.required) {

      return false
    } else {
      Object.keys(obj).forEach(item => {
        if (obj[item] === null || obj[item] === "") {
          if (item == 'btn_name' || item == 'value1' || item == 'select_value' || item == 'value2' || item == 'remark') {
          } else {
            console.log(item)
            isEmpty = true
            return
          }
        }
      });
    }
    console.log(isEmpty)
    return isEmpty;
  }
  /**
  * 判断添加字段对象的值是否有空
  * @param {Object} obj
  */
  fieldObjectValueHaveEmpty(obj) {
    let isEmpty = false;
    Object.keys(obj).forEach(item => {
      if (obj[item] === "") {
        isEmpty = true;
      }
    });
    return isEmpty;
  }


  /**
   * 创建cookie
   *
   * @param {String} name cookie的key
   * @param {String} value cookie的value
   * @param {String} exdays 存储天数 默认存储一天
   */
  setCookie(name, value, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
  }

  /**
    * 获取cookie
    *
    * @param {String} cname cookie的key
    */
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
  }
  /**
   * 将时间戳更改为日期格式
   * @param {String} nS  时间戳
   */
  getTimeAccurate(nS) {
    var date = new Date(nS); //获取一个时间对象
    let y = date.getFullYear(); // 获取完整的年份(4位,1970)
    let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let d = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate(); // 获取日(1-31)
    let t = date.getTime() < 10 ? '0' + (date.getTime()) : date.getTime(); // 获取时间(从1970.1.1开始的毫秒数)
    let h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours(); // 获取小时数(0-23)
    let mm = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes(); // 获取分钟数(0-59)
    let s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds(); // 获取秒数(0-59)
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
  };
  /**
   * 获取时间区间
   * @param {String} start  开始时间
   * @param {String} end  结束时间
   */
  getTimeSection(start, end) {
    let startTime = this.getTimeAccurate(start);
    let endTime = this.getTimeAccurate(end);
    return [startTime, endTime]
  }

}

export default new utils()
