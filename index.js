import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

let data = [
    {
        id: 1,
        title: "When To Do What You Love",
        date: "September 12, 2024",
        content:
            "There's some debate about whether it's a good idea to 'follow your passion.' In fact the question is impossible to answer with a simple yes or no. Sometimes you should and sometimes you shouldn't, but the border between should and shouldn't is very complicated. The only way to give a general answer is to trace it.",
    },
    {
        id: 2,
        title: "Founder Mode",
        date: "September 4, 2024",
        content:
            "At a YC event last week Brian Chesky gave a talk that everyone who was there will remember. Most founders I talked to afterward said it was the best they'd ever heard. Ron Conway, for the first time in his life, forgot to take notes. I'm not going to try to reproduce it here. Instead I want to talk about a question it raised.",
    },
    {
        id: 3,
        title: "How to Start Google",
        date: "September 25, 2024",
        content:
            "Most of you probably think that when you're released into the so-called real world you'll eventually have to get some kind of job. That's not true, and today I'm going to talk about a trick you can use to avoid ever having to get a job.",
    },
];

app.get("/", (req, res) => {
    console.log(data);
    res.render("index.ejs", {
        data: data,
    });
});

app.get("/post/:id", (req, res) => {
    console.log(req.params);
    res.render("post.ejs", { data: data, id: req.params.id - 1 });
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
});

app.post("/add-post", (req, res) => {
    const date = new Date();
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const currentDate = new Intl.DateTimeFormat("en-US", options).format(date);

    const title = req.body["title"];
    const content = req.body["content"];

    const newData = {
        id: data.length + 1,
        title: title,
        date: currentDate,
        content: content,
    };

    data.push(newData);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const removeId = req.params.id;
    data = data.filter((data) => data.id != removeId);

    for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
    }
    res.redirect("/");
});

let updateId = 0;
app.get("/update/:id", (req, res) => {
    updateId = req.params.id;
    const oneData = data[updateId - 1];
    console.log("aku");
    res.render("update.ejs", { data: oneData });
});

app.post("/update-post", (req, res) => {
    data[updateId - 1].title = req.body.title;
    data[updateId - 1].content = req.body.content;
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
