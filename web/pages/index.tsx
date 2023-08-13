import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ postData }: { postData: Blogpost }) => {
  // format date
  const date = postData.releaseDate;
  const formattedDate = date.toISOString().split('T')[0];
  const text = postData.getBeginningOfArticle(120);

  return (
    <li className='flex-grow'>
      <Link href={`/post/${postData.slug}`}>
        <div className='card p-2 flex flex-col group hover:cursor-pointer h-full gap-2'>
          <span className='group-hover:underline text-xl decoration-primary-40'>{postData.data.title}</span>
          <div className="flex justify-between primary-text text-sm font-semibold">
            <span>Article</span>
            <span className=''>{formattedDate}</span>
          </div>
          <p className='two-line-text-ellipsis m-0'>
            {text}
          </p>
        </div>
      </Link>
    </li>
  );
}

const Home: NextPage = ({ postsData }: any) => {
  const posts = postsData.map((data: any) => {
    return new Blogpost(data);
  });

  const postCards = posts.map((postData: Blogpost) => {
    return (
      <PostCard postData={postData} key={postData.data._id}></PostCard>
    );
  });

  return (
    <>
      <div className='flex flex-col md:flex-row gap-16 mt-20 mb-12 items-center'>
        <div>
          <h1 className='heading-primary leading-tight text-6xl text-center lg:text-right font-bold mb-8' >Welcome to my website!</h1>
          <h2 className='heading-primary text-4xl text-center lg:text-right font-semibold hover:decoration-primary-60'>
            <Link href="/portfolio">Check my projects</Link>
          </h2>
        </div>
        <div className='rounded-md p-2 primary inline-block w-80 md:w-full'>
          <Image src='/img/myFace.png' width={500} height={500} className='rounded' alt='My face' />
        </div>
      </div>
      <div className='latest-posts'>
        <h2 className='heading-primary text-4xl font-semibold mb-5'>Latest posts</h2>
        <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {postCards}
        </ul>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const postsData = await BlogpostDataLoader.getPaginatedPosts(0, 3);

  return {
    props: {
      postsData,
    }
  };
}

export default Home
