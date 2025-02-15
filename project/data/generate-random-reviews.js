var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('project/data/reviews.json', 'utf8'));
const books = obj.books;

reviews = [];
for (let book in books) {
    const reviewCount = Math.floor(Math.random() * 5 + 1);
    for (let i = 0; i < reviewCount; i++)
        reviews.push(
            {
                book,
                stars: Math.floor(Math.random() * 4 + 1),
                reviewer: "reviewer #" + reviewCount,
                review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab maiores dolorem est ex minus quidem perferendis tempore impedit asperiores officia?"
            }
        );
}
console.log(JSON.stringify(reviews, null, 2));
