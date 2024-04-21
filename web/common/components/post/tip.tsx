import { blockRenderingElements } from "@common/utils/blockRendering";
import { PortableText } from "@portabletext/react";

// Renders a tip in a post
// text value is an array of blocks
const Tip = ({ value, index }: any) => {
  const { title, text } = value;
  return (
    <div className="border-2 rounded-md p-4 flex my-4 border-primary-40 dark:border-primary-80">
      <div className="flex items-center mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      </div>
      <div>
        <div className="text-lg font-bold mb-2">{title}</div>
        <div>
          <PortableText value={text} components={blockRenderingElements} />
        </div>
      </div>
    </div>
  );
};

export default Tip;
