module.exports.startChat = function(application, req, res){
    var dataForm = req.body;

    req.assert('username', 'Preencha o campo de Nome ou Apelido').notEmpty();
    req.assert('username', 'O campo Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3,15);

    var errors = req.validationErrors();

    if (errors){
        res.render('home/index', {errors: errors});
        return;
    }

    application.get('io').emit('msgToClient',
        {username: dataForm.username, msg: 'acabou de entrar no chat'});

    res.render('chat/chat', {dataForm: dataForm});    
};