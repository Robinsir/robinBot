const localStorage = require('./util/localStorage.js');
const {ContactGender} = require('wechaty-puppet');

let Bot = null; 
async function initRoomWatch () {
    const room = await getRoomInstance(Bot,3);
    console.log('get room...',room);
    
    // TODO: add to save id, may fail

    // console.log('this.ROOM.id: ', this.Room.id);
    // localStorage.setItem('room_id',this.Room.id);

    const topic = await room.topic();
    console.log('get current topic...',topic);
    
    const members = await room.memberList()
    console.log('get members list...',members.length);
    
    let info = computedMembers(members);
    console.log(`Auto RoomWatch is Runing...\n current members number ${members.length}, current topic is ${topic} \n boy is ${info.boy}, girl is ${info.girl},The boyrate is ${info.boyRate},girlrate is ${info.girlRate},unknown is ${info.unknown}, \n If you're not my friend, I can't realize who you are...So I will very happy if you add me as friend...`);
    
    // room.say('启动',)

    //leave event
    room.on('leave', onLeave)

     // Event: Topic Change
    room.on('topic', onTopic)
    
}

/**
 * handle on leave
 */
async function onLeave(leaverList, remover){

    console.log('Oops ! some one leave... Say Goodbye to',leaverList.join(),"It's"+remover||'unknown'+"removed");
    const members = await room.memberList();
    console.log('Change topic to '+members.length);
}

/**
 * handle on topic
 */
async function onTopic(topic, oldTopic, changer){
    console.log(`Damn it ! Topic has changed from ${oldTopic} to ${topic} by ${changer.name()}, Topic Allow Change 30 second.`);

    await delayMs(30000);

    console.log('TimeUp! Change Topic...');
    

    const members = await room.memberAll();
    const topic = await room.topic(members.length+'角恋');
    
    console.log('Resolved!');
}

async function getRoomInstance(bot,rotate){
    let roomId = null
    try{
        roomId = localStorage.getItem('room_id');
    }catch (e) {
        console.log(e);
    }

    let room = null;
    if(roomId){
        room = bot.Room(roomId);
    }else{
        room = await bot.Room.find({ topic: /角恋$/i });
        localStorage.setItem('room_id',roomId);
    }

    //retry again 
    if(rotate&&!room){
        getRoomInstance(bot,rotate--); 
    }
    
    return room;
}

/**
 * computed members
 */
function computedMembers(membersList){

    //get sex
    let boy = 0,girl = 0,unknown = 0,boyRate = 0,girlRate = 0;
    for(let member of membersList){
        if(member.gender() == ContactGender.Male){
            boy++;
        }else if (member.gender() == ContactGender.Female){
            girl++;
            console.log(member);
        }else{
            unknown++;
        }
    }
    
    //count rate
    total = (boy+girl+unknown)
    boyRate = (boy/total).toFixed(2);
    girlRate = (girl/total).toFixed(2);
    return {boy,girl,boyRate,girlRate,unknown};
}

/**
 * delayTime
 * @param {ms} ms 
 */
function delayMs(ms){
    return new Primose((resolved)=>{
        setTimeout(resolved, ms);
    });
}

module.exports = function(bot){
    Bot = bot;
   bot.on('login',initRoomWatch);
}


