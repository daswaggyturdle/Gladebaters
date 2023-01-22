// We enclose this in window.onload.
// So we don't have ridiculous errors.
function gettime(){
  let currentDate = new Date();
  var AMPM = "AM"
  var hour = currentDate.getHours()
  var minute = currentDate.getMinutes()
  if (hour> 12 ) {
    hour -= 12
    AMPM = "PM"
  }
  if (minute < 10 ) {
    minute = "0"+minute
  }
  let time = hour + ":" + minute + " " + AMPM
  console.log(time)
  return(time);
}
var prompts = [{"name": "Is love for family or your partner stronger?","arg1":"family","arg2":"partner"},{"name":"Is Marvel or DC better?","arg1":"Marvel","arg2":"DC"}]
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
window.onload = function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBOjelbqThbLIua7gAJWiQnz1ngUfUcpkQ",
        authDomain: "memechat2-f56bf.firebaseapp.com",
        projectId: "memechat2-f56bf",
        storageBucket: "memechat2-f56bf.appspot.com",
        messagingSenderId: "633279340308",
        appId: "1:633279340308:web:989013db9cd82915e1ec01"
    };

    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // database start
    var db = firebase.database()

    // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
    class MEME_CHAT{
      // Home() is used to create the home page
      home(){
        // First clear the body before adding in
        // a title and the join form
        document.body.innerHTML = ''
        this.create_title()
        this.create_join_form()
      }
      // chat() is used to create the chat page
      chat(){
        this.create_title()
        this.create_chat()
      }
      // create_title() is used to create the title
      create_title(){
        // This is the title creator. 🎉
        var title_container = document.createElement('div')
        title_container.setAttribute('id', 'title_container')
        var title_inner_container = document.createElement('div')
        title_inner_container.setAttribute('id', 'title_inner_container')
  
        var title = document.createElement('p')
        title.setAttribute('id', 'title')
        title.textContent = 'Gladebaters'
  
        title_inner_container.append(title)
        title_container.append(title_inner_container)
        document.body.append(title_container)
      }
      // create_join_form() creates the join form
      create_join_form(){
        // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
        var parent = this;
  
        var join_container = document.createElement('div')
        join_container.setAttribute('id', 'join_container')
        var join_inner_container = document.createElement('div')
        join_inner_container.setAttribute('id', 'join_inner_container')
  
        var join_button_container = document.createElement('div')
        join_button_container.setAttribute('id', 'join_button_container')
  
        var join_button = document.createElement('button')
        join_button.setAttribute('id', 'join_button')
        join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'
  
        var join_input_container = document.createElement('div')
        join_input_container.setAttribute('id', 'join_input_container')
  
        var join_input = document.createElement('input')
        join_input.setAttribute('id', 'join_input')
        join_input.setAttribute('maxlength', 15)
        join_input.placeholder = 'Enter Name'

        var password_input = document.createElement('input')
        password_input.setAttribute('id', 'password_input')
        password_input.setAttribute('maxlength', 15)
        password_input.placeholder = 'Enter Password'

        var wrong = document.createElement('p')
        wrong.setAttribute('id', 'wrong')
        wrong.textContent = `Incorrect password`
        // Every time we type into the join_input
        join_input.onkeyup  = function(){
          // If the input we have is longer that 0 letters
          if (join_input.value.length > 0){
            
            // Make the button light up
            join_button.classList.add('enabled')
            // Allow the user to click the button
            join_button.onclick = function(){
              // Save the name to local storage. Passing in
              // the join_input.value
              db.ref('profiles').once('value', function(profiles){
                var user = profiles.val()[join_input.value]
                if (user != null){
                  if (user.password != password_input.value){
                    wrong.classList.add('enabled')
                    return
                  
                  }else{
                    parent.save_name(join_input.value,password_input.value)
                    // Remove the join_container. So the site doesn't look weird.
                    join_container.remove()
                    // parent = this. But it is not the join_button
                    // It is (MEME_CHAT = this).
                    parent.create_chat()
                  }
                }
              })

              
            }
          }else{
            // If the join_input is empty then turn off the
            // join button
            join_button.classList.remove('enabled')
          }
        }
  
        // Append everything to the body
        join_button_container.append(join_button,wrong)
        join_input_container.append(join_input,password_input)
        join_inner_container.append(join_input_container, join_button_container)
        join_container.append(join_inner_container)
        document.body.append(join_container)
      }
      // create_load() creates a loading circle that is used in the chat container
      create_load(container_id){
        // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
        var parent = this;
  
        // This is a loading function. Something cool to have.
        var container = document.getElementById(container_id)
        container.innerHTML = ''
  
        var loader_container = document.createElement('div')
        loader_container.setAttribute('class', 'loader_container')
  
        var loader = document.createElement('div')
        loader.setAttribute('class', 'loader')
  
        loader_container.append(loader)
        container.append(loader_container)
  
      }
      // create_chat() creates the chat container and stuff
      create_chat(){
        // Again! You need to have (parent = this)
        var parent = this;
        
        // GET THAT MEMECHAT HEADER OUTTA HERE
        var title_container = document.getElementById('title_container')
        var title = document.getElementById('title')
        title_container.classList.add('chat_title_container')
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title')
  
        var topic = document.createElement('div')
        topic.setAttribute('id','topic')
        prompt = prompts[getRndInteger(0,prompts.length)]
        topic.textContent = "Current debate: "+prompt["name"]

        var viewpoint = document.createElement('div')
        viewpoint.setAttribute('id','viewpoint')
        var coin = getRndInteger(1,2)
        viewpoint.textContent = "You're arguing: "+prompt["arg"+coin]

        var serverstuff = document.createElement('div')
        serverstuff.setAttribute('id', 'serverstuff')

        var servers = document.createElement('div')
        servers.setAttribute('id', 'servers')

        var new_server = document.createElement('button')
        new_server.setAttribute('id', 'new_server')
        new_server.textContent = 'Create new server'

        var server_input = document.createElement('input')
        server_input.setAttribute('id', 'server_input')
        server_input.setAttribute('maxlength', 30)
        server_input.placeholder = `enter server name here.`

        var chat_container = document.createElement('div')
        chat_container.setAttribute('id', 'chat_container')
  
        var chat_inner_container = document.createElement('div')
        chat_inner_container.setAttribute('id', 'chat_inner_container')
  
        var chat_content_container = document.createElement('div')
        chat_content_container.setAttribute('id', 'chat_content_container')
  
        var chat_input_container = document.createElement('div')
        chat_input_container.setAttribute('id', 'chat_input_container')
  
        var chat_input_send = document.createElement('button')
        chat_input_send.setAttribute('id', 'chat_input_send')
        chat_input_send.setAttribute('disabled', true)
        chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`
  
        var chat_input = document.createElement('input')
        chat_input.setAttribute('id', 'chat_input')
        // Only a max message length of 1000
        chat_input.setAttribute('maxlength', 1000)
        // Get the name of the user
        chat_input.placeholder = `${parent.get_name()}. Type message here press Enter to send.`

        chat_input.onkeyup = function(input){
          if(chat_input.value.length > 0){
            chat_input_send.removeAttribute('disabled')
            chat_input_send.classList.add('enabled')

            if (input.key=="Enter"){
              chat_input_send.setAttribute('disabled', true)
              chat_input_send.classList.remove('enabled')

              if(chat_input.value.length <= 0){
                return
              }

              // Enable the loading circle in the 'chat_content_container'
              parent.create_load('chat_content_container')
              var tosend = chat_input.value
              // Send the message. Pass in the chat_input.value
              db.ref('profiles/'+[localStorage.name]+'/current').once('value', function(current){
                parent.send_message(tosend, current.val())
              })
              //parent.send_message(chat_input.value,db.ref('profiles/'+[localStorage.name]+'/current').once.value)
              // Clear the chat input box
              chat_input.value = ''
              // Focus on the input just after
              chat_input.focus()
            }

            chat_input_send.onclick = function(){
              //same thing but by pressing send button
              chat_input_send.setAttribute('disabled', true)
              chat_input_send.classList.remove('enabled')

              if(chat_input.value.length <= 0){
                return
              }
              parent.create_load('chat_content_container')
              var tosend = chat_input.value

              db.ref('profiles/'+[localStorage.name]+'/current').once('value', function(current){
                parent.send_message(tosend,current.val())
              })
              //parent.send_message(chat_input.value,db.ref('profiles/'+[localStorage.name]+'/current').once.value)
              chat_input.value = ''
              chat_input.focus()
            }
          }else{
            chat_input_send.classList.remove('enabled')
          }
        }

        new_server.onclick = function(){
          //same thing but by pressing send button
          db.ref('chats').once('value', function(chats){

            var newid = (chats.val()["counter"]+1);
            var data = {"id":newid,"name":server_input.value,rankpoints:0,"messages":{"message_1":{"id":1,"name":"Gladebot","msgtime":"now","message":"this is the start"}}}
            var userservers = db.ref('profiles/'+[localStorage.name]+'/servers').once('value')
            // This index is important. It will help organize the chat in order
            db.ref('chats/counter').set(newid)
            db.ref('profiles/'+localStorage.name+'/servers/'+server_input.value).set(userservers[server_input.value]=data)
            db.ref('chats/'+server_input.value).set(data)
          })
        }
  
        var chat_logout_container = document.createElement('div')
        chat_logout_container.setAttribute('id', 'chat_logout_container')
  
        var chat_logout = document.createElement('button')
        chat_logout.setAttribute('id', 'chat_logout')
        chat_logout.textContent = `${parent.get_name()} • logout`
        // "Logout" is really just deleting the name from the localStorage
        chat_logout.onclick = function(){
          localStorage.clear()
          // Go back to home page
          parent.home()
        }
  
        chat_logout_container.append(chat_logout)
        chat_input_container.append(chat_input, chat_input_send)
        chat_inner_container.append(topic,viewpoint,chat_content_container, chat_input_container, chat_logout_container)
        chat_container.append(chat_inner_container)
        serverstuff.append(new_server,server_input,servers)
        document.body.append(serverstuff)
        document.body.append(chat_container)
        parent.refresh_servers(localStorage.name)
        // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
        parent.create_load('chat_content_container')
        // then we "refresh" and get the chat data from Firebase db.ref('profiles/'+[localStorage.name]+'/current').once('value')
        db.ref('profiles/'+[localStorage.name]+'/current').once('value', function(current){
          parent.refresh_chat(current.val())
        })
      }
      // Save name. It literally saves the name to localStorage
      save_name(name,password){
        // Save name to firebase
        var newid=1
        
        db.ref('profiles').once('value', function(profilelist){
          newid = (profilelist.val()["counter"]+1);
          // This index is important. It will help organize the chat in order
          db.ref('profiles/counter').set(newid)
          db.ref('profiles/' + name).set({
            id: newid,
            password: password,
            current: "testing",
            servers: {"testing":{"name":"testing","id":1}},
          }
          )
        })

        localStorage.setItem('name', name)
      }
      // Sends message/saves the message to firebase database
      send_message(message,chatname){
        var parent = this
        var msgtime = gettime()
        
        // if the local storage name is null and there is no message then return/don't send the message. The user is somehow hacking to send messages. Or they just deleted the localstorage themselves. But hacking sounds cooler!!
        if(parent.get_name() == null && message == null){
          return
        }
  
        // Get the firebase database value
        db.ref('chats/'+chatname+'/messages').once('value', function(message_object) {
          // This index is important. It will help organize the chat in order
          var index = parseFloat(message_object.numChildren()) + 1
          db.ref('chats/'+chatname+'/messages/' + `message_${index}`).set({
            name: parent.get_name(),
            message: message,
            msgtime: msgtime,
            index: index
          })
          .then(function(){
            // Afterwards we send the chat refresh to get the new messages
            parent.refresh_chat(chatname)
          })
        })
      }
      // Get name. Gets the username from localStorage
      get_name(){
        // Get the name from localstorage
        if(localStorage.getItem('name') != null){
          return localStorage.getItem('name')
        }else{
          this.home()
          return null
        }
      }
      // Refresh chat gets the message/chat data from firebase
      refresh_servers(user){
        var servers = document.getElementById('servers')
        var parent = this;
  
        // Get the chats from firebase
        db.ref('profiles/'+user+'/servers').on('value', function(server_object) {
          // When we get the data clear servers
          servers.innerHTML = ''
          // if there are no messages in the chat. Retrun . Don't load anything
          if(server_object.numChildren() == 0){
            return
          }
  
          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!
  
          // convert the message object values to an array.
          var serverlist = Object.values(server_object.val());
          var guide = [] // this will be our guide to organizing the messages
          var unordered = [] // unordered messages
          //var ordered = [] // we're going to order these messages
  
          for (var i, i = 0; i < serverlist.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i+1)
            // unordered is the [message, index_of_the_message]
            unordered.push([serverlist[i], serverlist[i].index]);
          }
          // Now this is straight up from stack overflow 🤣
          // Sort the unordered messages by the guide
          // guide.forEach(function(key) {
          //   console.log("chec 3")
          //   var found = false
          //   unordered = unordered.filter(function(item) {
          //     if(!found && item[1] == key) {
          //       // Now push the ordered messages to ordered array
          //       ordered.push(item[0])
          //       found = true
          //       return false
          //     }else{
          //       return true
          //     }
          //   })
          // })
  
          // display ordered servers
          unordered.forEach(function(data){
            var name = data[0].name
  
            var server_container = document.createElement('div')
            server_container.setAttribute('class', 'server_container')
  
            var servername = document.createElement('button')
            servername.setAttribute('class', 'servername')
            servername.textContent = name

            servername.onclick = function(){
              db.ref('profiles/'+[localStorage.name]+'/current').set(name)
              parent.refresh_chat(name)
            }

            server_container.append(servername)
            servers.append(server_container)
          });
          // Go to the recent message at the bottom of the container
          servers.scrollTop = servers.scrollHeight;
      })
  
      }

      refresh_chat(chatname){
        var chat_content_container = document.getElementById('chat_content_container')
  
        // Get the chats from firebase
        db.ref('chats/'+chatname+'/messages').on('value', function(messages_object) {
          // When we get the data clear chat_content_container
          chat_content_container.innerHTML = ''
          // if there are no messages in the chat. Retrun . Don't load anything
          if(messages_object.numChildren() == 0){
            return
          }
  
          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!
  
          // convert the message object values to an array.
          var messages = Object.values(messages_object.val());
          var guide = [] // this will be our guide to organizing the messages
          var unordered = [] // unordered messages
          var ordered = [] // we're going to order these messages
  
          for (var i, i = 0; i < messages.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i+1)
            // unordered is the [message, index_of_the_message]
            unordered.push([messages[i], messages[i].index]);
          }
  
          // Now this is straight up from stack overflow 🤣
          // Sort the unordered messages by the guide
          guide.forEach(function(key) {
            var found = false
            unordered = unordered.filter(function(item) {
              if(!found && item[1] == key) {
                // Now push the ordered messages to ordered array
                ordered.push(item[0])
                found = true
                return false
              }else{
                return true
              }
            })
          })
  
          // Now we're done. Simply display the ordered messages
          ordered.forEach(function(data){
            var name = data.name
            var message = data.message
            var msgtime = "no time found"
            if(data.msgtime != null){
              var msgtime = data.msgtime
            }
  
            var message_container = document.createElement('div')
            message_container.setAttribute('class', 'message_container')
  
            var message_inner_container = document.createElement('div')
            message_inner_container.setAttribute('class', 'message_inner_container')
  
            var message_user_container = document.createElement('div')
            message_user_container.setAttribute('class', 'message_user_container')
  
            var message_user = document.createElement('p')
            message_user.setAttribute('class', 'message_user')
            message_user.textContent = `${name} at `+msgtime
  
            var message_content_container = document.createElement('div')
            message_content_container.setAttribute('class', 'message_content_container')
  
            var message_content = document.createElement('p')
            message_content.setAttribute('class', 'message_content')
            message_content.textContent = `${message}`
  
            message_user_container.append(message_user)
            message_content_container.append(message_content)
            message_inner_container.append(message_user_container, message_content_container)
            message_container.append(message_inner_container)
  
            chat_content_container.append(message_container)
          });
          // Go to the recent message at the bottom of the container
          chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })
  
      }
    }
    // So we've "built" our app. Let's make it work!!
    var app = new MEME_CHAT()
    // If we have a name stored in localStorage.
    // Then use that name. Otherwise , if not.
    // Go to home.
    if(app.get_name() != null){
      app.chat()
    }
  }