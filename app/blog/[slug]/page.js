// app/blog/[slug]/page.js
import { connectToDatabase } from '../../../lib/mongodb';
import Head from 'next/head';
import Image from 'next/image'; 
import styles from './blog.module.css'; // Import the CSS file for styling

const BlogPost = async ({ params }) => {
  const { slug } = await params;

  // Connect to the database
  const db = await connectToDatabase();
  const postsCollection = db.collection('blogposts');

  // Fetch the post by slug
  const post = await postsCollection.findOne({ slug });

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <div className={styles.container}>
        {/* Left Sidebar */}
        <aside className={styles.sidebarLeft}>
          <h2></h2>
          <p></p>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <h1>{post.title}</h1>
          <meta name="description" content={post.excerpt || "This is a blog about how to improve your life."} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt || "This is a blog post about how to improve your life."} />
          <meta property="og:image" content={post.image} />
          <meta property="og:image:alt" content={`Image for ${post.title}`} />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="article" />
          <link rel="canonical" href={`https://www.devotedguru.com/blog/${post.slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@DevotedGuru" /> {/* Replace with your Twitter handle */}
          <meta name="twitter:creator" content="@DevotedGuru" /> {/* Replace with your Twitter handle */}
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt || "This is a blog post about how to improve your life."} />
          <meta name="twitter:image" content={post.image} />
          <meta name="twitter:image:alt" content={`Image for ${post.title}`} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt || "",
                image: post.image,
                datePublished: post.date,
                author: {
                  "@type": "Person",
                  name: "Author Name", // Replace with actual author name
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://www.devotedguru.com/blog/${post.slug}`,
                },
              }),
            }}
          />
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
          />
          <div> {post.afflink && ( <a href={post.afflink} target="_blank" rel="noopener noreferrer"> {post.afflink_text} </a> )} </div>
          {post.content.map((section, index) => (
            <div key={index}>
              <h2>{section.section_title}</h2>
              <p>{section.text}</p>
              {section.items && (
                <ul>
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div> {post.afflink && ( <a href={post.afflink} target="_blank" rel="noopener noreferrer"> {post.afflink_text} </a> )} </div>
        </main>

        {/* Right Sidebar */}
        <aside className={styles.sidebarRight}>
          <h2></h2>
          <p></p>
        </aside>
      </div>
    </>
  );
};

// This function generates all the paths for dynamic routes at build time
export async function generateStaticParams() {
  const db = await connectToDatabase();
  const postsCollection = db.collection('blogposts');
  const posts = await postsCollection.find({}).toArray();

  // Generate paths for all slugs
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Fetch the data for a specific post
export async function fetchPostData(slug) {
  const db = await connectToDatabase();
  const postsCollection = db.collection('blogposts');
  const post = await postsCollection.findOne({ slug });

  return post || null;
}

// Fetch post data during static generation
export async function fetch({ params }) {
  const { slug } = params;

  // Fetch the post data for the given slug
  const post = await fetchPostData(slug);

  return {
    props: {
      post: post,
    },
  };
}

export default BlogPost;

