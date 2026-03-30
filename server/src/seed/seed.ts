import mongoose from "mongoose";
import { connectDB } from "../db/mongoose";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { Offer } from "../models/Offer";

async function seed(): Promise<void> {
  await connectDB();

  await Product.deleteMany({});
  await Offer.deleteMany({});
  await Category.deleteMany({});

  const futbol = await Category.create({
    name: "Futbol",
    parentId: null,
    level: 1
  });

  const running = await Category.create({
    name: "Running",
    parentId: null,
    level: 1
  });

  const gimnas = await Category.create({
    name: "Gimnàs",
    parentId: null,
    level: 1
  });

  const basquet = await Category.create({
    name: "Bàsquet",
    parentId: null,
    level: 1
  });

  const futbolBotes = await Category.create({
    name: "Botes",
    parentId: futbol._id,
    level: 2
  });

  const futbolPilotes = await Category.create({
    name: "Pilotes",
    parentId: futbol._id,
    level: 2
  });

  const futbolEquipacions = await Category.create({
    name: "Equipacions",
    parentId: futbol._id,
    level: 2
  });

  const runningSabatilles = await Category.create({
    name: "Sabatilles",
    parentId: running._id,
    level: 2
  });

  const runningRoba = await Category.create({
    name: "Roba tècnica",
    parentId: running._id,
    level: 2
  });

  const runningAccessoris = await Category.create({
    name: "Accessoris",
    parentId: running._id,
    level: 2
  });

  const gimnasPeses = await Category.create({
    name: "Peses",
    parentId: gimnas._id,
    level: 2
  });

  const gimnasEsterilles = await Category.create({
    name: "Esterilles",
    parentId: gimnas._id,
    level: 2
  });

  const gimnasGuants = await Category.create({
    name: "Guants",
    parentId: gimnas._id,
    level: 2
  });

  const basquetPilotes = await Category.create({
    name: "Pilotes",
    parentId: basquet._id,
    level: 2
  });

  const basquetSabatilles = await Category.create({
    name: "Sabatilles",
    parentId: basquet._id,
    level: 2
  });

  const basquetEquipacions = await Category.create({
    name: "Equipacions",
    parentId: basquet._id,
    level: 2
  });

  const products = await Product.create([
    {
      code: "FUT-BOT-001",
      name: "Botes Nike Mercurial",
      shortDescription: "Botes lleugeres per velocitat i control.",
      longDescription: "Botes de futbol pensades per jugadors ràpids, amb gran adherència i comoditat en gespa artificial i natural.",
      image: "https://example.com/mercurial.jpg",
      catalogPrice: 129.99,
      categoryId: futbolBotes._id,
      deletedAt: null
    },
    {
      code: "FUT-PIL-001",
      name: "Pilota Adidas Champions League",
      shortDescription: "Pilota oficial d'entrenament estil Champions.",
      longDescription: "Pilota resistent i precisa, ideal per entrenaments i partits amateurs amb acabat de gran qualitat.",
      image: "https://example.com/champions-ball.jpg",
      catalogPrice: 39.99,
      categoryId: futbolPilotes._id,
      deletedAt: null
    },
    {
      code: "FUT-EQU-001",
      name: "Samarreta Barça 2025",
      shortDescription: "Equipació oficial inspirada en la temporada 2025.",
      longDescription: "Samarreta còmoda i transpirable amb teixit tècnic, pensada tant per joc com per ús casual.",
      image: "https://example.com/barca-2025.jpg",
      catalogPrice: 89.99,
      categoryId: futbolEquipacions._id,
      deletedAt: null
    },
    {
      code: "RUN-SAB-001",
      name: "Sabatilles Asics Gel Nimbus",
      shortDescription: "Amortiment excel·lent per llarga distància.",
      longDescription: "Sabatilles de running amb gran estabilitat i comoditat, ideals per entrenaments continus i tirades llargues.",
      image: "https://example.com/asics-nimbus.jpg",
      catalogPrice: 149.99,
      categoryId: runningSabatilles._id,
      deletedAt: null
    },
    {
      code: "RUN-ROB-001",
      name: "Samarreta tècnica Nike DryFit",
      shortDescription: "Roba transpirable per entrenaments intensos.",
      longDescription: "Samarreta tècnica de teixit lleuger amb evacuació de suor per mantenir el cos sec durant l'exercici.",
      image: "https://example.com/dryfit.jpg",
      catalogPrice: 34.99,
      categoryId: runningRoba._id,
      deletedAt: null
    },
    {
      code: "RUN-ACC-001",
      name: "Cinturó porta-mòbil running",
      shortDescription: "Accessoris pràctics per córrer amb comoditat.",
      longDescription: "Cinturó ajustable per portar el mòbil, claus o gels energètics sense molèsties durant la cursa.",
      image: "https://example.com/belt.jpg",
      catalogPrice: 19.99,
      categoryId: runningAccessoris._id,
      deletedAt: null
    },
    {
      code: "GYM-PES-001",
      name: "Pack peses ajustables 20kg",
      shortDescription: "Set versàtil per entrenament de força.",
      longDescription: "Pack de peses ajustables per treballar diferents grups musculars a casa o al gimnàs.",
      image: "https://example.com/dumbbells.jpg",
      catalogPrice: 99.99,
      categoryId: gimnasPeses._id,
      deletedAt: null
    },
    {
      code: "GYM-EST-001",
      name: "Esterilla fitness antilliscant",
      shortDescription: "Base còmoda per exercicis de terra.",
      longDescription: "Esterilla gruixuda i estable per estiraments, abdominals, ioga i sessions de fitness.",
      image: "https://example.com/mat.jpg",
      catalogPrice: 24.99,
      categoryId: gimnasEsterilles._id,
      deletedAt: null
    },
    {
      code: "GYM-GUA-001",
      name: "Guants gimnàs ProGrip",
      shortDescription: "Protecció i adherència per entrenar millor.",
      longDescription: "Guants reforçats per millorar l'adherència i protegir les mans en exercicis amb pes.",
      image: "https://example.com/gloves.jpg",
      catalogPrice: 17.99,
      categoryId: gimnasGuants._id,
      deletedAt: null
    },
    {
      code: "BAS-PIL-001",
      name: "Pilota Spalding NBA",
      shortDescription: "Pilota clàssica per joc interior i exterior.",
      longDescription: "Pilota de bàsquet amb bon grip i rebot consistent, pensada per entrenaments i partits recreatius.",
      image: "https://example.com/spalding.jpg",
      catalogPrice: 44.99,
      categoryId: basquetPilotes._id,
      deletedAt: null
    },
    {
      code: "BAS-SAB-001",
      name: "Sabatilles Nike Air Jordan",
      shortDescription: "Sabatilles amb estil i rendiment a pista.",
      longDescription: "Model inspirat en el bàsquet professional, amb suport, amortiment i disseny icònic.",
      image: "https://example.com/jordan.jpg",
      catalogPrice: 159.99,
      categoryId: basquetSabatilles._id,
      deletedAt: null
    },
    {
      code: "BAS-EQU-001",
      name: "Samarreta Lakers",
      shortDescription: "Equipació inspirada en un equip històric.",
      longDescription: "Samarreta lleugera i còmoda amb acabat esportiu, perfecta per fans i per practicar esport.",
      image: "https://example.com/lakers.jpg",
      catalogPrice: 79.99,
      categoryId: basquetEquipacions._id,
      deletedAt: null
    }
  ]);

  await Offer.create([
    {
      productId: products[0]._id,
      offerPrice: 103.99,
      discountPercent: 20,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2026-12-31")
    },
    {
      productId: products[3]._id,
      offerPrice: 127.49,
      discountPercent: 15,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2026-12-31")
    },
    {
      productId: products[6]._id,
      offerPrice: 89.99,
      discountPercent: 10,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2026-12-31")
    },
    {
      productId: products[9]._id,
      offerPrice: 33.74,
      discountPercent: 25,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2026-12-31")
    }
  ]);

  console.log("Seed de SportZone completat correctament");
  await mongoose.connection.close();
}

seed().catch((error) => {
  console.error("Error executant el seed:", error);
  mongoose.connection.close();
});