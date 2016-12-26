'use strict'

const Database = use('Database')
const Type = use('App/Model/Type')
const Subject = use('App/Model/Subject')
const Validator = use('Validator')

class SubjectController {

  * index(request, response) {
    // const types = yield Database.from('types').select('*');
    // response.send(types)

    const types = yield Type.all()

    for(let type of types) {
      const subjects = yield type.subjects().fetch();
      type.topSubjects = subjects.toJSON();
    }
  
       yield response.sendView('main', {
      name: '',
      types: types.toJSON()
    }) 
  }

  * create (request, response) {
    const types = yield Type.all()
    yield response.sendView('subjectCreate', {
      types: types.toJSON()
    });
  }

  * doCreate (request, response) {
    const subjectData = request.except('_csrf');

    const rules = {
      name: 'required',
      semester: 'required',
      credit: 'required',
      type_id: 'required'
    };

    const validation = yield Validator.validateAll(subjectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    subjectData.user_id = request.currentUser.id
    const subject = yield Subject.create(subjectData)
    // response.send(subject.toJSON())
    response.redirect('/')
  }

  * edit (request, response) {
    const types = yield Type.all()
    const id = request.param('id');
    const subject = yield Subject.find(id);
    // console.log(subject.toJSON())

    if (request.currentUser.id !== subject.user_id && request.currentUser.id !== 1) {
      response.unauthorized('Access denied.')
      return
    }


    yield response.sendView('subjectEdit', {
      types: types.toJSON(),
      subject: subject.toJSON()
    });
  }

  * doEdit (request, response) {
    const subjectData = request.except('_csrf');

    const rules = {
      name: 'required',
      semester: 'required',
      credit: 'required',
      type_id: 'required'
    };

    const validation = yield Validator.validateAll(subjectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    const id = request.param('id');
    const subject = yield Subject.find(id);

    // Object.assign(subject, subjectData)
    
    subject.name = subjectData.name;
    subject.semester = subjectData.semester; 
    subject.credit = subjectData.credit;
    subject.type_id = subjectData.type_id;

    yield subject.save()
    
    response.redirect('/')
  }

  * show (request, response) {
    const id = request.param('id');
    const subject = yield Subject.find(id);
    yield subject.related('type').load();
    // response.send(subject.toJSON())

    yield response.sendView('subjectShow', {
      subject: subject.toJSON()
    })
  }

  * doDelete (request, response) {
    const id = request.param('id');
    const subject = yield Subject.find(id);

    if (request.currentUser.id !== subject.user_id && request.currentUser.id !== 1) {
      response.unauthorized('Access denied.')
      return
    }

    yield subject.delete()
    response.redirect('/')
  }

  * ownList(request,response){
    const types = yield Type.all()

    for(let type of types) {
      
        const subjects = yield type.subjects().fetch();

        var subjects2 = subjects.filter(i => i.user_id == request.currentUser.id) ;
        /*if(request.user_id == 1){
          type.topSubjects = subjects.toJSON();
        }
        else{*/
          if(request.currentUser.id == 1){
            type.topSubjects = subjects.toJSON();
          }else{
            type.topSubjects = subjects2.toJSON();
          }
      //  }


    }

    yield response.sendView('main', {
      name: '',
      types: types.toJSON()
    })  

    
  }

  * search(request, response){
const types = yield Type.all()
var search = request.input('search');

    for(let type of types) {
      const subjects = yield type.subjects().fetch();
      var subjects2 = subjects.filter(i => i.name.indexOf(search) > -1);
      type.topSubjects = subjects2.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      types: types.toJSON()
    })  
  }
  

  * doSearch(request, response){
    console.log("dosearch");
  }

    * ajaxDelete(request, response) {
    const id = request.param('id');
    const subject = yield Subject.find(id);
    if(subject){
      if(request.currentUser.id !== subject.user_id && request.currentUser.id !== 1){
        response.ok({
           succes:false 
        })
        return;
      }
      yield subject.delete()
      
    response.ok({
      succes: true
    })
  }

  }
}

module.exports = SubjectController
