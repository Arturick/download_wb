const mysql         = require('mysql2');
const connection    = mysql.createPool({
    host : "31.31.198.237",
    database : "u0215623_front-tricks",
    user : "u0215623_front-tricks",
    password : "j6;ZeI7^3AHf"
}).promise();

class User {
    async auth(login, password){
        let sqlScript = `SELECT * FROM users_wb WHERE login = '${login}' and password = '${password}'`;

        let answer = await connection.query(sqlScript);

        return answer[0];
    }
    async addUser(login, password){
        let sqlScript = `INSERT INTO users_wb (login, password, role) VALUES('${login}', '${password}', 1)`;
        await connection.query(sqlScript);
    }
    async deleteUser(id){
        let sqlScript = `DELETE FROM users_wb WHERE id = ${id}`;
        await connection.query(sqlScript);
    }

    async getUser(){
        let sqlScript = `SELECT * FROM users_wb WHERE role != 0`;
        let answer = await connection.query(sqlScript);
        return answer[0]
    }


    async getById(id){
        let sqlScript = `SELECT * FROM users_wb WHERE id = ${id}`;
        let answer = await connection.query(sqlScript);
        return answer[0];
    }
}


module.exports = new User();