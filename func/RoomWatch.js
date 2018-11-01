async function initRoomWatch () {
    const room = await this.Room.find({ topic: /角恋$/i });
    console.log('get room...',room);
    
    // TODO: add to save id
    const topic = await room.topic();
    console.log('get current topic...',topic);
    
    const members = await room.memberList()
    console.log('get members list',members);
    

    //leave event
    room.on('leave', (leaverList, remover) => {

        // log.info('Bot', 'Room EVENT: leave - "%s" leave(remover "%s"), byebye', leaverList.join(','), remover || 'unknown')
      })

       
     // Event: Topic Change
    room.on('topic', (topic, oldTopic, changer) => {
        // log.info('Bot', 'Room EVENT: topic - changed from "%s" to "%s" by member "%s"',
        //       oldTopic,
        //       topic,
        //       changer.name(),
        //   )
      })
    
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
    console.log(`topic changed from ${oldTopic} to ${topic} by ${changer.name}`);
}
module.exports = function(bot){
   bot.on('login',initRoomWatch);
}