import {Author} from "../../domain/Entities/Author"
import {Quote} from "../../domain/Entities/Quote"

export function setupAssociations():void{
    Quote.belongsTo(Author, {
        foreignKey: "author_id",
        as: "said_by"
    })
    Author.hasMany(Quote, {
        foreignKey: "author_id",
        as: "quotes"
    })
}