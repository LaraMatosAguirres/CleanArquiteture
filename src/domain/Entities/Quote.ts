import {DataTypes, Model} from "sequelize"
import sequelize from "../../infraestructure/database/database"
import {IQuote} from "../Interfaces/IQuote"

export class Quote extends Model<IQuote> implements IQuote{
  public id?: number;
  public quote!: string;
  public author_id!: number;
  public createdAt?: Date;
  public updatedAt?: Date;  
}

Quote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quote: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "authors",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "quotes",
    timestamps: true,
  }
);

export default Quote;