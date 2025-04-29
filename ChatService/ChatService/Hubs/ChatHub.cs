using ChatService.DataService;
using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;

public class ChatHub:Hub
{

	private readonly SharedDb _shared;

	public ChatHub(SharedDb shared) => _shared = shared;
	public async Task JoinChat(UserConnection conn)
	{
		await Clients.All
			.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
	}

	public async Task JoinSpecificChatRoom(UserConnection conn)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);

		_shared.connections[Context.ConnectionId] = conn;

		await Clients.Group(conn.Chatroom)
			.SendAsync("JoinSpecificChatRoom", "admin", $"{conn.Username} has joined");
	}

	public async Task SendMessage(string msg)
	{
		if(_shared.connections.TryGetValue(Context.ConnectionId,out UserConnection conn))
		{
			await Clients.Group(conn.Chatroom)
				.SendAsync("ReceiveSpecificMessage", conn.Username, msg);
		}
	}



}
