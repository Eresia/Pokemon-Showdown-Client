function AIConnexion() {

	this.server;
	this.host = "127.0.0.1";
	this.port = 8686;
	this.roomID = '';
}

AIConnexion.prototype.createConnexion = function(){
	var connexion = "http://" + this.host + ':' + this.port + "/echo";
	console.log("Try connexion with " + connexion);
	this.server = new SockJS(connexion);

	var self = this;

	this.server.onmessage = function(data) {
		console.log("Receive : " + data.data);
		app.send(data.data, self.roomID);
	};
}

AIConnexion.prototype.sendData = function(data){
	try{
		this.server.send(data);
	}catch (e){
		this.closeConnexion();
		this.createConnexion();
		console.log(e + ", retry");
		this.server.send(data);
	}

}

AIConnexion.prototype.closeConnexion = function(){
	this.server.close();
}

AIConnexion.prototype.setRoomID = function(roomID){
	this.roomID = roomID;
}
