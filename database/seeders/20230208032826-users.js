'use strict'
const uuid = require('uuid')
const { Op } = require('sequelize')
const { hashPassword } = require('../../libs/bcrypt')
const models = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const adminUsers = [
      {
        id: 1,
        first_name: 'TEST',
        last_name: 'TEST LN',
        email: 'example@academlo.com',
        user_name: 'example@academlo.com',
        password: hashPassword('12345678910'),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]
    const adminRoleId = 2
    const countryId = 1
    const profiles = adminUsers.map((user, idx) => {
      return { 
        id: uuid.v4(),
        user_id: user.id, 
        role_id: adminRoleId, 
        country_id: countryId,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    try {
      await queryInterface.bulkInsert('Users', adminUsers, { transaction })
      await queryInterface.bulkInsert('Profiles', profiles, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = [
      'example@academlo.com',
    ]

    try {
      const users = await queryInterface.select(models.User, 'Users', {
        where: {
          user_name: {
            [Op.in]: userNames
          }
        }
      })
      await queryInterface.bulkDelete(
        'Profiles',
        {
          user_id: {
            [Op.in]: users.map(u => u.id)
          }
        },
        { transaction }
      )
      await queryInterface.bulkDelete(
        'Users',
        {
          id: {
            [Op.in]: users.map(u => u.id),
          },
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
