'use strict'

const Schema = use('Schema')

class SubjectsTableSchema extends Schema {

  up () {
    this.create('subjects', (table) => {
      table.increments()
      table.integer('semester')
      table.string('name').notNullable().unique()
      table.integer('credit')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('type_id').unsigned().references('id').inTable('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('subjects')
  }

}

module.exports = SubjectsTableSchema
