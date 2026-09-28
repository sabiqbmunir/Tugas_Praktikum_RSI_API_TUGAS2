import {
  MenuItemRepository,
  type MenuItemInput,
} from "../repositories/menuItemRepository.ts";

export class MenuItemService {
  constructor(
    private menuItemRepository: MenuItemRepository = new MenuItemRepository(),
  ) {}

  getMenuItems() {
    return this.menuItemRepository.findAllWithStall();
  }

  async getMenuItem(id: number) {
    const item = await this.menuItemRepository.findById(id);
    if (!item) throw new Error("MENU_ITEM_NOT_FOUND");
    return item;
  }

  createMenuItem(input: MenuItemInput) {
    return this.menuItemRepository.create(input);
  }

  async updateMenuItem(id: number, input: Partial<MenuItemInput>) {
    const item = await this.menuItemRepository.update(id, input);
    if (!item) throw new Error("MENU_ITEM_NOT_FOUND");
    return item;
  }

  async deleteMenuItem(id: number) {
    const item = await this.menuItemRepository.remove(id);
    if (!item) throw new Error("MENU_ITEM_NOT_FOUND");
    return item;
  }
}
