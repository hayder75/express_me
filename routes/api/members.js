const express = require("express");
const router = express.Router();
const members = require("../../Memebrs");
const uuid = require("uuid");

// get memebrs
router.get("/", (req, res) => {
  res.json(members);
});

// getting a single user
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `we don't have a user with id ${req.params.id}` });
  }
});

// create a memeber

router.post("/", (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name:req.body.name,
        email: req.body.email,
        status  : 'active'
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg:'please include name and email'})
    } 
    members.push(newMember)
    res.json(members)
  });
  
  //update a memebr
  router.put("/:id", (req, res) => {
    const found = members.some((memebr) => memebr.id === parseInt(req.params.id));
  
    if (found) {
      const updateMember = req.body;
      members.forEach(memebr => {
        if (memebr.id === parseInt(req.params.id)) {
          memebr.name = updateMember.name ? updateMember.name : memebr.name;
          memebr.email = updateMember.email ? updateMember.email : memebr.email;
  
          res.json({ msg: "memeber updated", memebr });
        }
      });
    } else {
      res.status(400).json({ msg: "bad request " });
    }
  });

  // delete memeber
  router.delete("/:id", (req, res) => {
    const found = members.some((memebr) => memebr.id === parseInt(req.params.id));
  
    if (found) {
      res.json({
        msg: "user deleted ",
        members: members.filter(
          memebr => memebr.id !== parseInt(req.params.id)
        ) });
    } else {
      res.status(400).json({ msg: "bad request " });
    }
  });
  


  
module.exports = router;
