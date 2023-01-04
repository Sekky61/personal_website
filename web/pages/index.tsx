import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import type { GetStaticProps, NextPage } from 'next'

const PostCard = ({ postData }: any) => {
  // format date
  const date = postData.releaseDate;
  const formattedDate = date.toISOString().split('T')[0];
  const plaintext = Blogpost.blocksToPlainText(postData.data.content);
  console.log(postData.data._id);

  return (
    <li key={postData.data._id} className='rounded-md drop-shadow bg-white dark:bg-white/5 p-2 flex flex-col w-1/3 group hover:cursor-pointer'>
      <span className='group-hover:underline text-xl decoration-primary-400'>{postData.data.title}</span>
      <span>{formattedDate}</span>
      <p className='text-ellipsis'>
        {plaintext}
      </p>
    </li>
  );
}

const Home: NextPage = ({ postsData }: any) => {
  const posts = postsData.map((data: any) => {
    return new Blogpost(data);
  });

  const postCards = posts.map((postData: any) => {
    return (
      <PostCard postData={postData}></PostCard>
    );
  });

  return (
    <>
      <div className='flex gap-16 mt-20 flex-wrap lg:flex-nowrap mb-12'>
        <div className='grow'>
          <h1 className='heading-primary leading-tight text-6xl text-center lg:text-right font-bold mb-8' >Welcome to my website!</h1>
          <h2 className='heading-primary text-4xl text-center lg:text-right font-semibold'>Enjoy</h2>
        </div>
        <div className='grow lg:grow-0 flex justify-center bg-primary-400 rounded p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-64 h-64">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <div className='latest-posts'>
        <h2 className='heading-primary text-4xl font-semibold mb-5'>Latest posts</h2>
        <ul className='flex gap-4'>
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
