const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../models/Members')


// get all members 
router.get('/', (req, res)=>{
    res.json(members)
})

// Get single member
router.get('/:id', (req, res)=>{

    const single_member = members.filter( member => member.id == req.params.id )
    
    console.log(" this is found ", single_member);

    if(single_member.length){
        res.json(single_member)
    }else{
        res.status(400).json({ msg: `No member found with the id : ${req.params.id}` } )
    }
})

//Create member 
router.post('/', (req, res)=>{
    // res.send(req.body)

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email ){
        return res.status(400).json( { msg: ' Please include name and email'})
    }

    members.push(newMember)
    res.json(members)

    // res.redirect('/')
    
})

// Update member 

router.put('/:id', (req, res)=>{

    const for_update = members.some( member => member.id == req.params.id )
    

    if(for_update){
        const to_update = req.body

        members.forEach(member =>{
            if(member.id == req.params.id){
                member.name = to_update.name ? to_update.name : member.name
                member.email = to_update.email ? to_update.email : member.email
                res.json({ 
                    msg: 'Member updated',
                    member
                })
            }
           
        })
    }else{
        res.status(400).json({ msg: `No member found with the id : ${req.params.id}` } )
    }
})

// router.delete('/:id', (req, res)=>{
//     console.log('you have reached delete');
// })
// delete member 

router.delete('/:id', (req, res)=>{

    const to_delete = members.some(member => member.id == req.params.id)

    if(to_delete){
        const updated_members = members.filter( member => member.id != req.params.id)
        res.json({ msg: 'Member deleted', updated_members })
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
})


module.exports = router