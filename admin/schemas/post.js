export default {
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required(),
        Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
      ]
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
      initialValue: "",
      validation: (Rule) =>
        Rule.custom(text => {
          const lines = text.split("\n");
          for (const line of lines) {
            if (line.match(/^#\s/)) {
              return "Article should not include h1 heading (# heading)";
            }
          }

          return true; // correct
        }
        )
    },
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'source' }],
      validation: Rule => Rule.unique(),
      description: "Name and link to the source. Ordered. Link not required.",
      editModal: "popover"
    }
  ]
};