let execSync = require('child_process').execSync;
let fs = require('fs');
let path = require('path');

module.exports = () => {

    console.log('');
    console.log('正在下载 Vundle 包信息...');
    console.log('');

    if (fs.existsSync(path.join(process.env['HOME'], '.vim', 'bundle', 'Vundle.vim'))) {
        console.log('操作失败：Vundle 包已经安装。');
        console.log('');
        return false;
    }

    try {
        execSync('git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim');
        console.log('');
        console.log('安装完成，现在请使用 --download-config 参数将配置文件写入家目录中。');
        console.log('');
    } catch (e) {
        console.log(e.message);
    }
};