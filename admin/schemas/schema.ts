// We import object and document schemas
import { post } from './post'
import { source } from './source'
import { series } from './series'

import { repo } from './repo'
import { portfolio } from './portfolio'

import { portableText } from './portableText/portableText'
import { codeToken } from './portableText/codeFile'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // The following are document types which will appear
  // in the studio.
  post,
  series,
  source,
  portableText,
  codeToken,
  repo,
  portfolio,
]

