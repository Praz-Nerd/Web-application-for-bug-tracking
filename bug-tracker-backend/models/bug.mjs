export default function(sequelize, DataTypes){
    return sequelize.define('bug', {
        severity: {
            type: DataTypes.ENUM,
            allowNull: false,
            values:['LOW', 'MEDIUM', 'HIGH']
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
            defaultValue: false
        },
        resolvedLink:{
            type: DataTypes.STRING,
            defaultValue:null
        }
    })
}