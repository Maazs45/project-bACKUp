require('../models/database');
const res = require('express/lib/response');
const { json, render } = require('express/lib/response');
const { system } = require('nodemon/lib/config');
const category = require('../models/Category');

 const Information = require('../models/information');
 const { search } = require('../routes/gameRoutes');


     exports.homepage = async(req,res) =>{

    
    try {
        const limitNumber = 5;
        const Categories = await category.find({}).limit(limitNumber);
        const latest = await Information.find({}).sort({_id: -1}).limit(limitNumber);
        const shooter = await Information.find({'category': 'shooting'}).limit(limitNumber);
        const racing = await Information.find({'category': 'racing'}).limit(limitNumber);
        const simulation = await Information.find({'category': 'simulation'}).limit(limitNumber);
        const darkfantasy = await Information.find({'category': 'darkfantasy'}).limit(limitNumber);
        const point = await Information.find({'category': 'pointandclick'}).limit(limitNumber);
        const nocategory = await Information.find({'category': 'nocategory'}).limit(limitNumber);
        
        const games ={latest, shooter, racing, simulation,darkfantasy, point, nocategory};





        res.render('index', { title: 'Gaming Blog - Home', Categories , games});

    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
    








    }




    










    exports.exploregames = async(req,res) =>{

    
        try {
           
            let gameId= req.params.id;
            const game= await Information.findById(gameId);
    
    
    
            res.render('games', { title: 'Gaming Blog - Genres', game });
    
        } catch (error) {
            res.status(500).send({message: error.message || "Error occured"});
        }
        }

    exports.searchgames= async(req,res)=>{


        try {
           let searchTerm= req.body.searchTerm;
           let game= await Information.find({$text:{ $search: searchTerm, $diacriticSensitive: true}});
           res.render('search', {  title: 'Gaming blog - Games' , game });

        } catch (error) {
            res.status(500).send({message: error.message || "Error occured"});
        }







        
    }


    exports.exploreLatest= async(req,res)=>{
    try {
       const limitnumber=20;
       const game= await Information.find({}).sort({_id: -1}).limit(limitnumber);
       res.render('explore-latest', {title: 'Gaming-blog - Game', game}); 
    } catch (error) {
        
    }
    }



    exports.randomarticle= async(req,res)=>{
    try {
       let count = await Information.find().countDocuments();
       let random= Math.floor(Math.random()*count);
       let game = await Information.findOne().skip(random).exec();

       res.render('random-article', {title: 'Gaming-blog - Game', game}); 
    } catch (error) {
        
    }
 }


exports.submitgame= async(req, res)=>{
    const infoerrorObj= req.flash('infoErrors');
    const infosubmitObj= req.flash('infoSubmit');
    res.render('submit-game', {title : 'Gaming blog save information', infoerrorObj , infosubmitObj});
}

exports.submitgameonpost=  async(req,res)=>{

    try {
        let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

        let newGames= new Information({
            name: req.body.name,
            description: req.body.description,
            releaseyear: req.body.releaseyear,
            review: req.body.review,
            category: req.body.category,
            image: newImageName



        });

        await newGames.save();
        req.flash('infoSubmit','submitted');
        res.redirect('/submit-game');
        
    } catch (error) {
       
        req.flash('infoErrors','not submit');
        console.log(error);
        res.redirect('/submit-game');
    }
}


exports.deletedata= async(req,res)=>{


    Information.findByIdAndDelete({_id: req.params.id}, (err,docs )=>{
        if(err){
            console.log(err)
            
            
        }else{
            console.log("success")
            res.redirect('/');
        }

    })
    
}

exports.updatedata= async(req,res) =>{
    Information.findByIdAndUpdate({_id: req.params.id},req.body, (err,docs)=>{
        if(err){
            console.log(err);
        }else{
            
            res.render('edit', {Information: docs})
        }

    } )
}
 

exports.updatedataonpostnew= async(req,res)=>{
    delete req.body.image;
    Information.findOneAndUpdate({_id: req.params.id},req.body,{new : true}, (err,docs)=>{
        if(err){
            console.log(err);
        }else{
            
            res.redirect('/')
        }

    } )
}

exports.contact=async(req, res)=>{
    try {
        res.render('contact');
    } catch (error) {
        
    }
    
}

exports.about=async(req, res)=>{
   try {
    res.render('about');
}
   catch (error) {
       console.log(error);
   }
}