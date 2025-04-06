import Examiner from "./../Models/Examiner.js";
import { JSDOM } from "jsdom";
import axios from "axios";

export const addExaminer = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await Examiner.findOne({ email: email });
    if (user) {
      return res
        .status(201)
        .json({ message: "User with this email already exist" });
    }
    const newUser = new Examiner(req.body);
    let output = await newUser.save();
    return res.status(200).json({ message: output });
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};

export const getExaminer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Examiner.findOne({ email: email });

    if (!user) {
      return res
        .status(203)
        .json({ message: "User with this email does not exist" });
    }

    if (password === user.password) {
      return res.status(200).json({ ...user });
    } else {
      return res.status(201).json({ message: "Wrong Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch data" });
  }
};

export const getTextFromUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const textContent = [];

    const extractTextNodes = (node) => {
      if (node.nodeType === 3) {
        textContent.push(node.nodeValue.trim());
      }

      if (node.childNodes) {
        node.childNodes.forEach((child) => extractTextNodes(child));
      }
    };

    extractTextNodes(document.body);
    const mergedText = textContent.join(" ");
    res.status(200).json({ mergedText });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    return res.status(500).json({ message: "Could not fetch data" });
  }
};
