import cake from "../assets/cake.jpg";
import cupcake from "../assets/cupcake.jpg";
import biscuits from "../assets/biscuits.jpg";
import khari from "../assets/khari.jpg";
import mava_cake from "../assets/mava_cake.jpg";
import pav from "../assets/pav.jpg";

const bakeryItems = [
  {
    id: 1,
    name: "Chocolate Cake",
    category: "Cakes",
    price: 450,
    unit: "1 whole cake (1 kg)",
    image: cake,
  },
  {
    id: 2,
    name: "Vanilla Cupcake",
    category: "Cakes",
    price: 80,
    unit: "1 box of 2 pcs",
    image: cupcake,
  },
  {
    id: 3,
    name: "Choco Chip Biscuits",
    category: "Biscuits",
    price: 90,
    unit: "1 pack of 250gm",
    image: biscuits,
  },
  {
    id: 4,
    name: "Crispy Khari",
    category: "Khari",
    price: 120,
    unit: "1 pack of 200gm",
    image: khari,
  },
  {
    id: 5,
    name: "Mawa Cake",
    category: "Cakes",
    price: 150,
    unit: "1 pc of 500gm",
    image: mava_cake,
  },
  {
    id: 6,
    name: "Fresh Pav",
    category: "Breads & Buns",
    price: 100,
    unit: "1 pack of 6 pcs",
    image: pav,
  },
];

export default bakeryItems;