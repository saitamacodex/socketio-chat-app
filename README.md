## Real-Time Chat Application (Socket.IO)

A real-time chat application built using **Node.js, Express, and Socket.IO** that supports room-based messaging similar to group chats (like WhatsApp groups).

---

## 🚀 Features

* Real-time bidirectional communication using WebSockets
* Room-based chat (multiple groups)
* Username-based messaging (instead of socket IDs)
* Multiple users can join and chat in the same room
* Lightweight frontend using vanilla JavaScript

(edge cases are yet to update) ☠️ on UI 

---

## Architecture Overview

```
                ┌───────────────────────────┐
                │        Client (Browser)   │
                │---------------------------│
                │ - Enter username          │
                │ - Enter room ID           │
                │ - Send messages           │
                └────────────┬──────────────┘
                             │
                             │ WebSocket (Socket.IO)
                             │
                ┌────────────▼──────────────┐
                │      Node.js Server       │
                │---------------------------│
                │ Express (HTTP Layer)      │
                │ - Serves static files     │
                │                           │
                │ Socket.IO (Realtime Layer)│
                │ - Manages connections     │
                │ - Handles events          │
                │ - Manages rooms           │
                │                           │
                │ In-Memory Storage         │
                │ - socket.data (username)  │
                │ - room mappings           │
                └────────────┬──────────────┘
                             │
                             │ Broadcast to room
                             │
                ┌────────────▼──────────────┐
                │    Other Clients (Same Room)
                └───────────────────────────┘
```

---

## 🔄 Flow Explanation

1. User opens the app in browser
2. Enters:

   * Username
   * Room ID
3. Client emits:

   ```js
   socket.emit("join-room", { roomId, username });
   ```
4. Server:

   * Adds user to room using `socket.join(roomId)`
   * Stores username in `socket.data`
5. When user sends a message:

   ```js
   socket.emit("client-send-msg", { roomId, message });
   ```
6. Server broadcasts message to that room:

   ```js
   io.to(roomId).emit("server-receive-msg", data);
   ```
7. All users in that room receive the message instantly

---

## 📁 Project Structure

```
.
├── public/
│   └── index.html        # Frontend UI
├── room_server.js        # Express + Socket.IO server
└── package.json
```

---

## 🧪 How to Run

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the server:

   ```bash
   node room_server.js
   ```

3. Open in browser:

   ```
   http://localhost:8181
   ```

4. Open multiple tabs and:

   * Enter same room ID
   * Start chatting 🎉

---

## Limitations

* Data is stored in memory (no database)
* Rooms are not persistent (lost on server restart)
* Not scalable across multiple servers (requires Redis adapter)

---

## 🛠️ Tech Stack

* Node.js
* Express
* Socket.IO
* HTML, CSS, JavaScript

---

## 📌 Key Concepts Demonstrated

* WebSocket communication
* Event-driven architecture
* Room-based broadcasting
* Client-server real-time messaging

---

## 📷 Demo Idea

Open multiple tabs with same room ID to simulate multiple users chatting in real time.

UI is not that great 😀

<img width="1191" height="856" alt="image" src="https://github.com/user-attachments/assets/b07ab38e-a705-4cae-8387-95eb28c3c2d3" />

---

## 🤝 Contribution

Feel free to fork and improve this project!
