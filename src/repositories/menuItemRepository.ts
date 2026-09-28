import { eq } from "drizzle-orm";
import { getDb } from "../db/index.ts";
import { menuItems, stalls } from "../db/schema.ts";

export interface MenuItemInput {
  stallId: number;
  name: string;
  price: number;
  isAvailable?: boolean;
}

export class MenuItemRepository {
  async findByStallId(stallId: number) {
    const db = await getDb();
    return db.select().from(menuItems).where(eq(menuItems.stallId, stallId));
  }

  async findAllWithStall() {
    const db = await getDb();
    return db
      .select({
        menuItem: menuItems,
        stall: {
          id: stalls.id,
          name: stalls.name,
          category: stalls.category,
          location: stalls.location,
        },
      })
      .from(menuItems)
      .innerJoin(stalls, eq(menuItems.stallId, stalls.id))
      .orderBy(menuItems.id);
  }

  async findById(id: number) {
    const db = await getDb();
    const rows = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return rows[0];
  }

  async create(input: MenuItemInput) {
    const db = await getDb();
    const rows = await db
      .insert(menuItems)
      .output()
      .values({ ...input, isAvailable: input.isAvailable ?? true });
    return rows[0];
  }

  async update(id: number, input: Partial<MenuItemInput>) {
    const db = await getDb();
    const rows = await db
      .update(menuItems)
      .set(input)
      .where(eq(menuItems.id, id))
      .output();
    return rows[0];
  }

  async remove(id: number) {
    const db = await getDb();
    const rows = await db
      .delete(menuItems)
      .where(eq(menuItems.id, id))
      .output();
    return rows[0];
  }
}
