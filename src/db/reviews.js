import img1 from "../assets/reviews/1.webp";
import img2 from "../assets/reviews/2.webp";
import img3 from "../assets/reviews/3.webp";
import img4 from "../assets/reviews/4.webp";
import img5 from "../assets/reviews/5.webp";
import img6 from "../assets/reviews/6.webp";
import img7 from "../assets/reviews/7.webp";
import img8 from "../assets/reviews/8.webp";

const reviews = [
  {
    id: "review-1",
    firstName: "J.",
    lastName: "Davidson",
    email: "jdavidson@domain.com",
    img: img1,
    rating: 4,
    timestamp: new Date().toString(),
    text: "some random text",
  },
  {
    id: "review-2",
    firstName: "Mark",
    lastName: "Vallance",
    email: "mark@domain.com",
    img: img2,
    rating: 2,
    timestamp: new Date().toString(),
    text: new Date().toString(),
  },
  {
    id: "review-3",
    firstName: "Sam",
    lastName: "Lincoln",
    email: "sam@domain.com",
    img: img3,
    rating: 5,
    timestamp: new Date().toString(),
    text: "some random text",
  },
  {
    id: "review-4",
    firstName: "Helen",
    lastName: "Rogers",
    email: "helen@domain.com",
    img: img4,
    rating: 3.5,
    timestamp: new Date().toString(),
    text: "some random text",
  },
  {
    id: "review-5",
    firstName: "Rita",
    lastName: "Amber",
    email: "rita@domain.com",
    img: img5,
    rating: 4.5,
    timestamp: new Date().toString(),
    text: new Date().toString(),
  },
  {
    id: "review-6",
    firstName: "Lisa",
    lastName: "Newman",
    email: "newman@domain.com",
    img: img6,
    rating: 5,
    timestamp: new Date().toString(),
    text: "some random text",
  },
  {
    id: "review-7",
    firstName: "Eva",
    lastName: "Peters",
    email: "peters@domain.com",
    img: img7,
    rating: 3,
    timestamp: new Date().toString(),
    text: new Date().toString(),
  },
  {
    id: "review-8",
    firstName: "Grace",
    lastName: "Mitchell",
    email: "mitchell@domain.com",
    img: img8,
    rating: 1,
    timestamp: new Date().toString(),
    text: "some random text",
  },
];

export default reviews;
