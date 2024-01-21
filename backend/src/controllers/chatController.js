import { firestore } from "../../index.js";
import { Timestamp, collection } from "firebase/firestore";

export const createOrUpdateChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chatIds = chatId.split("+");
    const id1 = chatIds[0] + chatIds[1];
    const id2 = chatIds[1] + chatIds[0];

    let existingChatRef = firestore.collection("chats").doc(id1);

    const existingChatCon = await existingChatRef.get();
    if (!existingChatCon.exists) {
      existingChatRef = firestore.collection("chats").doc(id2);
    }
    const existingChatSnapshot = await existingChatRef.get();
    const messagesData = req.body.message;

    if (messagesData && messagesData.message) {
      const newMessage = {
        messageId: `${
          new Date().getTime() +
          Math.round(Math.random() * 100000) +
          "122863463"
        }`,
        message: messagesData.message,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isDeleted: false,
        createdBy: messagesData.createdBy,
        updatedBy: messagesData.updatedBy || "",
      };

      let messagesArray = [];

      if (existingChatSnapshot.exists) {
        const existingChatData = existingChatSnapshot.data();
        messagesArray = existingChatData.messages || [];
        messagesArray.push(newMessage);

        await existingChatRef.update({
          messages: messagesArray,
          updatedBy: req.body.updatedBy || "",
          updatedAt: Timestamp.now(),
        });
        res.status(200).json({ message: "Chat updated successfully" });
      } else {
        messagesArray.push(newMessage);

        const data = {
          users: req.body.users || [],
          messages: messagesArray,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          isDeleted: false,
          createdBy: req.body.createdBy || "",
          updatedBy: req.body.updatedBy || "",
        };

        await existingChatRef.set(data);
        res.status(201).json({ message: "New chat created successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid message data" });
    }
  } catch (error) {
    console.error("Error creating or updating chat:", error);
    res.status(500).json({ error: "Error creating or updating chat" });
  }
};

export const createGrouporUpdate = async (req, res) => {
  try {
    const data = req.body;
    const group = {
      ...req.body,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isDeleted: false,
      createdBy: req.body.groupUsers[0] || "",
      updatedBy: "",
    };
    const collectionRef = firestore.collection("groupChat");
    const docRef = await collectionRef.add({
      group,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const addMessagesGroup = async (req, res) => {
  try {
    const message = req.body.message;
    const existingChatRef = firestore
      .collection("groupChat")
      .doc(req.params.id);
    const existingChatSnapshot = await existingChatRef.get();
    if (!existingChatSnapshot.exists) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const existingChatData = existingChatSnapshot.data();

    const messagesArray = existingChatData.messages || [];

    const newMessage = {
      messageId: `${
        new Date().getTime() + Math.round(Math.random() * 100000) + "122863463"
      }`,
      message: message || "",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isDeleted: false,
      createdBy: req.body.createdBy || "",
      updatedBy: message?.updatedBy || "",
    };

    messagesArray.push(newMessage);

    const data = await existingChatRef.update({
      messages: messagesArray,
      updatedBy: "",
      updatedAt: Timestamp.now(),
    });

    res.status(201).json({ message: "message created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating or updating chat" });
  }
};
