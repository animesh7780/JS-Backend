import express from "express";

const app = express();

// app.get('/', (req, res) => {
//     res.send('Ready to go');
// });

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'chicken',
            joke: 'Why did the chicken cross the road? To get to the other side.'
        },
        {
            id: 2,
            title: 'chicken',
            joke: 'Why did the chicken cross the road? To get to the other side.'
        },
        {
            id: 3,
            title: 'chicken',
            joke: 'Why did the chicken cross the road? To get to the other side.'
        },
        {
            id: 4,
            title: 'chicken',
            joke: 'Why did the chicken cross the road? To get to the other side.'
        }
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
