export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await response.json()) as Post[];
  return posts;
}
