const pool = require('../database/database.cjs'); 

class DiscordUser {
    _discordId;
    _userName;

    constructor(discordId, userName) {
        this.discordId = discordId;
        this.userName = userName;
    }

    get discordId() {
        return this._discordId;
    }

    get userName() {
        return this._userName;
    }

    set discordId(discordId) {
        this._discordId = discordId;
    }

    set userName(userName) {
        this._userName = userName;
    }
    
}

class UserUtils {
    static async getUser(discordId) {
        try {
            const [rows] = await pool.promise().query('SELECT * FROM user_data WHERE discord_id = ?', [discordId]);
            if (rows.length < 1) return false;
            const discord_Id = rows[0].discord_id;
            const userName = rows[0].discord_username;
            return new DiscordUser(discord_Id, userName);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async createUser(discordId, userName) {
        try {
            const [rows] = await pool.promise().query('INSERT INTO user_data (discord_id, discord_username) VALUES (?, ?)', [discordId, userName]);
            return new DiscordUser(discordId, userName);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteUser(discordId) {
        try {
            const [rows] = await pool.promise().query('DELETE FROM users WHERE discord_id = ?', [discordId]);
            return rows;
        } catch (err) {
            throw new Error(err);
        }
    }
}


module.exports = UserUtils;
