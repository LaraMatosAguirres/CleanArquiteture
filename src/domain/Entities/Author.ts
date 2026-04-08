import {DataTypes, Model} from "sequelize"
import sequelize from "../../infraestructure/database/database"
import {IAuthor} from "../Interfaces/IAuthor"

export class Author extends Model<IAuthor> implements IAuthor{
    public id?: number;
    public name!: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "authors",
    timestamps: true,
  }
);
