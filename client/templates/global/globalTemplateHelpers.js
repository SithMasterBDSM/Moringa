/**
Versión helper global de la función resourceUrl definida en
/lib/commonClientServerCode/globalFunctions.js
*/
Template.registerHelper("resourceUrl", function(urlSegment)
    {
        return resourceUrl(urlSegment);
    }
);

Template.registerHelper("globalCheckUserRole", function (desiredRole) 
{
    var uid = Meteor.userId();

    if ( !valid(uid) || !valid(desiredRole) ) {
        return false;
    }
    return globalCheckUserRole(uid, desiredRole);
});

/**
Retorna true si hay una sesión de usuario activa.
*/
Template.registerHelper("globalIsUserLoggedIn", function () 
{
    var uid = Meteor.userId();
    
    if ( !valid(uid) ) {
        return false;
    }
    return true;
});

/**                                                                                                                            Esta operación calcula el nombre del usuario actualmente conectado.                                                            Es global a todo el sistema.                                                                                                   */
Template.registerHelper("globalGetCurrentLoggedUsername",
    function () {
        var uid = Meteor.userId();

        if ( !valid(uid) ) {
            return "<Anónimo(usuario no especificado)>";
        }

        var sessionUserName = Session.get("currentLoggedUsername");

        if ( valid(sessionUserName) ) {
            return sessionUserName;
        }

        var user = Meteor.users.findOne({_id:uid});
        if ( !valid(user) ) {
            return "<Anónimo(usuario con id=" + uid + " no encontrado en la base de datos)>";
        }
        if ( !valid(user.profile) ) {
            return "<Anónimo(usuario con id=" + uid + " en la base de datos pero sin perfil)>";
        }
        if ( !valid(user.profile.name) ) {
            return "<Anónimo(usuario con id=" + uid + " en la base de datos pero sin nombre)>";
        }

        Session.set("currentLoggedUsername", user.profile.name);

        return user.profile.name;
    }
);
