# Current version v1.0

# Introduction
This is a NodeJS chatting application. I used express expressJS and socketio for the interaction between the client and the server. I used MongoDB as the database.

# How to start
Execute the server.js file. 

In the Login page, open the console and call *register("YOUR_USERNAME_HERE", "YOUR_PASSWORD_HERE")*. Then log in.

## Available users:
- admin  | parol
- John Doe | qwerty

# How does the authetication work
After you enter your login credential, the app stocks the username in *sessionStorage*, and uses that username as the sender when sending a message.
Since the application uses *sessionStorage* every tab has its own, separate username. So you can open 2 or more tabs, log in, and start chatting. 

# How does the messages logging work
When connecting:
1. The server assigns a color to your connection id (socket.id). Currently available colors: 6.
2. The server sends to the client all the old messages and the client renders them.

# Send message
Locate the input box at the bottom of the screen, type some string of text (any length greater than 0) and just press the Enter key.

Old messages are white and have the date and the time they were sent at.

# Posibilities for improvement for v1.0
1. Create private chat rooms
2. Create registration page
3. Implement the ability to send files
