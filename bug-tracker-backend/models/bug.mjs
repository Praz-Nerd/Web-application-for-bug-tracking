export default function(sequelize, DataTypes){
    return sequelize.define('bug', {
        severity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}