module.exports = function(app,database){
    var ObjectID = require('mongodb').ObjectID;
    var userCollection = database.collection('users');
// Get Requests
    app.get('/', function(req,res){
       res.render('../views/pages/index');
    });

    // app.get('/UserRegistration', (req, res)=>{
    //     res.sendFile('index.html', {root: 'views' });
    // });
    // 2. User List 
    app.get("/UsersList",(request,response)=>{
        userCollection.find().toArray(function(error,documents){
            if(error){
               throw error;
            }else{
                response.render('../views/pages/usersList',{"documents":documents});
            }
        });
    });
    // 3. 
    app.get("/UsersUpdate/:id",(request,response)=>{
        var id = request.params.id;
        userCollection.find({'_id': ObjectID(id)}).toArray(function(error,documents){
            if(error){
               throw error;
            }else{
                console.log(documents);
                response.render('../views/pages/update',{"documents":documents});  
            }
        });
    });

    app.get("/UserRemove/:id",(request,response)=>{
        var id = request.params.id;
        try{
            userCollection.deleteOne(
                {
                    '_id': ObjectID(id)
                })
                .then(
                    result=>{
                        userCollection.find().toArray(function(error,documents){
                            if(error){
                                throw error;
                            }else{
                                response.render('../views/pages/usersList',{"documents":documents});
                            }
                    })
                },reason =>{
                    response.render('../views/pages/index');  
                }
            )        
        }catch(e){
            print(e);
        }
    });


    // Post Requests
    // 1.  User Resgistration
    app.post('/UserRegisterForm', (request, response)=>{
        userCollection.insertOne(request.body)
        //Promise function
        .then(
            //on Success
            result =>{
                response.render('../views/partials/confirmation');            
            },
            // on failure
            reason=>{
                response.render('../views/pages/index');  
           }        
        )
    });

    app.post('/UserInformationUpdate/:id', (request, response)=>{
        var id = request.params.id;
        try{
            userCollection.update(
                {
                    '_id': ObjectID(id)
                },
                {
                    $set:request.body
                }
            ).then(
                // On Sucess
                result =>{
                    userCollection.find().toArray(function(error,documents){
                        if(error){
                           throw error;
                        }else{
                            response.render('../views/pages/usersList',{"documents":documents});
                        }
                    });
                },
                // on failure
                reason =>{
                    response.render('../views/pages/index');  
                }
            );
        } catch (e){
            throw(e);
        }
    });

      
    
}