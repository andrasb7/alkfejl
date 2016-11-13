'use strict'

const Lucid = use('Lucid')

class Type extends Lucid {
    subjects () {
        return this.hasMany('App/Model/Subject')
    }
}

module.exports = Type
