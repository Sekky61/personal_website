import { PortableTextComponents } from '@portabletext/react';

import CodeSample from '@components/post/CodeSample';
import LinkHeading from '@components/post/LinkHeading';
import Tip from '@common/components/post/tip';
import Link from 'next/link';
import CustomImage from '@common/components/post/customImage';
import { LatexBlock, LatexInline } from '@common/components/post/LatexBlock';
import Edit from '@common/components/post/edit';
import Abbr from '@common/components/post/abbr';
import Table from '@common/components/post/table';
import { ContentComponentsRender } from '@common/components/content/ContentComponents';

// Configuration for PortableText rendering
// Docs: https://github.com/portabletext/react-portabletext
export const blockRenderingElements: PortableTextComponents = {
  types: {
    component: ContentComponentsRender,
    latexBlock: LatexBlock,
    latexInline: LatexInline,
    image: CustomImage,
    codeFile: CodeSample,
    footnote: ({ value, index }) => {
      return (
        <a href={`#footnote-${index}`}>
          <sup>{index}</sup>
        </a>
      )
    },
    tip: Tip,
    edit: Edit,
    table: Table,
  },
  block: {
    heading: LinkHeading,
  },
  marks: {
    internalLink: ({ value, children }) => {
      return <Link href={`/post/${value.slug.current}`} className='link'>{children}</Link>;
    },
    externalLink: ({ value, children }) => {
      return <a href={value.href} target={value.blank ? "_blank" : undefined} rel="noreferrer" className='link'>{children}</a>;
    },
    abbr: Abbr,
  }
};