export default function(sequelize, DataTypes){
    return sequelize.define('project', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
        repository: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}