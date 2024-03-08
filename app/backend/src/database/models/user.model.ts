import { Model,
  InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import db from '.';

class user extends Model<InferAttributes<user>, InferCreationAttributes<user>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

user.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  modelName: 'Users',
  timestamps: false,
  sequelize: db,
});

export default user;
