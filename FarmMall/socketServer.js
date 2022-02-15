const users=[];
const socketServer = (socket) => {
  socket.on('joinUser',id=>{
      console.log({id});
  })
}

module.export=socketServer