const Message = require("../model/messageModel");

module.exports.addMessage = async (req,res,next) => {
    console.log(req.body)
    try{
        const {from,to,message} = req.body;
    
        const data = await Message.create({
            message: {text:message},
            users: [from,to],
            sender: from,
        }); 

        if(data){
            return res.json({msg:"Message added successfully"});
        }
        res.json({msg:"Failed to add message to the database"});
    }
    catch(err){
        next(err);
    }
}; 

module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;

       const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        })
            .sort({ updatedAt: 1 }); 

       const projectedMessages = messages.map((msg) => ({
            fromSelf: msg.sender.toString() === from,
            message: msg.message?.text || "", // Safely access text
        }));
        // console.log("Projected Messages:", projectedMessages);

        return res.json(projectedMessages);
    } catch (err) {
        console.error("Error fetching messages:", err.message);
        next(err);
    }
};

