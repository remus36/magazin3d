import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Proiect',
  type: 'document',
  fields: [
    defineField({
      name: 'titlu',
      title: 'Titlu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titlu' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriereScurta',
      title: 'Descriere scurtă',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'imagineProiect',
      title: 'Imagine proiect',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'titlu', media: 'imagineProiect' },
  },
});
