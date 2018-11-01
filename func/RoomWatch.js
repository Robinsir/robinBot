async function initRoomWatch () {
    const room = await this.Room.find({ topic: /角恋$/i });
    console.log('get room...',room);
    
    // TODO: add to save id
    const topic = await room.topic();
    console.log('get current topic...',topic);
    
    const members = await room.memberList()
    console.log('get members list',members.length);
    

    //leave event
    room.on('leave', onLeave)

     // Event: Topic Change
    room.on('topic', onTopic)
    
}

/**
 * handle on leave
 */
function onLeave(leaverList, remover){
    console.log('some one leave...',leaverList.join(),remover||'unknown');
}

/**
 * handle on topic
 */
function onTopic(topic, oldTopic, changer){
    console.log(`topic changed from ${oldTopic} to ${topic} by ${changer.name()}`);
}
module.exports = function(bot){
   bot.on('login',initRoomWatch);
}