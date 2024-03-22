/**
 * Types for data pulled from Sanity CMS
 * 
 * This file was partially autogenerated by sanity-codegen. 
 * Manual import of Sanity types as the sanity-codegen package is not up to date
 * Source: https://github.com/ricokahler/sanity-codegen/blob/main/src/types.ts
 */

import { TypedObject } from "@portabletext/types";

import { ResolveConfigOptions } from 'prettier';

type ArrayType = { type: 'array'; of: Array<{ type: string }> };
type BlockType = { type: 'block' };
type BooleanType = { type: 'boolean' };
type DateType = { type: 'date' };
type DatetimeType = { type: 'datetime' };
type DocumentType = {
  type: 'document';
  fields: Field[];
  name: string;
  title?: string;
  description?: string;
};
type FileType = { type: 'file'; name?: string; fields?: any[] };
type GeopointType = { type: 'geopoint' };
type ImageType = { type: 'image'; name?: string; fields?: any[] };
type NumberType = { type: 'number' };
type ObjectType = {
  type: 'object';
  fields: Field[];
  name?: string;
  title?: string;
  description?: string;
};
type ReferenceType = {
  type: 'reference';
  // even though the sanity docs say this is only ever an array, their default
  // blog example doesn't follow this.
  to: { type: string } | Array<{ type: string }>;
  weak?: boolean;
};
type SlugType = { name?: string; type: 'slug' };
type StringType = {
  type: 'string';
  options?: { list?: Array<string | { title: string; value: string }> };
};
type SpanType = { type: 'span' };
type TextType = { type: 'text'; rows?: number };
type UrlType = { type: 'url' };

type IntrinsicType =
  | ArrayType
  | BlockType
  | BooleanType
  | DateType
  | DatetimeType
  | DocumentType
  | FileType
  | GeopointType
  | ImageType
  | NumberType
  | ObjectType
  | ReferenceType
  | SlugType
  | StringType
  | SpanType
  | TextType
  | UrlType;

type GetNameTypes<T> = T extends { name?: string } ? T : never;
type NamedType = GetNameTypes<IntrinsicType>;

type Field = {
  name: string;
  title?: string;
  type: string;
  description?: string;
  codegen?: { required?: boolean };
  validation?: any;
};

type Node = IntrinsicType | { type: string };
type Parent = { node: Node; path: string | number };

export interface GenerateTypesOptions {
  /**
   * Provide an array of uncompiled sanity types prior to running them through
   * sanity's `createSchema`
   */
  types: IntrinsicType[];
  /**
   * Optionally provide a function that generates the typescript type identifer
   * from the sanity type name. Use this function to override the default and
   * prevent naming collisions.
   */
  generateTypeName?: (sanityTypeName: string) => string;
  /**
   * This option is fed directly to prettier `resolveConfig`
   *
   * https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options
   */
  prettierResolveConfigPath?: string;
  /**
   * This options is also fed directly to prettier `resolveConfig`
   *
   * https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options
   */
  prettierResolveConfigOptions?: ResolveConfigOptions;
}

// From codegen

export interface SanityCodegenConfig
  extends Omit<GenerateTypesOptions, 'types'> {
  /**
   * The path of your sanity schema where you call `createSchema`
   */
  schemaPath: string;
  /**
   * The output path for the resulting codegen. Defaults to `./schema.ts`
   */
  outputPath?: string;
  /**
   * Pass options directly to `@babel/register`
   */
  babelOptions?: any;
}

/**
 * Represents a reference in Sanity to another entity. Note that the
 * generic type is strictly for TypeScript meta programming.
 */
// NOTE: the _T is for only for typescript meta
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SanityReference<_T> = {
  _type: 'reference';
  _ref: string;
};

/**
 * Represents a reference in Sanity to another entity with a key. Note that the
 * generic type is strictly for TypeScript meta programming.
 */
// NOTE: the _T is for only for typescript meta
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SanityKeyedReference<_T> = {
  _type: 'reference';
  _key: string;
  _ref: string;
};

/**
 * This was an incorrect type. See here:
 * https://github.com/ricokahler/sanity-codegen/issues/165
 *
 * @deprecated
 */
export type SanityAsset = SanityReference<any>;

/**
 * @deprecated
 */
export interface SanityImage {
  asset: SanityAsset;
}

/**
 * @deprecated
 */
export interface SanityFile {
  asset: SanityAsset;
}

export interface SanityGeoPoint {
  _type: 'geopoint';
  lat: number;
  lng: number;
  alt: number;
}

// blocks are typically handled by a block conversion lib
// (e.g. block \`@sanity/block-content-to-react\`) so we only type lightly
export interface SanityBlock {
  _type: 'block';
  [key: string]: any;
}

export interface SanityDocument {
  _id: string;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
}

export interface SanityImageCrop {
  _type: 'sanity.imageCrop';
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface SanityImageHotspot {
  _type: 'sanity.imageHotspot';
  height: number;
  width: number;
  x: number;
  y: number;
}

export type SanityKeyed<T> = T extends object ? T & { _key: string } : T;

export interface SanityImageAsset extends SanityDocument {
  _type: 'sanity.imageAsset';
  assetId: string;
  extension: string;
  metadata: SanityImageMetadata;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
}

export interface SanityImageMetadata {
  _type: 'sanity.imageMetadata';
  dimensions: SanityImageDimensions;
  hasAlpha: boolean;
  isOpaque: boolean;
  lqip: string;
  palette: SanityImagePalette;
}

export interface SanityImageDimensions {
  _type: 'sanity.imageDimensions';
  aspectRatio: number;
  height: number;
  width: number;
}

export interface SanityImagePalette {
  _type: 'sanity.imagePalette';
  darkMuted: SanityImagePaletteSwatch;
  darkVibrant: SanityImagePaletteSwatch;
  dominant: SanityImagePaletteSwatch;
  lightMuted: SanityImagePaletteSwatch;
  lightVibrant: SanityImagePaletteSwatch;
  muted: SanityImagePaletteSwatch;
  vibrant: SanityImagePaletteSwatch;
}

export interface SanityImagePaletteSwatch {
  _type: 'sanity.imagePaletteSwatch';
  background: string;
  foreground: string;
  population: number;
  title: string;
}

// Specific to this project

/**
 * Posts
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Page Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * Custom URL for the blogpost
   */
  slug: { _type: "slug"; current: string };

  /**
   * Published — `boolean`
   *
   *
   */
  published: boolean;

  /**
   * Release Date — `datetime`
   *
   *
   */
  releaseDate: string;

  /**
   * Tags — `tags`
   *
   *
   */
  tags: Tags;

  /**
   * Content — `portableText`
   *
   *
   */
  content: PortableText;

  /**
   * Sources — `array`
   *
   * Name and link to the source. Ordered. Link not required.
   */
  sources: Array<SanityKeyed<Source>>;
}

/**
 * Series
 *
 *
 */
export interface Series extends SanityDocument {
  _type: "series";

  /**
   * Series title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Tags — `tags`
   *
   *
   */
  tags: Tags;

  /**
   * Posts — `array`
   *
   *
   */
  posts?: Array<SanityKeyedReference<Post>>;
}

/**
 * Repository
 *
 *
 */
export interface Repository extends SanityDocument {
  _type: "repository";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * GitHub link — `url`
   *
   *
   */
  link: string;

  /**
   * Description — `string`
   *
   *
   */
  description: string;

  /**
   * Technologies — `array`
   *
   *
   */
  technologies: Array<SanityKeyed<string>>;
}

/**
 * Portfolio
 *
 *
 */
export interface Portfolio extends SanityDocument {
  _type: "portfolio";

  /**
   * Text — `portableText`
   *
   * Text to display on the portfolio page
   */
  text: PortableText;

  /**
   * Projects — `array`
   *
   * Projects to display on the portfolio page. These projects will be displayed in the order they are listed here.
   */
  projects: Array<SanityKeyedReference<Repository>>;
}

export type Source = {
  _type: "source";
  /**
   * Name — `string`
   *
   * A sort of heading/name for a source
   */
  name: string;

  /**
   * Link — `url`
   *
   * URL for the source
   */
  link: string;

  /**
   * Reference — `string`
   *
   * Longer reference/bibliography
   */
  ref: string;
};

export type PortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
    _type: "codeFile";
    /**
     * File Name — `string`
     *
     * Name of the file, will be displayed. For example: 'index.js', 'Shell session'.
     */
    fileName?: string;

    /**
     * Line Start — `number`
     *
     * The line number to start the code block at. Useful for code blocks that are part of a larger file.
     */
    lineStart?: number;

    /**
     * Code — `code`
     *
     *
     */
    code?: Code;

    /**
     * Output — `text`
     *
     * Output of the code block. For example: 'Hello World!'.
     */
    output?: string;

    /**
     * Tokens — `array`
     *
     *
     */
    tokens?: Array<SanityKeyed<CodeToken>>;
  }>
  | SanityKeyed<{
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     * Caption, displayed under the image
     */
    caption?: string;

    /**
     * Alt text — `string`
     *
     * Replacement text for use when images are not available. Leave empty if image is decorative.
     */
    alt?: string;
  }>
  | SanityKeyed<{
    _type: "tip";
    /**
     * Title of tip — `string`
     *
     * Title of the tip
     */
    title?: string;

    /**
     * Text of tip — `portableText`
     *
     * Content of the tip
     */
    text?: PortableText;
  }>
  | SanityKeyed<Latex>
  | SanityKeyed<{
    _type: "component";
    /**
     * Tag — `string`
     *
     *
     */
    tag?: string;

    /**
     * Arguments — `string`
     *
     * Arguments to pass to the component. A single string.
     */
    args?: string;
  }>
  | SanityKeyed<{
    _type: "richTable";
    /**
     * Table Data — `table`
     *
     *
     */
    tableData?: Table;

    /**
     * Caption — `string`
     *
     *
     */
    caption?: string;

    /**
     * Style — `boolean`
     *
     * Style first row differently
     */
    style?: boolean;
  }>
>;

export type CodeToken = {
  _type: "codeToken";
  /**
   * Type — `string`
   *
   *
   */
  type?: "error" | "warning" | "info";

  /**
   * Line — `number`
   *
   *
   */
  line?: number;

  /**
   * Message — `string`
   *
   *
   */
  message?: string;
};

export type Documents = Post | Series | Repository | Portfolio;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
export type Tags = Tag[];

export type Tag = {
  label: string;
  value: string;
}

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Latex = any;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Table = any;

// Handwritten types

export type FootnoteInlineBlock = TypedObject & {
  _type: "footnote";
  text: string;
}

export interface PostWithSeries extends Post {
  series: Series[];
}

export type SeriesWithPosts = Omit<Series, "posts"> & { posts: PostWithSeries[] };

// Data I want to load from GitHub API
export interface GitHubData {
  name: string;
  description?: string;
  updated_at: string;
  language: string;
}

// Data I want to load from Sanity
export interface RepositoryWithGithubData extends Repository {
  githubData: GitHubData;
}

/**
 * Portfolio with Repository data loaded. Result of a query.
 */
export type PortfolioWithProjects = Omit<Portfolio, "projects"> & { projects: Array<Repository> }

/**
 * Portfolio with Repository data loaded and github data loaded.
 */
export type LoadedPortfolio = Omit<Portfolio, "projects"> & { projects: Array<RepositoryWithGithubData> }
