const mysql         = require('mysql2');
const connection    = mysql.createPool({
    host : "31.31.198.237",
    database : "u0215623_front-tricks",
    user : "u0215623_front-tricks",
    password : "j6;ZeI7^3AHf"
}).promise();



class Logs {
    async addLog(login){
        let sqlScript = `INSERT INTO logs_wb (login, date, action) VALUES ('${login}', '${new Date()}', 'download img')`;
        await connection.query(sqlScript)
    }

    async getLog(){
        let sqlScript = `SELECT * FROM logs_wb`;
        let answer = await connection.query(sqlScript);

        return answer[0];
    }
}

module.exports = new Logs();