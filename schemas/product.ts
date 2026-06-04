import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Produs',
  type: 'document',
  fields: [
    defineField({
      name: 'nume',
      title: 'Nume produs',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nume' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pret',
      title: 'Preț (RON)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
    }),
    defineField({
      name: 'descriereScurta',
      title: 'Descriere scurtă',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'imagineProdus',
      title: 'Imagine produs',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'nume', subtitle: 'pret', media: 'imagineProdus' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `${subtitle} RON` : '', media };
    },
  },
});
