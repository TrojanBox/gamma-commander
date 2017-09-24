
  命令开发手册

    1. 在目录 ./command 中创建一个新文件夹，并以命令名为文件名（文件名只应该存在 /[\w\d-]+/）

    2. 新建文件 index.js

    3. 在文件中添加如下代码

      // 将 Commander 引入到项目中
      var Commander = require('../../components/commander');

      // 为文件导出一个默认函数
      module.exports = (argv) => {

          // 创建 Commander 对象
          let commander = new Commander();

          // 设置对象属性
          commander.setConf({
            title: '标题',
            description: '描述',
            version: '版本信息',
            author: '作者',
            homepage: '主页'
          });

          // 声明，参数
          commander.declare('-f, --full-name', '设置短、长参数名');
          commander.declare('--long-name', '只设置长参数名');
          commander.declare('-s', '只设置短参数名');
          commander.declare('-m <path>', '设置一个必填参数');
          commander.declare('-p [path]', '设置一个选填参数');
          commander.declare('-a, --all <source> [path]', '完全');
          commander.declare('-A, --alone', '添加一条独立参数，此参数执行后停止检索', true);

          // 声明，命令
          commander.declare('cache-one-param <path>', '设置一个命令，捕捉其后面的一个必填参数');
          commander.declare('cache-one-param [path]', '设置一个命令，捕捉其后面的一个选填参数');
          commander.declare('cache-all-param', '设置一个命令，捕捉其后面的全部参数');

          // 实现，监听
          // 注册 -f, --full-name 的监听事件
          commander.implement('--full-name', () => {});

          // 注册 -f, --full-name 的监听事件，此时两个监听事件共存
          // 当命令存在 -f 或 --full-name 参数时都会执行
          // 推荐监听长参数名，否则当参数过多时容易出现混乱
          commander.implement('-f', () => {});

          // 覆盖 -f, --full-name 的监听事件，删除之前绑定的全部监听事件并添加新事件
          commander.implement('-f', () => {}, false);

          // 卸载 -f, --full-name 的监听事件，删除所有监听事件
          commander.implement('-f');

          // 监听
          commander.listen(argv);
      }

    4. 新建文件 declare.js

    5. 在文件中添加如下代码

      module.exports = {
          name: 'command',                   // 定义命令名称
          option: 'command <path>',          // 定义命令使用方式
          description: 'description',        // 定义命令描述
      };

    6. 开发完成

  Commander 对象

    setConf()                                                   // 设置对象信息
    declare(flag: string, desc: string, call: function)         // 声明
    implement(flag: string, call: function, clearEvent: bool)   // 实现
    listen(argv: array)                                         // 监听

  已经注册的默认事件

    NullParameter                 当未传入任何参数时事件被执行
    Argv                          在任何情况下都会被执行
    Continue                      当执行的命令中不存在“单指令”时执行
    ExampleHelper                 当运行参数 -h, --help 时执行

  TIPS

    -h, --help 为命令默认参数，虽然可以覆盖但不推荐这样做
    命令允许编写多层子命令，只要你不嫌命令过深
