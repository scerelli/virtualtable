extern crate serde;
#[macro_use] extern crate serde_derive;
extern crate serde_json;
extern crate ws;
#[macro_use] extern crate lazy_static;

use std::sync::*;
use std::collections::HashMap;
use std::thread;
use std::sync::mpsc::*;

struct RoomHandler {
    client: ws::Sender,
    thread: Option<thread::JoinHandle<()>>,
    channel: Arc<Mutex<(Sender<ChannelMessage>, Receiver<ChannelMessage>)>>
}

enum ChannelMessage {
    Join(ws::Sender),
    Message(ws::Sender, String)
}

impl ws::Handler for RoomHandler {
    fn on_message(&mut self, msg: ws::Message) -> ws::Result<()> {
        let msg = format!("{}", msg);

        if self.thread.is_none() {
            let r = Mutex::new(&self.channel);
            self.thread = Some(thread::spawn(move|| {
                let mut players: Arc<Vec<ws::Sender>> = Arc::new(vec![]);

                loop {
                    println!("new msg {}", players.len());

                    if let Ok(channel_message) = r.lock().unwrap().1.recv() {
                        println!("inside the thread");
                        match channel_message {
                            ChannelMessage::Join(client) => {
                                println!("new client");
                                Arc::get_mut(&mut players).unwrap().push(client);
                            },
                            ChannelMessage::Message(client, msg) => {
                                for player in players.iter() {
                                    println!("sending {}", msg.clone());
                                    player.send(msg.clone());
                                }
                            }
                        }
                    }
                }
            }));
        }


        let ref s = self.channel.0;
        if msg == "join room1" {
            s.send(ChannelMessage::Join(self.client.clone())).unwrap();
        }

        if msg == "msg hai" {

            s.send(ChannelMessage::Message(self.client.clone(), msg)).unwrap();
        }

        Ok(())
    }
}

fn main() {
    ws::listen("localhost:3000", move |out| {
        RoomHandler { client: out, thread: None, channel: channel() }
    });
}
