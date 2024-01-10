import { GetPostById } from "@/actions/post";
import PostPage from "@/components/posts/PostPage";
import ExploreMoreLayout from "@/components/sidebar/ExploreMoreLayout";

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await GetPostById(id);

  if (!post) {
    return <>No forms</>;
  }

  return (
    <div className="relative w-screen py-16 justify-between flex">
      <div className="w-9/12 md:w-1/2 mx-auto">
        <PostPage data={post} />
      </div>
      <div className="hidden md:block md:relative">
        <ExploreMoreLayout post={post} />
      </div>
    </div>
  );
}

export default page;
