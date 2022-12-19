// We import object and document schemas
import category from './category'
import post from './post'
import source from './source'
import series from './series'
import portableText from './portableText'
import codeFile from './codeFile'
import tags from './tags'
import tag from './tag'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // The following are document types which will appear
  // in the studio.
  post,
  series,
  category,
  source,
  portableText,
  codeFile,
  tags,
  tag
]

