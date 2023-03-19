import { InferModel, int, mysqlTable, uniqueIndex } from 'drizzle-orm/mysql-core';

export const templateCategories = mysqlTable('templateCategories', {
  templateId: int('template_id'),
  categoryId: int('category_id'),
}, (table) => {
  return {
    uniqName: uniqueIndex('unique_tem_cat').on(table.templateId, table.categoryId),
  };
});
export type TemplateCategory = InferModel<typeof templateCategories>;
export type TemplateCategoryInput = InferModel<typeof templateCategories, 'insert'>;
