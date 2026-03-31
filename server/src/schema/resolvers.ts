import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { Offer } from "../models/Offer";

export const resolvers = {
  Query: {
    hello: () => "Servidor SportZone funcionant",

    topCategories: async () => {
      return await Category.find({ level: 1 }).sort({ name: 1 });
    },

    subcategories: async (
      _: unknown,
      args: { parentId: string }
    ) => {
      return await Category.find({
        parentId: args.parentId,
        level: 2
      }).sort({ name: 1 });
    },

    productsByCategory: async (
      _: unknown,
      args: { categoryId: string }
    ) => {
      return await Product.find({
        categoryId: args.categoryId,
        deletedAt: null
      }).sort({ name: 1 });
    },

    offerProducts: async () => {
      const now = new Date();

      const offers = await Offer.find({
        startDate: { $lte: now },
        $or: [{ endDate: null }, { endDate: { $gte: now } }]
      }).sort({
        discountPercent: -1,
        endDate: 1
      });

      const result = [];

      for (const offer of offers) {
        const product = await Product.findOne({
          _id: offer.productId,
          deletedAt: null
        });

        if (!product) continue;

        result.push({
          id: product._id.toString(),
          code: product.code,
          name: product.name,
          shortDescription: product.shortDescription,
          longDescription: product.longDescription,
          image: product.image,
          catalogPrice: product.catalogPrice,
          offerPrice: offer.offerPrice,
          discountPercent: offer.discountPercent,
          startDate: offer.startDate.toISOString(),
          endDate: offer.endDate ? offer.endDate.toISOString() : null,
          categoryId: product.categoryId.toString()
        });
      }

      result.sort((a, b) => {
        if (b.discountPercent !== a.discountPercent) {
          return b.discountPercent - a.discountPercent;
        }

        const aEnd = a.endDate ? new Date(a.endDate).getTime() : Number.MAX_SAFE_INTEGER;
        const bEnd = b.endDate ? new Date(b.endDate).getTime() : Number.MAX_SAFE_INTEGER;

        if (aEnd !== bEnd) {
          return aEnd - bEnd;
        }

        return a.name.localeCompare(b.name);
      });

      return result;
    },

    searchProducts: async (
      _: unknown,
      args: {
        text?: string;
        categoryIds?: string[];
        minPrice?: number;
        maxPrice?: number;
      }
    ) => {
      const now = new Date();

      const products = await Product.find({
        deletedAt: null
      });

      const activeOffers = await Offer.find({
        startDate: { $lte: now },
        $or: [{ endDate: null }, { endDate: { $gte: now } }]
      });

      const offerMap = new Map<string, (typeof activeOffers)[number]>();
      for (const offer of activeOffers) {
        offerMap.set(offer.productId.toString(), offer);
      }

      let result = products.map((product) => {
        const offer = offerMap.get(product._id.toString());

        const currentPrice = offer ? offer.offerPrice : product.catalogPrice;
        const discountPercent = offer ? offer.discountPercent : 0;
        const offerEndDate = offer?.endDate ? offer.endDate.toISOString() : null;

        return {
          id: product._id.toString(),
          code: product.code,
          name: product.name,
          shortDescription: product.shortDescription,
          longDescription: product.longDescription,
          image: product.image,
          catalogPrice: product.catalogPrice,
          currentPrice,
          discountPercent,
          offerEndDate,
          categoryId: product.categoryId.toString()
        };
      });

      if (args.text && args.text.trim() !== "") {
        const words = args.text
          .trim()
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean);

        result = result.filter((product) => {
          const name = product.name.toLowerCase();
          return words.every((word) => name.includes(word));
        });
      }

      if (args.categoryIds && args.categoryIds.length > 0) {
        result = result.filter((product) =>
          args.categoryIds!.includes(product.categoryId)
        );
      }

      if (typeof args.minPrice === "number") {
        result = result.filter((product) => product.currentPrice >= args.minPrice!);
      }

      if (typeof args.maxPrice === "number") {
        result = result.filter((product) => product.currentPrice <= args.maxPrice!);
      }

      result.sort((a, b) => {
        if (b.discountPercent !== a.discountPercent) {
          return b.discountPercent - a.discountPercent;
        }

        const aEnd = a.offerEndDate ? new Date(a.offerEndDate).getTime() : Number.MAX_SAFE_INTEGER;
        const bEnd = b.offerEndDate ? new Date(b.offerEndDate).getTime() : Number.MAX_SAFE_INTEGER;

        if (aEnd !== bEnd) {
          return aEnd - bEnd;
        }

        return a.name.localeCompare(b.name);
      });

      return result;
    },

    productDetail: async (
      _: unknown,
      args: { id: string }
    ) => {
      const now = new Date();

      const product = await Product.findOne({
        _id: args.id,
        deletedAt: null
      });

      if (!product) {
        return null;
      }

      const offer = await Offer.findOne({
        productId: product._id,
        startDate: { $lte: now },
        $or: [{ endDate: null }, { endDate: { $gte: now } }]
      }).sort({
        discountPercent: -1,
        endDate: 1
      });

      return {
        id: product._id.toString(),
        code: product.code,
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        image: product.image,
        catalogPrice: product.catalogPrice,
        offerPrice: offer ? offer.offerPrice : null,
        discountPercent: offer ? offer.discountPercent : null,
        offerEndDate: offer?.endDate ? offer.endDate.toISOString() : null,
        categoryId: product.categoryId.toString()
      };
    }
  }
};