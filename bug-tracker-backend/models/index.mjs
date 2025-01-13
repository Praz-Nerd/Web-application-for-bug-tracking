import { Sequelize } from "sequelize";
import createUser from './user.mjs'
import createProject from './project.mjs'
import createBug from './bug.mjs'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

const User = createUser(sequelize, Sequelize)
const Project = createProject(sequelize, Sequelize)
const Bug = createBug(sequelize, Sequelize)

//relationships
//user can create many projects
User.hasMany(Project, { as: 'createdProjects', foreignKey: 'creatorId' })
Project.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' })

//user can be tester for many projects
User.belongsToMany(Project, { as: 'testingProjects', through: 'userProjects' })
Project.belongsToMany(User, { as: 'testers', through: 'userProjects' })

//user can be part of many projects
User.belongsToMany(Project, { as: 'participatingProjects', through: 'userParticipations' })
Project.belongsToMany(User, { as: 'participants', through: 'userParticipations' })

//project can have many bugs
Project.hasMany(Bug, { as: 'Bugs', foreignKey: 'projectId' })
Bug.belongsTo(Project, { as: 'Project', foreignKey: 'projectId' })

//sync database
try {
    await sequelize.sync()
} catch (error) {
    console.warn(error)
    process.exit(1)
}

//export the classes
export default {
    User,
    Project,
    Bug
}