'use strict'

const Lucid = use('Lucid')

class Subject extends Lucid {
    type () {
        return this.belongsTo('App/Model/Type')
    }
}

module.exports = Subject
