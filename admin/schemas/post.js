export default {
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      type: 'markdown',
      initialValue: ""
    },
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'source' }],
      validation: Rule => Rule.unique(),
      description: "Name and link to the source. Ordered. Link not required."
    }
  ],
  initialValue: {
    tags: []
  }
};