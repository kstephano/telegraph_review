const db = require ('../dbConfig');

class Article {
    constructor(data){
        this.id = data.id;
        this.path = data.path;
        this.title = data.title;
        this.name = data.name;
        this.archive_date = data.archive_date;
        this.description = data.description;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const articlesData = await db.query(`SELECT * FROM articles;`)
                const articles = articlesData.rows.map(a => new Article(a))
                resolve(articles);
            } catch (err) {
                reject("Error retrieving Articles")
            }
        });
    }

    static findByPath (path) {
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`SELECT * FROM articles WHERE path = $1;`, [ path ]);
                let article = new Article(articleData.rows[0]);
                resolve (article);
            } catch (err) {
                reject('Article not found');
            }
        });
    } 

    static create(data) {
        return new Promise (async (resolve, reject) => {
            try {
                let articleData = await db.query(`INSERT INTO articles (path, title, name, archive_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [ data.path, data.title, data.name, data.archive_date, data.description ]);
                let newArticle = new Article(articleData.rows[0]);
                resolve (newArticle);
            } catch (err) {
                reject('Error creating Article');
            }
        });
    }

    static update(data) {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedArticle = await db.query('UPDATE articles SET title = $1, name = $2, archive_date = $3, description = $4 WHERE path = $5 RETURNING *;', [data.title, data.name, data.archive_date, data.description, data.path ]);
                resolve(updatedArticle);
            } catch (err) {

            }
        })
    }
}

module.exports = Article;