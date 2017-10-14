let Table = require('table');

/**
 * 结构化输出
 * @param data {Array}
 */
let table = (data) => {
    return Table.table(data, {border: Table.getBorderCharacters('ramac')});
};

exports.table = table;