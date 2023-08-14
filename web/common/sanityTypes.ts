import { PortableTextBlock, PortableTextMarkDefinition, TypedObject } from "@portabletext/types";
import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

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
  description: string;
  updated_at: string;
  language: string;
}

// Data I want to load from Sanity
export interface RepositoryWithGithubData extends Repository {
  githubData: GitHubData;
}

export interface LoadedPortfolio {
  text: PortableText;
  projects: Array<RepositoryWithGithubData>;
}