export default {
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => [
        Rule.required(),
        Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Custom URL for the blogpost",
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      initialValue: []
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
      initialValue: [],
    },
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'source' }],
      validation: (Rule: any) => Rule.unique(),
      description: "Name and link to the source. Ordered. Link not required.",
      editModal: "popover"
    }
  ],
  preview: {
    select: {
      title: 'title',
      published: 'published',
      releaseDate: 'releaseDate',
    },
    prepare(selection: any, viewOptions: any = {}) {
      const { title, published, releaseDate } = selection;
      const emoji = published ? "✅" : "❌";
      const message = published ? "published" : "unpublished";
      const isSortedByRelease = ("ordering" in viewOptions) &&
        (viewOptions.ordering.name === 'releaseDateDesc' || viewOptions.ordering.name === 'releaseDateAsc');

      return {
        title: title,
        subtitle: `${emoji} ${message} ${isSortedByRelease ? `${releaseDate}` : ``}`
      }
    }
  },
  orderings: [ // todo check, doesn't seem to be working
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [
        { field: 'releaseDate', direction: 'desc' }
      ]
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [
        { field: 'releaseDate', direction: 'asc' }
      ]
    },
  ]
};