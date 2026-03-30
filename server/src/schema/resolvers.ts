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
        $or: [
          { endDate: null },
          { endDate: { $gte: now } }
        ]
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
    }
  }
};