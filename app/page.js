import { connectToDatabase } from '../lib/mongodb';
import Link from 'next/link';

export default async function Home() {
  // Connect to the database and get the blog posts
  const db = await connectToDatabase();
  const collection = db.collection('blogposts');
  const posts = await collection.find({}).toArray();

  return (
    <div className="container">
      <div className="grid">
        {posts.map((post) => (
          <div className="grid-item" key={post._id}>
            <Link href={`/blog/${post.slug}`} className="grid-link">
              <div className="grid-box">
                <img src={post.image} alt={post.title} className="grid-image" />
                <div className="grid-title">{post.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
