import type { NextPage } from "next";
import getPaths from "../../utils/getPaths";
import getMdx from "../../utils/getMdx";
import getFrontMatter from "../../utils/getFrontMatter";

import { MDXRemote } from "next-mdx-remote";
import Meta from "../../components/Meta";

import CustomPre from "../../components/MDXComponents/CustomPre";
import BlogNav from "../../components/BlogNav";

const components = {
    pre: CustomPre,
};

const Post: NextPage | any = ({
    source,
    meta,
    slug,
    posts,
}: {
    source: any;
    meta: any;
    slug: string;
    posts: any[];
}) => {
    return (
        <>
            <Meta
                title={meta.title}
                path={`/blog/${slug}`}
                description={meta.description}
            />
            <div className='max-w-3xl mx-auto px-4 mt-3 mb-9'>
                <h1 className='text-6xl font-bold mb-4'>{meta.title}</h1>
                <p className='text-gray-400 text-sm'>Published: {meta.date}</p>
            </div>
            <div className='prose lg:prose-lg prose-headings:pt-0  prose-p:text-justify max-w-3xl mx-auto px-4 mt-3 mb-9'>
                <MDXRemote {...source} components={components} />
            </div>
            <div className='max-w-3xl mx-auto px-4 mt-2 mb-9'>
                <BlogNav posts={[...posts].reverse()} />
            </div>
        </>
    );
};

export default Post;

export async function getStaticPaths() {
    const paths = getPaths("blog");
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const mdxSource = await getMdx("blog", slug);
    const posts = await getFrontMatter("blog");

    return {
        props: { source: mdxSource, meta: mdxSource.frontmatter, slug, posts },
    };
}
